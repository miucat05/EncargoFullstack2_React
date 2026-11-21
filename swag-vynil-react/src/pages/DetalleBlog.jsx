import { Link, useParams } from 'react-router-dom'
import { obtenerBlogPorId } from '../data/blogs'
import ImagenBlog from '../components/ImagenBlog'

export default function DetalleBlog() {
  const { id } = useParams()
  const blog = obtenerBlogPorId(id)

  if (!blog) {
    return (
      <main className="container py-5 text-center">
        <h1 className="h3">Artículo no encontrado</h1>
        <Link to="/blog" className="btn btn-outline-dark mt-3">← Volver a Blogs</Link>
      </main>
    )
  }

  return (
    <main className="container py-5">
      <nav className="breadcrumb-nav mb-4">
        <Link to="/blog">← Volver a Blogs</Link>
      </nav>

      <article className="mx-auto" style={{ maxWidth: 900 }}>
        <h1 className="fw-bold mb-3">{blog.categoria}: {blog.titulo}</h1>
        <p className="text-muted mb-4">Publicado el {blog.fecha} | Por {blog.autor}</p>

        <div className="row align-items-center g-4">
          <div className="col-md-7">
            <p className="lead">{blog.destacado}</p>
            {blog.contenido.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}
          </div>
          <div className="col-md-5">
            <div className="border rounded overflow-hidden shadow-sm bg-light">
              <ImagenBlog blog={blog} altura={300} />
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}