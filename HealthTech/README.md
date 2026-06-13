# HealthTech — Asistente de Emergencias Médicas

## Descripción

HealthTech es una aplicación web de primeros auxilios y orientación médica.

Permite al usuario:

* Describir síntomas mediante un chatbot.
* Visualizar hospitales y centros de salud reales cercanos en un mapa interactivo.
* Consultar una guía paso a paso de RCP.

> Esta es una entrega de avance. El frontend funciona completamente en el navegador abriendo `index.html` directamente, sin instalar dependencias ni levantar un servidor.

---

## Funcionalidades disponibles en esta entrega

### Implementadas

* ✅ Chatbot de orientación con más de 45 categorías de síntomas.
* ✅ Mapa interactivo con hospitales reales cercanos mediante OpenStreetMap.
* ✅ Guía paso a paso de RCP.
* ✅ Botón de llamada directa al 911.
* ✅ Lógica de triaje (evaluación de riesgo) mediante consola (CLI).
* ✅ Registro de ficha médica personal mediante consola (CLI).

### Pendientes de integración

* ❌ El ingreso de datos personales desde el navegador.
* ❌ La evaluación de triaje desde la interfaz web.

Estas funcionalidades ya existen en el backend y serán conectadas al frontend mediante una API REST en la entrega final.

---

## Tecnologías utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Leaflet.js
* OpenStreetMap
* Overpass API
* Nominatim

### Backend

* Python 3.10+

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
    ├── HealthTech_Ficha-Tecnica.pdf
    └── HealthTech_Stakeholders.pdf
```

### Descripción de archivos principales

| Archivo       | Descripción                                     |
| ------------- | ----------------------------------------------- |
| `triage.py`   | Lógica de evaluación de riesgo mediante consola |
| `usuarios.py` | Registro de fichas médicas                      |
| `utils.py`    | Funciones auxiliares compartidas                |

---

## Cómo ejecutar el proyecto

### Frontend

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

## Funcionamiento del mapa de hospitales

Los hospitales no están cargados manualmente.

Al abrir la sección **Hospitales**, la aplicación solicita permiso para acceder a la ubicación del usuario y consulta en tiempo real los datos de OpenStreetMap mediante Overpass API.

Características:

* Búsqueda automática de hospitales cercanos.
* Radio aproximado de 5 km.
* Actualización dinámica al buscar otra dirección.
* Datos reales obtenidos desde OpenStreetMap.

---

## Próximos pasos (Entrega Final)

### Confirmados

* Levantar un servidor Flask.
* Conectar frontend y backend mediante API REST.
* Habilitar el triaje desde la interfaz web.
* Habilitar el registro de fichas médicas desde la interfaz web.
* Publicar la aplicación en una plataforma de hosting.
* Mejorar diseño visual y experiencia responsive.
* Expandir el chatbot con nuevas categorías y palabras clave.
* Mejorar la información mostrada en hospitales y centros de salud.

### Exploratorios

* Integrar un modelo de IA capaz de interpretar síntomas en lenguaje natural.

---

## Autores

**Equipo HealthTech-AI**

* Leonardo Borgo
* Matías Crego
