<a id="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<table align="center">
  <tr>
    <td><img src="./DE-TODITO/src/assets/images/logo.png" alt="Logo" width="80" height="80"></td>
    <td><h2>De Todito 🤠</h2></td>
  </tr>
</table>
<p align="center">  
  Una solución integral para tus compras online, con búsqueda dinámica, filtrado por categorías y carrito de compras.
</p>

<!-- ABOUT THE PROJECT -->
### Características✨
- **Migración completa a TypeScript:** Tipado estricto para componentes, servicios y modelos de datos.
- **Renderizado dinámico:** Los productos se obtienen desde la [API DummyJSON](https://dummyjson.com/docs/products#products-all).
- **Búsqueda en tiempo real:** Filtra productos al escribir en la barra de búsqueda.
- **Filtrado por categorías:** Muestra productos según la categoría seleccionada.
- **Carrito de compras:** Incluye un contador visual interactivo.
- **Separación de lógica de negocio:** Uso de servicios dedicados para manejar datos y transformaciones.
- **Validación de datos desconocidos:** Aplicación de `unknown` para garantizar la seguridad del tipado.

### Construido con🛠️
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### Instalación🧰
Este proyecto utiliza Vite como herramienta de desarrollo para un entorno rápido y moderno.
1. Clona el repositorio:
  ```bash
   https://github.com/Maricieloaf02/BOOTCAMP-FRONTEND-REACT-NTT-MARICIELO-AF.git
  ```
2. Navega al directorio del proyecto:
  ```bash
    cd de-todito
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
## Uso🛒
### Integración con la API 🔗
- **API de Productos:** Obtiene una lista de productos dinámicamente.
- **API de Categorías:** Muestra categorías disponibles para filtrado.

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

Además, para profundizar en el tema de **TypeScript**, estas son algunas de las mejores referencias que recomiendo:
- [TypeScript Cheatsheets](https://typescript-cheatsheets.io/)  
  Hojas de referencia rápidas diseñadas para desarrolladores que trabajan con React y TypeScript.

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)  
  La guía oficial de TypeScript, perfecta para aprender desde los conceptos básicos hasta características avanzadas.

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)  
  Una introducción completa y oficial que cubre los fundamentos del lenguaje y su uso práctico.
<p align="right">(<a href="#readme-top">⬆️ back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/maricielo-anchahua/
