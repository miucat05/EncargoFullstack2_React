import { useState } from "react";
import { obtenerProductos, crearProducto,actualizarProducto, eliminarProducto } from "../data/productosService";
import ProductoForm from "../components/admin/ProductoForm";

function AdminProductos() {
  const [seccion, setSeccion] = useState("mostrar");
  const [listaProductos, setListaProductos] = useState(() => obtenerProductos());
  const [productoEditando, setProductoEditando] = useState(null);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Administración de productos</h1>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setSeccion("nuevo")}
        >
          + Nuevo producto
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => setSeccion("mostrar")}
        >
          Mostrar productos
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => setSeccion("criticos")}
        >
          Productos críticos
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => setSeccion("reportes")}
        >
          Reportes
        </button>
      </div>

    
{(seccion === "nuevo" || seccion === "editar") && (
  <ProductoForm
    key={productoEditando ? productoEditando.id : "nuevo"}
    productoInicial={productoEditando}
    onGuardar={(datos) => {
      if (productoEditando) {
        actualizarProducto(productoEditando.id, datos);
      } else {
        crearProducto(datos);
      }

      setListaProductos(obtenerProductos());
      setProductoEditando(null);
      setSeccion("mostrar");
      alert(
        productoEditando
          ? "Producto actualizado correctamente."
          : "Producto guardado correctamente."
      );
    }}
    onCancelar={() => {
      setProductoEditando(null);
      setSeccion("mostrar");
    }}
  />
)}


      {seccion === "mostrar" && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {listaProductos.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      width="65"
                    />
                  </td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>${producto.precio.toLocaleString("es-CL")}</td>
                  <td>
                    <button
  className="btn btn-sm btn-outline-primary me-2"
  onClick={() => {
    setProductoEditando(producto);
    setSeccion("editar");
  }}
>
  Editar
</button>
                    <button
  className="btn btn-sm btn-outline-danger"
  onClick={() => {
    if (window.confirm(`¿Eliminar "${producto.nombre}"?`)) {
      eliminarProducto(producto.id);
      setListaProductos(obtenerProductos());
    }
  }}
>
  Eliminar
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {seccion === "criticos" && (
  <div>
    <h2 className="h4 mb-3">Productos con stock crítico</h2>

    {(() => {
      const productosCriticos = listaProductos.filter(
        (producto) =>
          Number(producto.stock ?? 0) <=
          Number(producto.stockCritico ?? 5)
      );

      if (productosCriticos.length === 0) {
        return (
          <div className="alert alert-success">
            No hay productos con stock crítico.
          </div>
        );
      }

      return (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Stock disponible</th>
                <th>Stock mínimo</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {productosCriticos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.stock ?? 0}</td>
                  <td>{producto.stockCritico ?? 5}</td>
                  <td>
                    <span className="badge text-bg-danger">
                      Stock crítico
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    })()}
  </div>
)}

      {seccion === "reportes" && (
        <div className="card p-3">
          <h2 className="h5">Resumen de productos</h2>
          <p className="mb-0">
            Total de productos registrados: <strong>{listaProductos.length}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminProductos;