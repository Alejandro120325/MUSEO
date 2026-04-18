# 🏛️ Museo Alberto Mena Caamaño - Sitio Web Interactivo

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

Este proyecto es una plataforma web moderna, interactiva y responsiva dedicada al **Museo Alberto Mena Caamaño**, ubicado en el Centro Cultural Metropolitano de Quito, Ecuador. Diseñado para ofrecer un recorrido virtual y educativo a través de la historia independentista del país.

## ✨ Características Principales

* **Animaciones Cinematográficas (Dark Hero):** Implementación avanzada de `GSAP` para un slider automático y fluido en la página de inicio que presenta los capítulos y fondos del museo.
* **Diseño Responsivo (Mobile-First):** Adaptable a cualquier tamaño de pantalla, desde dispositivos móviles hasta monitores de escritorio, con un menú tipo hamburguesa personalizado.
* **Galería Multimedia Local:** Visualizador de imágenes históricas con efecto *Lightbox* (zoom) creado desde cero con Vanilla JavaScript, junto con integración de video local (.mp4) optimizado para web.
* **Evaluación Interactiva:** Un módulo de "Quiz" dinámico con barra de progreso, validación en tiempo real, cálculo de puntaje y un sistema de medallas basado en el desempeño del usuario.
* **Modo Oscuro/Claro:** Botón de cambio de tema (*Theme Toggle*) que guarda la preferencia del usuario en el almacenamiento local del navegador (`localStorage`).
* **Micro-interacciones:** Animaciones al hacer scroll (Scroll Reveal) utilizando la librería `AOS.js` y progreso de lectura en la parte superior.

## 🛠️ Tecnologías Utilizadas

* **Estructura:** HTML5 Semántico.
* **Estilos:** CSS3 puro (Uso de variables globales, Flexbox, CSS Grid y animaciones Keyframes).
* **Lógica:** Vanilla JavaScript (ES6+).
* **Librerías Externas:** * [GSAP (GreenSock)](https://greensock.com/gsap/) - Para las animaciones complejas del hero.
  * [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) - Para los efectos de aparición de elementos.

## 🚀 Instalación y Uso

Este es un proyecto estático (Front-end), por lo que no requiere configuración de servidores ni bases de datos.

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone [https://github.com/Alejandro120325/MUSEO.git](https://github.com/Alejandro120325/MUSEO.git)

2. Navega a la carpeta del proyecto:
   ```bash
   cd MUSEO

3. Ejecución:
Abre el archivo index.html en tu navegador web de preferencia (Chrome, Firefox, Safari, Edge).


**📂 Estructura del Proyecto**
```plaintext
MUSEO/
├── css/
│   └── style.css          # Hoja de estilos principal y variables
├── img/                   # Fotografías optimizadas de la galería
├── js/
│   └── main.js            # Lógica del Quiz, Lightbox, Nav y Theme Toggle
├── video/                 # Archivos de video locales (.mp4)
├── index.html             # Página principal y Hero Animado
├── galeria.html           # Galería fotográfica y documental
├── evaluacion.html        # Quiz interactivo
└── README.md              # Documentación del proyecto
```

**👨‍💻 Autor**

**Jairo Alejandro Ojeda Herrera** - Estudiante de Ingeniería en Computación

Universidad Politécnica Salesiana (UPS) - 2026
