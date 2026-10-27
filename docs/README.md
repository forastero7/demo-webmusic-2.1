# Casa Musical Jhonatan BM · Tienda demo

**Casa Musical Jhonatan BM — Tu pasión por la música comienza aquí.**

Tienda digital DEMO de instrumentos musicales, equipos de sonido y accesorios musicales, orientada a convertir visitas en consultas por WhatsApp. Diseño y desarrollo: **Rediseñalo.pe**.

> Productos, precios y contenidos son **demostrativos**. Las marcas, la disponibilidad, el horario y los datos legales están marcados como "por confirmar". La web no procesa pagos.

## Tecnología

Sitio estático sin dependencias ni proceso de build: HTML5 + CSS + JavaScript vanilla.

```
index.html          Estructura, SEO, Open Graph y datos estructurados (schema.org MusicStore)
css/styles.css      Estilos (tokens, componentes y responsive)
js/i18n.js          Textos en español (por defecto) e inglés + distritos de Lima y Callao
js/products.js      Categorías y catálogo demo (precios en S/)
js/icons.js         Ilustraciones SVG de productos
js/app.js           Catálogo, filtros, ficha, lista de consulta, recomendador, WhatsApp, idioma
img/                Favicon e imagen para compartir (og-image.png)
```

## Funciones

- Catálogo de 42 productos demo en 6 categorías: guitarras y bajos, teclados y pianos, baterías y percusión, micrófonos y audio, amplificadores y accesorios musicales.
- Buscador, chips de categoría, filtros por presupuesto y uso, y orden por precio.
- Botón **Consultar** en cada producto: abre WhatsApp con el nombre y el precio del producto.
- **Mi lista** (carrito de consulta): cantidades, distrito o ciudad, boleta/factura y envío del pedido completo por WhatsApp. Se guarda solo en el navegador del visitante.
- Recomendador en 3 preguntas, sección "Cómo comprar", Libro de Reclamaciones y aviso de privacidad.
- Botón **EN / ES**: traduce la interfaz, los productos y los mensajes de WhatsApp.

## WhatsApp

- Número: **+51 975 379 354** → `https://wa.me/51975379354`
- Constante `WHATSAPP` en `js/app.js`; los enlaces estáticos de `index.html` traen el mensaje predeterminado ya codificado.
- Mensaje predeterminado: "¡Hola, Casa Musical Jhonatan BM! Me interesa un instrumento musical y quisiera recibir más información."

## Ver en local

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

(También funciona abriendo `index.html` directamente en el navegador.)

## Publicar en GitHub Pages

El sitio vive en la carpeta `docs/` y se publica con GitHub Pages desde la rama `main`, carpeta `/docs`. No necesita build: cada commit en `main` actualiza la web en 1 o 2 minutos.

URL: https://forastero7.github.io/demo-webmusic-2.1/

## Antes de publicar como tienda real

- Reemplazar productos, precios y marcas en `js/products.js`. Fotos reales: `photos: [photo("nombre-01", ancho, alto)]` con los WebP en `img/productos/` (ver `REGISTRO_IMAGENES.md`).
- Confirmar horario, razón social, RUC y el Libro de Reclamaciones oficial.
- Si se cambia el dominio, actualizar `canonical`, `og:url`, `og:image` y el JSON-LD de `index.html`.