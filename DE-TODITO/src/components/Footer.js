class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const container = document.createElement("footer");
    container.classList.add("main-footer");

    // Contenedor principal
    const footerContainer = document.createElement("div");
    footerContainer.classList.add("footer-container");

    // Brand del footer
    const footerBrand = document.createElement("div");
    footerBrand.classList.add("footer-brand");

    const logo = document.createElement("img");
    logo.src = "../assets/images/logo.png";
    logo.alt = "De Todito Logo";
    logo.classList.add("footer-logo");

    const brandText = document.createElement("p");
    brandText.textContent = "Ofrecemos calidad y salud en cada producto que llevas a tu hogar.";

    const contactInfo = document.createElement("p");
    contactInfo.classList.add("contact-info");

    const phoneLink = document.createElement("a");
    phoneLink.href = "tel:(51) 983-464-777";
    phoneLink.textContent = "(51) 983-464-777";

    const separator = document.createElement("span");
    separator.textContent = " or ";

    const emailLink = document.createElement("a");
    emailLink.href = "mailto:maricielo.datascience@gmail.com";
    emailLink.textContent = "maricielo.datascience@gmail.com";

    // Ensamblar contact-info
    contactInfo.appendChild(phoneLink);
    contactInfo.appendChild(separator);
    contactInfo.appendChild(emailLink);

    // Ensamblar footer-brand
    footerBrand.appendChild(logo);
    footerBrand.appendChild(brandText);
    footerBrand.appendChild(contactInfo);

    // Links del footer
    const footerLinks = document.createElement("div");
    footerLinks.classList.add("footer-links");

    const accountColumn = this.createFooterColumn("Mi cuenta", [
      { href: "#", text: "Carrito de compras" },
    ]);

    const helpColumn = this.createFooterColumn("Ayuda", [
      { href: "#", text: "Contactanos" },
    ]);

    footerLinks.appendChild(accountColumn);
    footerLinks.appendChild(helpColumn);

    // Ensamblar el contenedor principal
    footerContainer.appendChild(footerBrand);
    footerContainer.appendChild(footerLinks);

    // Añadir estilos
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
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        max-width: 1200px;
        margin: 0 auto;
      }
      .footer-brand {
        flex: 1 1 40%;
        display: flex;
        flex-direction: column;
      }
      .footer-logo {
        width: var(--logo-size);
        margin-bottom: var(--gap-small);
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
      .footer-column ul li {
        margin-bottom: var(--gap-small);
      }
      .footer-column ul li a {
        color: var(--text-color-light);
        text-decoration: none;
        font-size: var(--font-size-small);
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

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
    container.appendChild(footerContainer);
  }

  createFooterColumn(title, links) {
    const column = document.createElement("div");
    column.classList.add("footer-column");

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    const list = document.createElement("ul");
    links.forEach((link) => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.text;
      listItem.appendChild(anchor);
      list.appendChild(listItem);
    });

    column.appendChild(titleElement);
    column.appendChild(list);

    return column;
  }
}

customElements.define("main-footer", FooterComponent);
