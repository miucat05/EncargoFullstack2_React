import { useState } from "react";
const productos = [
  {
    id: 1,
    nombre: "Taylor Swift - 1989",
    precio: 25990,
    imagen: "images/TAYLOR1.webp",
    categoria: "Pop"
  },
  {
    id: 2,
    nombre: "Taylor Swift - Red (TV)",
    precio: 25990,
    imagen: "images/taylor 2.webp",
    categoria: "Pop"
  },
  {
    id: 3,
    nombre: "Taylor Swift - Midnights",
    precio: 25990,
    imagen: "images/taylor3.webp",
    categoria: "Pop"
  },
  {
    id: 4,
    nombre: "Taylor Swift - Evermore",
    precio: 25990,
    imagen: "images/tayy1.webp",
    categoria: "Pop"
  },
  {
    id: 5,
    nombre: "Taylor Swift - Showgirl",
    precio: 25990,
    imagen: "images/taylor5.webp",
    categoria: "Pop"
  },
  {
    id: 6,
    nombre: "Taylor Swift - Folklore",
    precio: 25990,
    imagen: "images/taylor6.webp",
    categoria: "Pop"
  },
  {
    id: 7,
    nombre: "Justin Bieber - Changes",
    precio: 25990,
    imagen: "images/FFE9DFB9-862F-4B67-9F3A-658A4D0C8E20.webp",
    categoria: "Urbano"
  },
  {
    id: 8,
    nombre: "Justin Bieber - Swag",
    precio: 25990,
    imagen: "images/swag.webp",
    categoria: "Urbano"
  },
  {
    id: 9,
    nombre: "Justin Bieber - Purpose",
    precio: 25990,
    imagen: "images/purpose.webp",
    categoria: "Urbano"
  },
  {
    id: 10,
    nombre: "Justin Bieber - My World",
    precio: 25990,
    imagen: "images/myworld.webp",
    categoria: "Urbano"
  },
  {
    id: 11,
    nombre: "Justin Bieber - Justice",
    precio: 25990,
    imagen: "images/justice.webp",
    categoria: "Urbano"
  },
  {
    id: 12,
    nombre: "Justin Bieber - Believe",
    precio: 25990,
    imagen: "images/believe.webp",
    categoria: "Urbano"
  }
];

function AdminProductos() {
  return (
    <div>
      <h1>Productos</h1>

      <button>+ Nuevo producto</button>

      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                <img
                  src={`/${producto.imagen}`}
                  alt={producto.nombre}
                  width="80"
                />
              </td>

              <td>{producto.nombre}</td>

              <td>{producto.categoria}</td>

              <td>
                ${producto.precio.toLocaleString("es-CL")}
              </td>

              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductos;