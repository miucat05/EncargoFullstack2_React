// Imagen con respaldo: si la imagen local no carga, usa una de internet.
export default function ImagenBlog({ blog, altura, className = '' }) {
  const alAfallar = (e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = blog.imagenRespaldo
  }

  return (
    <img
      src={blog.imagen}
      alt={blog.titulo}
      className={`w-100 d-block ${className}`}
      style={{ height: altura, objectFit: 'cover' }}
      onError={alAfallar}
    />
  )
}