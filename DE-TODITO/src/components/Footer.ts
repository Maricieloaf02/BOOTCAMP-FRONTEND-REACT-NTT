/**
 * Clase FooterComponent
 * Representa un componente de footer reutilizable.
 */
import logoDeTodito from "../assets/images/logo.png";

class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Crear el contenedor principal del footer
    const container = this.createFooter();

    // Crear y agregar estilos encapsulados
    const style = this.createStyles();

    // Ensamblar el Shadow DOM
    this.shadowRoot!.appendChild(style);
    this.shadowRoot!.appendChild(container);
  }

  /**
   * Crea el contenedor principal del footer.
   * @returns Contenedor principal del footer.
   */
  private createFooter(): HTMLElement {
    const container = document.createElement("footer");
    container.classList.add("main-footer");

    // Contenedor interno del footer
    const footerContainer = document.createElement("div");
    footerContainer.classList.add("footer-container");

    // Sección de la marca
    const footerBrand = this.createFooterBrand();

    // Sección de enlaces
    const footerLinks = this.createFooterLinks();

    // Ensamblar el contenedor principal
    footerContainer.appendChild(footerBrand);
    footerContainer.appendChild(footerLinks);
    container.appendChild(footerContainer);

    return container;
  }

  /**
   * Crea la sección de la marca en el footer.
   * @returns Sección de la marca.
   */
  private createFooterBrand(): HTMLElement {
    const footerBrand = document.createElement("div");
    footerBrand.classList.add("footer-brand");

    // Logo
    const logo = document.createElement("img");
    logo.src = logoDeTodito;
    logo.alt = "De Todito Logo";
    logo.classList.add("footer-logo");

    // Descripción de la marca
    const brandText = document.createElement("p");
    brandText.textContent =
      "Ofrecemos calidad en cada producto que llevas a tu hogar.";

    // Información de contacto
    const contactInfo = this.createContactInfo();

    // Ensamblar la sección de la marca
    footerBrand.appendChild(logo);
    footerBrand.appendChild(brandText);
    footerBrand.appendChild(contactInfo);

    return footerBrand;
  }

  /**
   * Crea la información de contacto del footer.
   * @returns Contenedor de la información de contacto.
   */
  private createContactInfo(): HTMLElement {
    const contactInfo = document.createElement("p");
    contactInfo.classList.add("contact-info");

    // Teléfono
    const phoneLink = document.createElement("a");
    phoneLink.href = "tel:(51) 983-464-777";
    phoneLink.textContent = "(51) 983-464-777";

    // Separador
    const separator = document.createElement("span");
    separator.textContent = " or ";

    // Email
    const emailLink = document.createElement("a");
    emailLink.href = "mailto:maricielo.datascience@gmail.com";
    emailLink.textContent = "maricielo.datascience@gmail.com";

    // Ensamblar los elementos de contacto
    contactInfo.appendChild(phoneLink);
    contactInfo.appendChild(separator);
    contactInfo.appendChild(emailLink);

    return contactInfo;
  }

  /**
   * Crea la sección de enlaces del footer.
   * @returns Contenedor de enlaces del footer.
   */
  private createFooterLinks(): HTMLElement {
    const footerLinks = document.createElement("div");
    footerLinks.classList.add("footer-links");

    // Columna "Mi cuenta"
    const accountColumn = this.createFooterColumn("Mi cuenta", [
      { href: "#", text: "Carrito de compras" },
    ]);

    // Columna "Ayuda"
    const helpColumn = this.createFooterColumn("Ayuda", [
      { href: "#", text: "Contactanos" },
    ]);

    // Ensamblar las columnas
    footerLinks.appendChild(accountColumn);
    footerLinks.appendChild(helpColumn);

    return footerLinks;
  }

  /**
   * Crea una columna del footer con un título y enlaces.
   * @param title - Título de la columna.
   * @param links - Lista de enlaces de la columna.
   * @returns Columna del footer.
   */
  private createFooterColumn(
    title: string,
    links: { href: string; text: string }[]
  ): HTMLElement {
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

    // Ensamblar la columna
    column.appendChild(titleElement);
    column.appendChild(list);

    return column;
  }

  /**
   * Crea y retorna los estilos encapsulados del componente.
   * @returns Estilos encapsulados.
   */
  private createStyles(): HTMLStyleElement {
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
        flex-wrap: wrap;
        justify-content: space-between;
        gap: var(--gap-medium);
      }

      .footer-logo {
        width: var(--logo-size);
        max-width: 100%;
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
    `;
    return style;
  }
}

// Registrar el componente como un Custom Element
customElements.define("main-footer", FooterComponent);
