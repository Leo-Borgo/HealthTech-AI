HealthTech — Asistente de Emergencias Médicas
==============================================

Descripción
-----------
HealthTech es una aplicación web de primeros auxilios y orientación médica.
Permite al usuario describir síntomas mediante un chatbot, visualizar hospitales
y centros de salud reales cercanos en un mapa interactivo, y consultar una guía
paso a paso de RCP.

Esta es una entrega de avance. El frontend funciona completamente en el navegador
abriendo index.html directamente, sin instalar nada ni levantar un servidor.

IMPORTANTE — Funcionalidades disponibles en esta entrega:
  ✔ Chatbot de orientación con más de 45 categorías de síntomas
  ✔ Mapa interactivo con hospitales reales cercanos (OpenStreetMap)
  ✔ Guía paso a paso de RCP
  ✔ Botón de llamada directa al 911
  ✔ Lógica de triaje (evaluación de riesgo) → solo por consola (CLI)
  ✔ Registro de ficha médica personal → solo por consola (CLI)

  ✘ El ingreso de datos personales y la evaluación de triaje NO están
    disponibles desde el navegador todavía. Esas funciones se conectarán
    al frontend en la entrega final mediante una API REST (Flask).

Tecnologías
-----------
Frontend : HTML5, CSS3, JavaScript vanilla, Leaflet.js (mapas),
           Overpass API y Nominatim (OpenStreetMap) para hospitales cercanos.
Backend  : Python 3.10+ (scripts de consola independientes del frontend).

Estructura del proyecto
-----------------------
HealthTech/
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── logo_png.png
├── backend/
│   ├── triage.py       ← Lógica de evaluación de riesgo (solo consola)
│   ├── usuarios.py     ← Registro de fichas médicas (solo consola)
│   └── utils.py        ← Funciones auxiliares compartidas
└── docs/
    ├── HealthTech_Ficha-Tecnica.pdf
    └── HealthTech_Stakeholders.pdf

Cómo ejecutar (modo local, sin servidor)
-----------------------------------------
1. Abrir frontend/index.html directamente en el navegador
   (doble clic o "Abrir con" → tu navegador preferido).

2. ¡Listo! El chatbot, el mapa de hospitales y la guía de RCP funcionan
   directamente desde el archivo, sin instalar nada.

Nota sobre el mapa de hospitales
---------------------------------
Los hospitales no están escritos a mano. Al abrir la sección "Hospitales",
se busca la ubicación del usuario (con su permiso) y se consulta en tiempo
real OpenStreetMap (vía Overpass API) para mostrar hospitales y centros de
salud reales en un radio de 5 km. Si se busca otra dirección con el buscador
del mapa, los marcadores se actualizan automáticamente.

Uso del CLI (scripts de Python, independientes del frontend)
--------------------------------------------------------------
  python backend/triage.py      ← Evaluación de riesgo por consola
  python backend/usuarios.py    ← Registro de ficha médica por consola

Próximos pasos (entrega final)
--------------------------------
- CONFIRMADO: Levantar un servidor Flask y conectar el frontend con el
  backend vía API REST, para que el triaje y el registro de fichas médicas
  funcionen desde el navegador (no solo por consola).
- CONFIRMADO: Publicar la app en una plataforma de hosting (ej. Vercel)
  para que sea accesible desde una URL pública.
- CONFIRMADO: Mejoras visuales generales (diseño, colores, responsive).
- CONFIRMADO: Expandir el chatbot con más categorías, palabras clave y
  un algoritmo de coincidencia mejorado.
- CONFIRMADO: Mejorar los popups del mapa de hospitales para mostrar
  información completa (horarios, especialidades, si está abierto/cerrado).
- EXPLORATORIO: Evaluar la integración con un modelo de IA para entender
  síntomas en lenguaje natural (en lugar de palabras clave fijas).

Autores
-------
Equipo HealthTech-AI — Leonardo Borgo · Matías Crego
