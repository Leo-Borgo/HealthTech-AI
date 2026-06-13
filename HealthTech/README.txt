HealthTech — Asistente de Emergencias Médicas
==============================================

Descripción
-----------
HealthTech es una aplicación web de primeros auxilios y orientación médica.
Permite al usuario describir síntomas mediante un chatbot, visualizar hospitales
y centros de salud reales cercanos en un mapa interactivo, y consultar una guía
paso a paso de RCP.

Esta es una entrega de avance: por ahora el proyecto funciona 100% en el
navegador, sin necesidad de levantar un servidor. La parte de backend
(evaluación de triage por API y registro de fichas médicas) se incorporará
en la entrega final.

Tecnologías
-----------
Frontend : HTML5, CSS3, JavaScript vanilla, Leaflet.js (mapas), Overpass API
           y Nominatim (OpenStreetMap) para ubicar hospitales cercanos.
Backend  : Python 3.10+ (scripts de consola, se usan para probar la lógica
           de triage y ficha médica de forma independiente).

Estructura del proyecto
-----------------------
HealthTech/
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── style.css
├── backend/
│   ├── triage.py           ← Lógica de evaluación de riesgo (por consola)
│   ├── usuarios.py         ← Registro de fichas médicas (por consola)
│   └── utils.py            ← Funciones auxiliares compartidas
└── docs/
    ├── HealTech_Ficha-Tecnica.pdf.docx
    └── HealthTech_Stakeholders.pdf.docx

Cómo ejecutar (modo local, sin servidor)
-----------------------------------------
1. Abrir frontend/index.html directamente en el navegador
   (doble clic o "Abrir con" → tu navegador preferido).

2. ¡Listo! El chatbot, el mapa de hospitales y la guía de RCP funcionan
   directamente desde el archivo, sin instalar nada.

Nota sobre el mapa de hospitales
---------------------------------
El mapa ya no usa una lista fija de hospitales. Al abrir la sección
"Hospitales", se busca tu ubicación (con tu permiso) y se consulta en
tiempo real OpenStreetMap (vía Overpass API) para mostrar hospitales y
centros de salud reales cercanos a esa ubicación. Si buscás otra
dirección con el buscador del mapa, los hospitales se actualizan según
esa nueva ubicación.

Uso del CLI (scripts de Python, independientes del frontend)
--------------------------------------------------------------
  python backend/triage.py      ← Evaluación de riesgo por consola
  python backend/usuarios.py    ← Registro de ficha médica por consola

Próximos pasos (entrega final)
--------------------------------
- Levantar un servidor (Flask) que conecte el frontend con el backend
  Python vía API REST (endpoints /api/triage y /api/ficha).
- Persistencia de fichas médicas en una base de datos.

Autores
-------
Equipo HealthTech-AI
