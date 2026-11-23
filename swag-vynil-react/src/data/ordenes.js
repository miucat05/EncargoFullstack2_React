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
    {
    id: 3,
    cliente: "Javier Romero",
    runUsuario: "221231239",
    fecha: "2026-10-22",
    productos: [
      { nombre: "Taylor Swift - 1989", cantidad: 1, precio: 25990 },
      { nombre: "Justin Bieber - Purpose", cantidad: 2, precio: 18193 },
    ],
    estado: "Completada",
    metodoPago: "Tarjeta",
  },
  {
    id: 4,
    cliente: "Catalina Campos",
    runUsuario: "211231239",
    fecha: "2026-10-23",
    productos: [
      { nombre: "Taylor Swift - Midnights", cantidad: 1, precio: 25990 },
    ],
    estado: "Pendiente",
    metodoPago: "Transferencia",
  },
  {
    id: 5,
    cliente: "Javier Romero",
    runUsuario: "221231239",
    fecha: "2026-10-24",
    productos: [
      { nombre: "Justin Bieber - Believe", cantidad: 3, precio: 23391 },
    ],
    estado: "Completada",
    metodoPago: "Tarjeta",
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

export function obtenerOrdenesPorUsuario(run) {
  return obtenerOrdenes().filter((orden) => orden.runUsuario === run);
}

export function calcularTotalOrden(orden) {
  return orden.productos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );
}

function guardarOrdenes(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function crearOrden(datos) {
  const ordenes = obtenerOrdenes();
  const id = ordenes.reduce((mayor, orden) => Math.max(mayor, orden.id), 0) + 1;
  const orden = {
    id,
    fecha: new Date().toLocaleDateString("en-CA"), // AAAA-MM-DD en hora local
    ...datos,
  };

  guardarOrdenes([...ordenes, orden]);
  return orden;
}
