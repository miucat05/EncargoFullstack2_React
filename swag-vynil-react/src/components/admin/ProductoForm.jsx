import { useState, useEffect } from "react";
import { listarCategoriasApi } from "../../api/categoriasApi";

function ProductoForm({ productoInicial, onGuardar, onCancelar }) {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descuento, setDescuento] = useState("0");
  const [categoriaId, setCategoriaId] = useState("");
  const [imagen, setImagen] = useState("/images/");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("0");
  const [stockCritico, setStockCritico] = useState("5");

  // Las categorías vienen de la API (ya no son fijas)
  useEffect(() => {
    listarCategoriasApi()
      .then(setCategorias)
      .catch(() => setCategorias([]));
  }, []);

  useEffect(() => {
    if (productoInicial) {
      setNombre(productoInicial.nombre || "");
      setPrecio(String(productoInicial.precioOriginal ?? productoInicial.precio ?? ""));
      setDescuento(String(productoInicial.descuento ?? 0));
      setCategoriaId(String(productoInicial.categoriaId ?? ""));
      setImagen(productoInicial.imagen || "");
      setDescripcion(productoInicial.descripcion || "");
      setStock(String(productoInicial.stock ?? 0));
      setStockCritico(String(productoInicial.stockCritico ?? 5));
    } else {
      setNombre("");
      setPrecio("");
      setDescuento("0");
      setCategoriaId("");
      setImagen("/images/");
      setDescripcion("");
      setStock("0");
      setStockCritico("5");
    }
  }, [productoInicial]);

  // Producto nuevo: selecciona la primera categoría cuando ya cargaron
  useEffect(() => {
    if (!categoriaId && categorias.length > 0) {
      setCategoriaId(String(categorias[0].id));
    }
  }, [categorias, categoriaId]);

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !precio || Number(precio) <= 0) {
      alert("Ingresa un nombre y un precio válido.");
      return;
    }

    if (descuento === "" || Number(descuento) < 0 || Number(descuento) > 100) {
      alert("El descuento debe estar entre 0 y 100.");
      return;
    }

    if (
      stock === "" ||
      stockCritico === "" ||
      Number(stock) < 0 ||
      Number(stockCritico) < 0
    ) {
      alert("Ingresa cantidades de stock válidas.");
      return;
    }

    if (!categoriaId) {
      alert("Selecciona una categoría.");
      return;
    }

    onGuardar({
      nombre: nombre.trim(),
      precio: Number(precio),
      descuento: Number(descuento),
      categoriaId: Number(categoriaId),
      imagen: imagen.trim(),
      descripcion: descripcion.trim(),
      stock: Number(stock),
      stockCritico: Number(stockCritico),
    });
  };

  return (
    <form onSubmit={manejarEnvio} className="card p-4 mb-4">
      <h2 className="h4 mb-3">
        {productoInicial ? "Editar producto" : "Registrar nuevo vinilo"}
      </h2>

      <div className="mb-3">
        <label className="form-label">Nombre del producto</label>
        <input
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Precio (CLP)</label>
          <input
            className="form-control"
            type="number"
            min="1"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Descuento (%)</label>
          <input
            className="form-control"
            type="number"
            min="0"
            max="100"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Stock disponible</label>
          <input
            className="form-control"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Stock crítico (mínimo)</label>
          <input
            className="form-control"
            type="number"
            min="0"
            value={stockCritico}
            onChange={(e) => setStockCritico(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <select
          className="form-select"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
        >
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Ruta de la imagen</label>
        <input
          className="form-control"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          placeholder="/images/nombre-imagen.webp"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          rows="3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          {productoInicial ? "Guardar cambios" : "Guardar producto"}
        </button>

        <button className="btn btn-secondary" type="button" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default ProductoForm;