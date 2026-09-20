import { partnership, products } from "../data/products";
import { Heading, Arrow, Icon } from "./Shared";
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
        <div className="products-grid">
          {products.map((product, i) => (
            <article className="product-family" key={product.title}>
              <div className="product-photo">
                {product.image ? (
                  <img src={product.image} alt={product.alt} loading="lazy" />
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
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("project-type", {
                        detail: "Supply & distribution",
                      }),
                    )
                  }
                >
                  Discuss your system <Arrow diagonal />
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="product-note">
          Product selection, battery compatibility and warranty coverage depend
          on the selected model and system configuration. Contact our team for
          the right specification.
        </p>
      </div>
    </section>
  );
}
