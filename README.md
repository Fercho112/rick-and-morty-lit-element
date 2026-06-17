# Rick & Morty App — Lit Edition

Explorador de personajes de Rick and Morty. Esta versión es una reescritura de la app original en React, ahora construida con **Lit Element** y Web Components nativos.

## Stack
Lit Element · Vite · Rick and Morty API

## Correr el proyecto
```bash
npm install
npm run dev
```

## Funcionalidades

**Requeridas**
- Lista de personajes con los primeros 20 resultados de la API
- Botón de favorito en cada tarjeta con feedback visual (estrella amarilla cuando está activo)
- Sección de favoritos separada con su propio estado vacío

**Deseables**
- Paginación completa sobre los 826 personajes disponibles
- Búsqueda en tiempo real contra el endpoint `/character?name=` — no es un filtro local, consulta toda la API
- Arquitectura modular por componentes con responsabilidad única

## Decisiones técnicas

**AbortController + debounce**
Cada cambio de página o búsqueda cancela el request anterior antes de mandar el nuevo. Resuelve el problema clásico de respuestas que llegan fuera de orden. El debounce de 900ms reduce la frecuencia de peticiones y evita golpear el límite de la API con clicks rápidos.

**404 no es un error**
Cuando la búsqueda no encuentra resultados la API devuelve 404. Ese caso se maneja en la capa de servicio como resultado vacío, no como excepción.

**Sin Context API**
En React el estado global de favoritos vivía en un Context. En Lit no existe ese mecanismo — la solución fue levantar el estado al componente raíz `rick-app` y comunicarlo hacia abajo via propiedades y hacia arriba via `CustomEvent` con `bubbles: true, composed: true` para cruzar el Shadow DOM.

## Easter eggs
- **Lista vacía de favoritos** — Pickle Rick te juzga en silencio
- **Error inesperado** — Evil Morty sale a escena
- **Pantalla de carga** — para los que sí leen lo que aparece mientras esperan
