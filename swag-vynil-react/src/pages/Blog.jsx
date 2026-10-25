import { Link } from 'react-router-dom'
import { obtenerBlogs } from '../data/blogs'
import ImagenBlog from '../components/ImagenBlog'

export default function Blog() {
  const blogs = obtenerBlogs()

  return (
    <main className="container py-5">
      <h1 className="text-center text-uppercase fw-bold mb-5">Noticias importantes</h1>

      <div className="d-flex flex-column gap-5">
        {blogs.map((blog) => (
          <article key={blog.id} className="card p-4 shadow-sm border">
            <div className="row align-items-center g-4">
              <div className="col-md-6 order-2 order-md-1">
                <h2 className="fw-bold mb-1">{blog.categoria}</h2>
                <h5 className="text-secondary fw-semibold mb-3">{blog.titulo}</h5>
                <p className="text-muted">{blog.resumen}</p>
                <Link to={`/blog/${blog.id}`} className="btn btn-outline-dark mt-3">
                  VER CASO
                </Link>
              </div>
              <div className="col-md-6 order-1 order-md-2">
                <div className="border rounded overflow-hidden bg-light">
                  <ImagenBlog blog={blog} altura={250} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}