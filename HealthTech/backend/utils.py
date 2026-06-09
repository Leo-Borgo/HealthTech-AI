"""
utils.py — Funciones auxiliares compartidas por el backend.
"""

import re
from datetime import datetime


def validar_temperatura(valor) -> float | None:
    """Convierte a float y verifica que sea un rango corporal razonable (30–45 °C)."""
    try:
        temp = float(valor)
        if 30.0 <= temp <= 45.0:
            return temp
        return None
    except (ValueError, TypeError):
        return None


def validar_dolor(valor) -> int | None:
    """Convierte a int y verifica que esté en la escala 1–10."""
    try:
        dolor = int(valor)
        if 1 <= dolor <= 10:
            return dolor
        return None
    except (ValueError, TypeError):
        return None


def validar_telefono(valor) -> bool:
    """Valida que el teléfono contenga solo dígitos y tenga entre 7 y 15 caracteres."""
    numero = re.sub(r"[\s\-\+\(\)]", "", str(valor))
    return numero.isdigit() and 7 <= len(numero) <= 15


def formatear_fecha(fecha_str: str) -> str | None:
    """
    Intenta parsear una fecha en formatos comunes (DD/MM/AAAA, AAAA-MM-DD)
    y la devuelve normalizada como DD/MM/AAAA. Retorna None si no es válida.
    """
    formatos = ["%d/%m/%Y", "%Y-%m-%d", "%d-%m-%Y"]
    for fmt in formatos:
        try:
            return datetime.strptime(fecha_str.strip(), fmt).strftime("%d/%m/%Y")
        except ValueError:
            continue
    return None


def categoria_color_terminal(categoria: str) -> str:
    """Devuelve el código ANSI correspondiente a la categoría de triage."""
    colores = {
        "LEVE":     "\033[92m",
        "MODERADO": "\033[93m",
        "URGENTE":  "\033[91m",
    }
    return colores.get(categoria.upper(), "\033[0m")
