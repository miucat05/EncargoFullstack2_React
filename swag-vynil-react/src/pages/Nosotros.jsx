const equipo = [
  {
    nombre: 'Javier Romero V.',
    rol: 'Desarrollador',
    foto: '/images/mcloving.jpg',
    descripcion:
      'Estudiante de Ing. Informática. Encargado de creación y lógica de carrito, ofertas, categorias y vistas admin.',
  },
  {
    nombre: 'Catalina Campos C.',
    rol: 'Desarrolladora',
    foto: '/images/mclovin_mujer2.jpg',
    descripcion:
      'Estudiante de Ing. Informática. Encargada de Pruebas Jasmine/Karma, productos, barra de navegación, blog, contacto y home.',
  },
  {
    nombre: 'Antonella Acevedo.',
    rol: 'Desarrolladora',
    foto: '/images/mclova.jpg',
    descripcion:
      'Estudiante de Ing. Informática. Encargado de vistas admin categorías, productos y ordenes .',
  },
]

export default function Nosotros() {
  return (
    <main className="container py-5">
      <section className="mb-5">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <h1 className="page-title mb-3">Sobre Swag Vynil</h1>
            <p className="lead text-muted">
              Apasionados por la música analógica y la cultura del vinilo.
            </p>
            <p>
              Nacimos con el propósito de conectar a los amantes de la música con ediciones
              exclusivas, clásicos memorables y los lanzamientos más recientes del mercado musical
              en formato físico. Nos enfocamos en brindar una experiencia de compra transparente,
              con un catálogo curado detalladamente para audiófilos y coleccionistas.
            </p>
            <div className="row mt-4">
              <div className="col-6">
                <h5>Misión</h5>
                <p className="small text-muted">
                  Ofrecer vinilos de alta fidelidad garantizando calidad, autenticidad y excelente
                  servicio al cliente.
                </p>
              </div>
              <div className="col-6">
                <h5>Visión</h5>
                <p className="small text-muted">
                  Convertirnos en la tienda de vinilos de referencia nacional para melómanos y
                  nuevos coleccionistas.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img src="/images/storee.jpg" alt="Tienda Swag Vynil" className="img-fluid rounded shadow-sm" />
          </div>
        </div>
      </section>

      <hr className="my-5" />

      <section>
        <div className="text-center mb-5">
          <h2 className="fw-bold">Equipo de Desarrollo</h2>
          <p className="text-muted">Estudiantes detrás del diseño e implementación de este proyecto.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {equipo.map((persona) => (
            <div key={persona.nombre} className="col-md-4">
              <div className="card text-center p-4 h-100 shadow-sm">
                <div className="mb-3">
                  <img
                    src={persona.foto}
                    alt={persona.nombre}
                    className="rounded-circle"
                    style={{ width: 120, height: 120, objectFit: 'cover' }}
                  />
                </div>
                <h4>{persona.nombre}</h4>
                <p className="text-muted mb-2">{persona.rol}</p>
                <p className="small text-muted mb-0">{persona.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}