import productos from '../data/productos';
import ProductCard from '../components/ProductCard';

function Home() {
  return (
    <main className="container py-4">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Swag Vynil</h1>
          <p>Los mejores vinilos y álbumes de tus artistas favoritos, a un click de distancia.</p>
          <a href="#productos" className="btn-hero">Ver productos</a>
        </div>
        <div className="hero-img">
          <img src="/images/harry.jpg" alt="Vinilo destacado" />
        </div>
      </section>

      <section id="productos" className="products-section">
        <h2>Productos disponibles</h2>
        <div className="productos-grid">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;