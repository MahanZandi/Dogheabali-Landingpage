import { defineConfig } from 'vite';
import { readFileSync, existsSync, statSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, '404.html'),
      },
    },
  },
  plugins: [
    {
      name: 'vite-plugin-404',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url, `http://${req.headers.host}`);

          if (url.pathname.startsWith('/@') || url.pathname.startsWith('/__')) {
            return next();
          }

          let filePath = resolve(__dirname, `.${url.pathname}`);

          // If directory, look for index.html inside it
          try {
            if (statSync(filePath).isDirectory()) {
              filePath = resolve(filePath, 'index.html');
            }
          } catch {}

          if (existsSync(filePath)) {
            return next();
          }

          // Not found → 404
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(readFileSync(resolve(__dirname, '404.html'), 'utf-8'));
        });
      },
    },
  ],
});
