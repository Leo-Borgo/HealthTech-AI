# HealthTech — Asistente de Emergencias Médicas

## Descripción

HealthTech es una aplicación web de primeros auxilios y orientación médica.

Permite al usuario:

- Describir síntomas mediante un chatbot.
- Visualizar hospitales y centros de salud reales cercanos en un mapa interactivo.
- Consultar una guía paso a paso de RCP.

> Esta es una entrega de avance. El frontend funciona completamente en el navegador abriendo `index.html` directamente, sin instalar dependencias ni levantar un servidor.

---

## Funcionalidades disponibles en esta entrega

### Implementadas (frontend)

- ✅ Chatbot de orientación con más de 45 categorías de síntomas.
- ✅ Mapa interactivo con hospitales reales cercanos mediante OpenStreetMap.
- ✅ Guía paso a paso de RCP.
- ✅ Botón de llamada directa al 911.

### Solo por consola — pendientes de integración

- ⚙️ Evaluación de riesgo / triaje (`triage.py`)
- ⚙️ Registro de ficha médica personal (`usuarios.py`)
- ⚙️ Validaciones de datos (`utils.py`)

> Los archivos Python (.py) todavía **no están conectados al frontend**. Esas funciones se vincularán al navegador en la entrega final mediante una API REST (Flask).

---

## Tecnologías utilizadas

### Frontend

- HTML5, CSS3, JavaScript (Vanilla JS)
- Leaflet.js — mapas interactivos
- OpenStreetMap / Overpass API — hospitales reales en tiempo real
- Nominatim — búsqueda de direcciones

### Backend (consola)

- Python 3.10+

---

## Estructura del proyecto

```text
HealthTech/
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── logo_png.png
│
├── backend/
│   ├── triage.py
│   ├── usuarios.py
│   └── utils.py
│
└── docs/
    ├── presentacion/
    │   ├── HealthTech_Presentacion.pptx
    │   └── README.md
    ├── informes/
    │   ├── HealthTech_Ficha-Tecnica.pdf
    │   └── HealthTech_Stakeholders.pdf
    └── diagramas/
        └── HealthTech_Diagrama-Triage.pdf
```

### Descripción de archivos principales

| Archivo | Descripción |
| --- | --- |
| `frontend/index.html` | Interfaz principal de la aplicación |
| `frontend/app.js` | Lógica del chatbot, mapa y navegación |
| `frontend/style.css` | Estilos visuales |
| `backend/triage.py` | Lógica de evaluación de riesgo (solo consola) |
| `backend/usuarios.py` | Registro de fichas médicas (solo consola) |
| `backend/utils.py` | Funciones auxiliares compartidas |
| `docs/informes/HealthTech_Ficha-Tecnica.pdf` | Documento técnico interno |
| `docs/informes/HealthTech_Stakeholders.pdf` | Propuesta de valor y modelo de negocio |
| `docs/diagramas/HealthTech_Diagrama-Triage.pdf` | Diagrama de flujo del algoritmo de triaje |
| `docs/presentacion/HealthTech_Presentacion.pptx` | Presentación del proyecto |

---

## Cómo ejecutar el proyecto

### Frontend (sin servidor)

1. Abrir `frontend/index.html` en cualquier navegador moderno.
2. No es necesario instalar dependencias ni ejecutar servidores.

### Backend (CLI)

```bash
python backend/triage.py
```

Evaluación de riesgo mediante consola.

```bash
python backend/usuarios.py
```

Registro de ficha médica mediante consola.

---

## Mapa de hospitales

Los hospitales no están cargados manualmente. Al abrir la sección **Hospitales**, la aplicación solicita permiso para acceder a la ubicación del usuario y consulta en tiempo real OpenStreetMap mediante Overpass API.

- Búsqueda automática de hospitales y centros de salud cercanos.
- Radio aproximado de 5 km.
- Actualización dinámica al buscar otra dirección.
- Datos reales obtenidos desde OpenStreetMap.

---

## Próximos pasos (Entrega Final)

### Confirmados

- Levantar un servidor Flask y conectar frontend y backend mediante API REST.
- Habilitar el triaje y el registro de fichas médicas desde la interfaz web.
- Publicar la aplicación en una plataforma de hosting (ej. Vercel).
- Mejorar diseño visual y experiencia responsive.
- Expandir el chatbot con nuevas categorías y palabras clave.
- Mejorar la información mostrada en el mapa de hospitales (horarios, especialidades, estado abierto/cerrado).

### Exploratorios

- Integrar un modelo de IA capaz de interpretar síntomas en lenguaje natural.

---

## Autores

**Equipo HealthTech-AI**

- Leonardo Borgo
- Matías Crego
