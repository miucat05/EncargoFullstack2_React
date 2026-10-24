
const CLAVE = "swag_ordenes";

const ordenesIniciales = [
  {
    id: 1,
    cliente: "Camila González",
    fecha: "2026-10-20",
    productos: [
      { nombre: "Vinilo Pop", cantidad: 1, precio: 15990 },
      { nombre: "Vinilo Urbano", cantidad: 2, precio: 12990 },
    ],
    estado: "Pendiente",
    metodoPago: "Tarjeta",
  },
  {
    id: 2,
    cliente: "Matías Pérez",
    fecha: "2026-10-21",
    productos: [
      { nombre: "Vinilo Rock", cantidad: 1, precio: 14990 },
    ],
    estado: "Completada",
    metodoPago: "Transferencia",
  },
];

export function obtenerOrdenes() {
  const texto = localStorage.getItem(CLAVE);

  if (!texto) {
    localStorage.setItem(CLAVE, JSON.stringify(ordenesIniciales));
    return [...ordenesIniciales];
  }

  return JSON.parse(texto);
}

export function obtenerOrdenPorId(id) {
  return obtenerOrdenes().find((orden) => orden.id === Number(id));
}

export function calcularTotalOrden(orden) {
  return orden.productos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );
}
