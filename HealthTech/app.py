"""
app.py — Servidor Flask que conecta el frontend web con el backend Python.

Endpoints:
  POST /api/triage       → evalúa riesgo y devuelve categoría + mensaje
  POST /api/ficha        → registra una ficha médica (en memoria por ahora)

Cómo correr:
  pip install flask
  python app.py
  → http://localhost:5000
"""

from flask import Flask, request, jsonify, send_from_directory
from backend.triage import evaluar_riesgo_api
from backend.utils import validar_temperatura, validar_dolor
import os

app = Flask(__name__, static_folder="frontend")

# Almacenamiento en memoria (reemplazar con DB en producción)
fichas_medicas = []


# ─── Servir el frontend ───────────────────────────────────────────────────────

@app.route("/")
def index():
    return send_from_directory("frontend", "index.html")


# ─── API: Triage ──────────────────────────────────────────────────────────────

@app.route("/api/triage", methods=["POST"])
def api_triage():
    data = request.get_json(force=True)

    nombre      = str(data.get("nombre", "")).strip()
    dolor_raw   = data.get("dolor")
    temp_raw    = data.get("temperatura")

    if not nombre:
        return jsonify({"error": "El campo 'nombre' es obligatorio."}), 400

    dolor = validar_dolor(dolor_raw)
    if dolor is None:
        return jsonify({"error": "El dolor debe ser un entero entre 1 y 10."}), 400

    temperatura = validar_temperatura(temp_raw)
    if temperatura is None:
        return jsonify({"error": "La temperatura debe ser un número entre 30 y 45 °C."}), 400

    resultado = evaluar_riesgo_api(nombre, dolor, temperatura)
    return jsonify(resultado), 200


# ─── API: Ficha médica ────────────────────────────────────────────────────────

@app.route("/api/ficha", methods=["POST"])
def api_ficha():
    data = request.get_json(force=True)

    campos_requeridos = ["nombre", "edad", "genero", "num_identidad"]
    for campo in campos_requeridos:
        if not data.get(campo):
            return jsonify({"error": f"El campo '{campo}' es obligatorio."}), 400

    fichas_medicas.append(data)
    return jsonify({"mensaje": "Ficha médica registrada correctamente."}), 201


# ─── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    app.run(debug=True, port=5000)
