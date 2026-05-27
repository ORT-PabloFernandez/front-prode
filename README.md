# Prode Mundial 2026

Aplicación web desarrollada para seguir y predecir los resultados de la fase de grupos del Mundial 2026.  
El sistema permite visualizar todos los partidos, registrar predicciones y consultar posteriormente las predicciones realizadas.

---

# Funcionalidades
## Home
En la pantalla principal se muestra el listado completo de partidos de la fase de grupos del Mundial 2026.

Cada partido incluye información como:

- Equipos
- Grupo
- Fecha
- Hora
- Estadio

Además, el usuario puede aplicar distintos filtros para encontrar partidos rápidamente:

- Filtrar por grupo
- Filtrar por equipo
- Filtrar por día
- Buscar partidos específicos

Al hacer click sobre un partido, el sistema redirecciona a:

```bash
/partido/[id]
```
---

## Pantalla de Partido
En esta pantalla se muestra una card detallada del partido seleccionado.

El usuario podrá:

- Ver toda la información del encuentro
- Ingresar una predicción del resultado
- Modificar la predicción antes de guardarla
- Guardar la predicción realizada

### Ejemplo

```txt
Argentina 2 - 1 Francia
```
Una vez guardada la predicción:

- La información queda persistida
- La predicción aparecerá en la pantalla de predicciones

---

## Pantalla de Predicciones
Esta sección muestra todas las predicciones realizadas previamente por el usuario.

### Características

- Listado completo de predicciones guardadas
- Filtro por grupos
- Visualización clara de resultados pronosticados
- Las predicciones ya guardadas no pueden editarse

---

# Tecnologías Utilizadas

- Next.js
- React
- TailwindCSS
---

# Estructura Principal
```bash
# Estructura Principal

```bash
/front-prode
├── public
├── src
│   └── app
│       ├── Components
│       │   └── Header
│       │       └── Header.jsx
│       ├── login
│       │   └── page.js
│       ├── partido
│       │   ├── [id]
│       │   │   └── page.js
│       │   └── page.js
│       ├── predicciones
│       │   └── page.js
│       ├── registro
│       │   └── page.js
│       ├── globals.css
│       ├── layout.js
│       └── page.js
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
└── README.md
```

# COMO USAR LOS ENDPOINTS

Para que el código quede ordenado y no sea un lío de mantener, armamos la comunicación con el servidor en tres partes:
1. El archivo base (api.js)

Acá centralizamos la URL de Azure que nos pasó el profe. Es una función genérica: vos le pasás el endpoint que necesitás y, según el método (GET, POST, PUT o DELETE), se encarga de armar la petición con su body y configuraciones. Así no repetimos código en ningún lado.
2. La carpeta de servicios (/servicios)

Como buena práctica, separamos la lógica por pantalla o entidad. Cada una tiene su propio archivo:

    Por ejemplo, todo lo relacionado a los partidos va en matches.servicio.js.

    Regla del equipo: Todos los archivos de esta carpeta llevan el sufijo .servicio.js (ej: nombre.servicio.js) para que nos demos cuenta rápido de qué es cada cosa.

3. Cómo usarlo en los componentes

Los componentes de la aplicación no tienen que llamar directamente a la API. Solo se encargan de mostrar la info en la pantalla.

El camino  es:

    Importás la función que necesitás desde su archivo de servicio (por ejemplo, en el componente que lista los partidos, importás getMatches).

    Llamás a esa función adentro del componente para traer los datos.

---

# Objetivo del Proyecto

El objetivo principal es desarrollar una aplicación interactiva para practicar:

- Manejo de rutas dinámicas
- Persistencia de datos
- Estados globales/locales
- Renderizado de listas
- Filtros y búsquedas
- Experiencia de usuario

---

# Flujo de Uso
1. El usuario ingresa al Home
2. Visualiza todos los partidos
3. Filtra partidos si lo desea
4. Selecciona un partido
5. Ingresa una predicción
6. Guarda el resultado
7. Consulta sus predicciones en la pantalla correspondiente
