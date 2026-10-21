function ProductCard({ producto }){
    return (
        <article className="product-card">
            <img src={producto.imagen} alt={producto.nombre}/>
            <a href={`/producto/${producto.id}`} className="product-title">
                {producto.nombre}
            </a>
            <p className="product-price">
                ${producto.precio.toLocaleString('es-CL')}
            </p>
            <button type="button" className="btn-add-cart">
                Añadir
            </button>
        </article>
    );
}

export default ProductCard;