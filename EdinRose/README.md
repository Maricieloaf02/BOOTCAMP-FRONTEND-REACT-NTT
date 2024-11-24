<a id="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<h2 align="center">EdinRose 🍃</h2>
<p align="center">  
  Una solución integral para tus compras online, con búsqueda dinámica, filtrado por categorías y carrito de compras.
</p>

### Características✨
- **Renderizado dinámico:** Los productos se obtienen desde la [API DummyJSON](https://dummyjson.com/docs/products#products-all).
- **Búsqueda en tiempo real:** Filtra productos al escribir en la barra de búsqueda.
- **Filtrado por categorías:** Muestra productos según la categoría seleccionada.
- **Carrito de compras:** Incluye un contador visual interactivo.
- **Separación de lógica de negocio:** Uso de servicios dedicados para manejar datos y transformaciones.

### Construido con🛠️
- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)


### Instalación🧰
Este proyecto utiliza Vite como herramienta de desarrollo para un entorno rápido y moderno.
1. Clona el repositorio:
  ```bash
   https://github.com/Maricieloaf02/BOOTCAMP-FRONTEND-REACT-NTT-MARICIELO-AF.git
  ```
2. Navega al directorio del proyecto:
  ```bash
    cd EdinRose
  ```
3. Instala las dependencias
  ```sh
  npm install
  ```
4. Ejecutar el proyecto en modo desarrollo
  ```sh
  npm run dev
  ```
5. O Compilar para producción
  ```sh
  npm run build
  ```
6. Previsualizar el build de producción
  ```sh
  npm run preview
  ```
<p align="right">(<a href="#readme-top">⬆️ back to top</a>)</p>


## Estructura del Proyecto🏗️
```
📂 DE-TODITO/
├── 📂 dist/                # Archivos generados tras la compilación
├── 📂 node_modules/        # Dependencias instaladas
├── 📂 src/                 
│   ├── 📂 assets/          # Recursos estáticos
│   ├── 📂 components/      # Componentes principales
│   │   ├── 📝 FilterBar.ts
│   │   ├── 📝 Footer.ts
│   │   ├── 📝 Header.ts
│   │   ├── 📝 ProductGrid.ts
│   │   ├── 📝 SearchBar.ts
│   │   └── 📝 UserCart.ts
│   ├── 📂 services/        # Lógica de negocio y manejo de datos
│   │   ├── 📝 CategoryService.ts
│   │   └── 📝 ProductService.ts
│   ├── 📂 types/           # Definiciones de tipos e interfaces en TypeScript
│   │   ├── 📝 Category.ts
│   │   ├── 📝 Event.ts
│   │   └── 📝 Product.ts
│   ├── 📝 index.html       # Página principal del proyecto
│   ├── 📝 main.ts          # Archivo de entrada principal
│   └── 🎨 style.css        # Estilos globales del proyecto
├── 📝 custom.d.ts          # Tipos personalizados para recursos estáticos
├── 📝 package.json         # Configuración del proyecto y dependencias
├── 📝 package-lock.json    # Bloqueo de dependencias para consistencia
├── 📝 tsconfig.json        # Configuración de TypeScript
├── 📝 vite.config.js       # Configuración de Vite
└── 📝 README.md            # Documentación del proyecto
```
<!-- CONTACT -->

## Contacto📬

Maricielo Anchahua - [@Maricielo_AF](https://www.linkedin.com/in/maricielo-anchahua/) - maricielo.af02@gmail.com
<p align="right">(<a href="#readme-top">⬆️ back to top</a>)</p>

## Agradecimientos🙏
Quiero agradecer especialmente a mis profesores del Bootcamp de NTT Data por su apoyo, enseñanza y dedicación:

- **Max Collazos**
- **Clever Ordoñez Rojas**
- **Kevin Alexander Luján Bernaola**
- **Jean Williams Oscopupe**
- **Oscar José Gregorio Ochoa Moreno**

Además, para profundizar en el tema de **React**, estas son algunas de las mejores referencias que recomiendo:
- [React Official Documentation](https://react.dev/)  
  La documentación oficial de React, ideal para aprender desde lo básico hasta patrones avanzados de desarrollo.

- [React Cheatsheets for Developers](https://react.dev/learn)  
  Una colección de hojas de referencia rápidas y recursos útiles para desarrolladores que trabajan con React.

- [The Beginner's Guide to React](https://egghead.io/courses/the-beginner-s-guide-to-react)  
  Una guía paso a paso que ayuda a los nuevos desarrolladores a aprender los conceptos clave de React.

- [React Patterns](https://reactpatterns.com/)  
  Una lista de patrones y mejores prácticas para estructurar y organizar tus aplicaciones React.

- [Awesome React](https://github.com/enaqx/awesome-react)  
  Una lista curada de recursos increíbles, bibliotecas y herramientas para trabajar con React.

<p align="right">(<a href="#readme-top">⬆️ back to top</a>)</p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/maricielo-anchahua/
