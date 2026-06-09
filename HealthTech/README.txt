HealthTech — Asistente de Emergencias Médicas
==============================================

Descripción
-----------
HealthTech es una aplicación web de primeros auxilios y orientación médica.
Permite al usuario describir síntomas mediante un chatbot, visualizar hospitales
cercanos en un mapa interactivo y consultar una guía paso a paso de RCP.

El backend en Python expone una API REST que evalúa el nivel de riesgo del
paciente (triage) y registra fichas médicas.

Tecnologías
-----------
Frontend : HTML5, CSS3, JavaScript vanilla, Leaflet.js (mapas)
Backend  : Python 3.10+, Flask
API      : REST JSON (endpoints en /api/)

Estructura del proyecto
-----------------------
HealthTech/
├── app.py                  ← Servidor Flask (punto de entrada)
├── backend/
│   ├── triage.py           ← Lógica de evaluación de riesgo (CLI + API)
│   ├── usuarios.py         ← Registro de fichas médicas (CLI)
│   └── utils.py            ← Funciones auxiliares compartidas
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── style.css
└── docs/
    ├── HealTech_Ficha-Tecnica.pdf.docx
    └── HealthTech_Stakeholders.pdf.docx

Cómo ejecutar
-------------

Cómo ejecutar
-------------
Opción simple (sin servidor):
  Abrir frontend/index.html directamente en el navegador.

Opción con servidor (WIP - para desarrollo futuro):
  pip install flask
  python app.py → http://localhost:5000

-------------
1. Instalar dependencias:
   pip install flask

2. Desde la carpeta HealthTech/, correr:
   python app.py

3. Abrir en el navegador:
   http://localhost:5000

Endpoints de la API
-------------------
POST /api/triage
  Body JSON: { "nombre": "Ana", "dolor": 7, "temperatura": 38.5 }
  Respuesta: { "categoria": "MODERADO", "mensaje": "...", "puntos": 20 }

POST /api/ficha
  Body JSON: { "nombre": "...", "edad": 30, "genero": "F", "num_identidad": 12345678, ... }
  Respuesta: { "mensaje": "Ficha médica registrada correctamente." }

Uso del CLI (sin servidor)
--------------------------
  python backend/triage.py      ← Evaluación de riesgo por consola
  python backend/usuarios.py    ← Registro de ficha médica por consola

Autores
-------
Equipo HealthTech-AI
