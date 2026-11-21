// Artículos del blog (fuente de datos simulada)
const blogs = [
  {
    id: 1,
    categoria: 'Infórmate',
    titulo: 'La magia del sonido analógico',
    resumen:
      'A diferencia de los archivos digitales comprimidos como el MP3, la grabación en vinilo captura la onda de sonido completa y continua en sus surcos generando una calidez única.',
    destacado:
      'A diferencia de los archivos digitales comprimidos como el MP3, la grabación en vinilo captura la onda de sonido completa y continua en sus surcos.',
    contenido: [
      'Cuando la aguja recorre los surcos del disco, genera una vibración mecánica que se transforma directamente en una señal eléctrica análoga. Este proceso no requiere recortar frecuencias altas o bajas para ahorrar espacio en disco, lo que genera esa calidez característica y sensación de presencia en la habitación.',
    ],
    imagen: '/images/vinilohd.jpg',
    imagenRespaldo: 'https://picsum.photos/id/1025/500/250',
    fecha: '5 de septiembre, 2026',
    autor: 'Equipo Swag Vynil',
  },
  {
    id: 2,
    categoria: 'Dato curioso',
    titulo: '¿Por qué los vinilos son originalmente transparentes?',
    resumen:
      'Aunque asociamos los discos con un color negro brillante, el PVC utilizado para fabricarlos es transparente. Descubre por qué se les añade negro de carbón en su fabricación.',
    destacado:
      'Aunque asociamos inmediatamente los discos de vinilo con un color negro brillante, el policloruro de vinilo (PVC) utilizado para su fabricación es en realidad transparente por naturaleza.',
    contenido: [
      'El característico color negro proviene de un aditivo llamado negro de carbón. Los fabricantes comenzaron a añadir este pigmento para fortalecer la resistencia estructural del plástico, reducir la estática que atrae el polvo y garantizar que los micro-surcos duren cientos de reproducciones sin deformarse.',
    ],
    imagen: '/images/vinilotransparente.jpg',
    imagenRespaldo: 'https://picsum.photos/id/145/500/250',
    fecha: '5 de septiembre, 2026',
    autor: 'Equipo Swag Vynil',
  },
]

export function obtenerBlogs() {
  return blogs
}

export function obtenerBlogPorId(id) {
  return blogs.find((blog) => blog.id === Number(id)) || null
}

export default blogs