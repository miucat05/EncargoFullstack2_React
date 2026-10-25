
import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Menú vertical del administrador */}
        <aside className="col-md-3 col-lg-2 mb-4">
          <div className="list-group">
            <div className="list-group-item active bg-primary">
              Menú administrador
            </div>

            <Link to="/admin" className="list-group-item list-group-item-action">
              Inicio
            </Link>

            <Link to="/admin/productos" className="list-group-item list-group-item-action">
              Productos
            </Link>

            <Link to="/admin/categorias" className="list-group-item list-group-item-action">
              Categorías
            </Link>

            <Link to="/admin/usuarios" className="list-group-item list-group-item-action">
              Usuarios
            </Link>
          </div>
        </aside>

        {/* Contenido central */}
        <main className="col-md-9 col-lg-10">
          <h1 className="mb-2">Panel de Administración</h1>
          <p className="text-muted">
            Bienvenido al panel de administración de Swag Vynil.
          </p>

          <div className="row g-3 mt-3">
            <div className="col-md-6 col-xl-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="h5 card-title">Productos</h2>
                  <p className="card-text">
                    Administra los productos de la tienda.
                  </p>
                  <Link to="/admin/productos" className="btn btn-primary">
                    Ver productos
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="h5 card-title">Categorías</h2>
                  <p className="card-text">
                    Organiza los productos por categoría.
                  </p>
                  <Link to="/admin/categorias" className="btn btn-primary">
                    Ver categorías
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="h5 card-title">Usuarios</h2>
                  <p className="card-text">
                    Consulta y administra los usuarios registrados.
                  </p>
                  <Link to="/admin/usuarios" className="btn btn-primary">
                    Ver usuarios
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminHome;
