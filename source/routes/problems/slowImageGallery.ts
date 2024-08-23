import type { FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line jsdoc/require-jsdoc
export const imageGalleryRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/problems/slow-image-gallery', async (_, reply) => {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Slow Loading Image Gallery</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
          .image-container { position: relative; height: 200px; background-color: #f0f0f0; }
          .image-container img { width: 100%; height: 100%; object-fit: cover; }
          .loading { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        </style>
      </head>
      <body>
        <h1>Slow Loading Image Gallery</h1>
        <div class="gallery">
          ${ Array.from({length: 9}).map((_, i) => i + 1).map(i => `
            <div class="image-container">
              <div class="loading">Loading...</div>
              <img src="/problems/slow-image?complexity=${i}" alt="Slow image ${i}" loading="lazy" onload="this.previousElementSibling.style.display='none';">
            </div>
          `).join('')}
        </div>
        <script>
          document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
              img.addEventListener('load', () => {
                console.log(\`Image loaded: \${img.alt}\`);
              });
            });
          });
        </script>
      </body>
      </html>
    `
    await reply.type('text/html').send(html)
  })
}

export default imageGalleryRoute
