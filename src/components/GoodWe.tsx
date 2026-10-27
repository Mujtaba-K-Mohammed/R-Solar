import { partnership, products } from "../data/products";
import { Heading, Arrow, Icon } from "./Shared";

const productPhotos = Array.from({ length: 9 }, (_, index) => ({
  src: `/images/Gold/${index + 1}.jpeg`,
  alt: `GoodWe products and energy systems — product photo ${index + 1}`,
}));

function selectSupply() {
  window.dispatchEvent(
    new CustomEvent("project-type", {
      detail: "Supply & distribution",
    }),
  );
}

export default function GoodWe() {
  return (
    <section id="goodwe" className="goodwe-section section">
      <div className="container">
        <div className="section-top">
          <div>
            <p className="eyebrow dark">Authorized GoodWe distributor · UAE</p>

            <Heading>Genuine Technology.|Connected Energy.</Heading>
          </div>

          <p>{partnership.description}</p>
        </div>

        {/* Partnership photograph */}
        <figure className="gw-partnership">
          <a
            className="gw-partnership-image"
            href="/images/Gold/Important.jpeg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the GoodWe partnership photograph in a new tab"
          >
            <img
              src="/images/Gold/Important.jpeg"
              alt="Royal Voltage Trading management with GoodWe representatives at the GoodWe exhibition stand"
              loading="lazy"
              decoding="async"
              width={1200}
              height={1600}
            />
          </a>

          <figcaption className="gw-partnership-copy">
            <p className="eyebrow dark">Royal Voltage Trading × GoodWe</p>

            <h3>Our partnership. Your energy future.</h3>

            <p>
              Royal Voltage Trading management with GoodWe representatives at
              the GoodWe exhibition stand. A shared commitment to solar
              technology and energy solutions for our customers.
            </p>

            <a
              href="#contact"
              className="text-link dark-link"
              onClick={selectSupply}
            >
              Discuss your project <Arrow diagonal />
            </a>
          </figcaption>
        </figure>

        {/* Existing product catalogue */}
        <div className="products-grid">
          {products.map((product) => (
            <article className="product-family" key={product.title}>
              <div className="product-photo">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="monitoring-family">
                    <Icon kind={5} />
                    <strong>SEMS</strong>
                    <span>PORTAL & APP</span>

                    <p>
                      Generation · Consumption
                      <br />
                      Battery status · Fault alerts
                    </p>
                  </div>
                )}
              </div>

              <div className="product-copy">
                <span>{product.category}</span>
                <h3>{product.title}</h3>
                <p>{product.description}</p>

                <a
                  href="#contact"
                  className="text-link dark-link"
                  onClick={selectSupply}
                >
                  Discuss your system <Arrow diagonal />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Additional product and system photographs */}
        <div className="gw-showcase">
          <div className="gw-showcase-heading">
            <p className="eyebrow dark">Explore the technology</p>
            <h3>Product &amp; System Showcase</h3>

            <p>
              Explore product photographs, battery storage and solar system
              displays. Select any image to view it in full detail.
            </p>
          </div>

          <div className="gw-showcase-grid">
            {productPhotos.map((photo, index) => (
              <figure className="gw-showcase-card" key={photo.src}>
                <a
                  href={photo.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gw-showcase-image"
                  aria-label={`View product photo ${index + 1} in a new tab`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </a>

                <figcaption>
                  <span>
                    Product photo {String(index + 1).padStart(2, "0")}
                  </span>

                  <a
                    href="#contact"
                    className="text-link dark-link"
                    onClick={selectSupply}
                  >
                    Enquire <Arrow diagonal />
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="product-note">
          Product selection, availability, battery compatibility and warranty
          coverage depend on the selected model and system configuration.
          Photographs may show multiple products or alternative views of the
          same product. Contact our team for the right specification.
        </p>
      </div>
    </section>
  );
}
