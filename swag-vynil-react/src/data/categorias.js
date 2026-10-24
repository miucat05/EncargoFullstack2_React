// ARCHIVO DE DATOS SIMULADO PARA CATEGORÍAS
// Funciona como una "base de datos" falsa con CRUD:
// Crear, Leer, Actualizar y Eliminar.
// Usa localStorage para que los datos no se pierdan al recargar.

const CLAVE = "swag_categorias";

const categoriasIniciales = [
  { id: 1, nombre: "Pop", descripcion: "Discos de música pop" },
  { id: 2, nombre: "Urbano", descripcion: "Discos de música urbana" },
];

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// LEER todas
export function obtenerCategorias() {
  const texto = localStorage.getItem(CLAVE);
  if (!texto) {
    guardar(categoriasIniciales);
    return [...categoriasIniciales];
  }
  return JSON.parse(texto);
}

// LEER una por id
export function obtenerCategoriaPorId(id) {
  return obtenerCategorias().find((c) => c.id === Number(id));
}

// CREAR
export function crearCategoria({ nombre, descripcion }) {
  const lista = obtenerCategorias();
  const nuevoId = lista.length > 0 ? Math.max(...lista.map((c) => c.id)) + 1 : 1;
  const nueva = { id: nuevoId, nombre: nombre.trim(), descripcion: descripcion.trim() };
  guardar([...lista, nueva]);
  return nueva;
}

// ACTUALIZAR
export function actualizarCategoria(id, { nombre, descripcion }) {
  const lista = obtenerCategorias().map((c) =>
    c.id === Number(id)
      ? { ...c, nombre: nombre.trim(), descripcion: descripcion.trim() }
      : c
  );
  guardar(lista);
}

// ELIMINAR
export function eliminarCategoria(id) {
  guardar(obtenerCategorias().filter((c) => c.id !== Number(id)));
}

// VALIDAR nombre: devuelve el texto del error, o "" si está bien
export function validarNombreCategoria(nombre, idActual = null) {
  const limpio = nombre.trim();
  if (limpio === "") return "El nombre es obligatorio.";
  if (limpio.length < 3) return "El nombre debe tener al menos 3 caracteres.";
  if (limpio.length > 50) return "El nombre no puede pasar de 50 caracteres.";
  const repetido = obtenerCategorias().some(
    (c) => c.nombre.toLowerCase() === limpio.toLowerCase() && c.id !== Number(idActual)
  );
  if (repetido) return "Ya existe una categoría con ese nombre.";
  return "";
}