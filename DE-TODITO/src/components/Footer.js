class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Crea el contenedor principal del footer
    const container = document.createElement("footer");
    container.classList.add("main-footer");

    // Contenedor interno del footer
    const footerContainer = document.createElement("div");
    footerContainer.classList.add("footer-container");

    // Sección de la marca en el footer
    const footerBrand = document.createElement("div");
    footerBrand.classList.add("footer-brand");

    // Logo de la marca
    const logo = document.createElement("img");
    logo.src = "../assets/images/logo.png";
    logo.alt = "De Todito Logo";
    logo.classList.add("footer-logo");

    // Descripción de la marca
    const brandText = document.createElement("p");
    brandText.textContent =
      "Ofrecemos calidad en cada producto que llevas a tu hogar.";

    // Información de contacto
    const contactInfo = document.createElement("p");
    contactInfo.classList.add("contact-info");

    // Link al número telefónico
    const phoneLink = document.createElement("a");
    phoneLink.href = "tel:(51) 983-464-777";
    phoneLink.textContent = "(51) 983-464-777";

    // Separador entre teléfono y email
    const separator = document.createElement("span");
    separator.textContent = " or ";

    // Link al email
    const emailLink = document.createElement("a");
    emailLink.href = "mailto:maricielo.datascience@gmail.com";
    emailLink.textContent = "maricielo.datascience@gmail.com";

    // Ensambla los elementos de la información de contacto
    contactInfo.appendChild(phoneLink);
    contactInfo.appendChild(separator);
    contactInfo.appendChild(emailLink);

    // Ensambla la sección de la marca
    footerBrand.appendChild(logo);
    footerBrand.appendChild(brandText);
    footerBrand.appendChild(contactInfo);

    // Sección de enlaces del footer
    const footerLinks = document.createElement("div");
    footerLinks.classList.add("footer-links");

    // Columna "Mi cuenta" con enlaces
    const accountColumn = this.createFooterColumn("Mi cuenta", [
      { href: "#", text: "Carrito de compras" },
    ]);

    // Columna "Ayuda" con enlaces
    const helpColumn = this.createFooterColumn("Ayuda", [
      { href: "#", text: "Contactanos" },
    ]);

    // Ensambla las columnas de enlaces en el contenedor
    footerLinks.appendChild(accountColumn);
    footerLinks.appendChild(helpColumn);

    // Ensambla el contenedor principal del footer
    footerContainer.appendChild(footerBrand);
    footerContainer.appendChild(footerLinks);

    // Define y agrega los estilos del footer
    const style = document.createElement("style");
    style.textContent = `
  .main-footer {
    background-color: var(--secondary-color);
    color: var(--text-light);
    padding: var(--padding-medium);
    font-size: var(--font-size-small);
  }

  .footer-container {
    display: flex;
    flex-wrap: wrap; /* Permite que los elementos se ajusten en filas adicionales */
    justify-content: space-between;
    gap: var(--gap-medium);
  }

  .footer-logo {
    width: var(--logo-size);
    max-width: 100%; /* Ajusta el tamaño del logo en pantallas pequeñas */
  }

  .footer-links {
    display: flex;
    flex: 1 1 60%;
    justify-content: flex-end;
    gap: var(--gap-medium);
  }

  .footer-column {
    display: flex;
    flex-direction: column;
  }

  .footer-column h3 {
    margin-bottom: var(--gap-small);
    font-size: var(--font-size-medium);
    color: var(--text-light);
  }

  .footer-column ul {
    list-style: none;
    padding: 0;
  }

  .footer-column ul li a {
    color: var(--text-color-light);
    text-decoration: none;
  }

  .footer-column ul li a:hover {
    text-decoration: underline;
    color: var(--text-light);
  }

  .contact-info a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: var(--font-weight-bold);
  }

  .contact-info a:hover {
    text-decoration: underline;
  }

  /* Responsive: Ajuste para pantallas pequeñas */
  @media (max-width: 576px) {
    .footer-container {
      flex-direction: column; /* Apila las secciones en lugar de alinearlas horizontalmente */
      align-items: center;
      text-align: center; /* Centra el texto y los elementos */
    }

    .footer-links {
      flex-direction: column; /* Apila los enlaces */
      align-items: center;
      gap: var(--gap-small);
    }

    .footer-column {
      align-items: center; /* Centra las columnas */
    }

    .footer-column h3 {
      font-size: var(--font-size-small); /* Ajusta el tamaño de los títulos */
    }

    .footer-column ul li a {
      font-size: var(--font-size-small); /* Ajusta el tamaño de los enlaces */
    }
  }

  /* Responsive: Ajuste para pantallas medianas */
  @media (min-width: 577px) and (max-width: 768px) {
    .footer-container {
      flex-wrap: wrap; /* Permite que los elementos se distribuyan en más de una fila */
      gap: var(--gap-medium);
    }

    .footer-links {
      justify-content: center; /* Centra los enlaces horizontalmente */
    }
  }
`;


    // Ensambla el footer en el Shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
    container.appendChild(footerContainer);
  }

  // Método para crear una columna del footer con un título y enlaces
  createFooterColumn(title, links) {
    const column = document.createElement("div");
    column.classList.add("footer-column");

    // Título de la columna
    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    // Lista de enlaces
    const list = document.createElement("ul");
    links.forEach((link) => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.text;
      listItem.appendChild(anchor);
      list.appendChild(listItem);
    });

    // Ensambla los elementos en la columna
    column.appendChild(titleElement);
    column.appendChild(list);

    return column;
  }
}

// Registra el componente como un Custom Element
customElements.define("main-footer", FooterComponent);
