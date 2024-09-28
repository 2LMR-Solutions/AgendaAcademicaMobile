const CACHE_NAME = 'agenda-academica-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/public/style.css',

  '/src/public/views/tela agenda/Agenda.html',
  '/src/public/views/tela agenda/Agenda.css',

  '/src/public/views/tela incluir tarefa/IncluirTarefa.html',
  '/src/public/views/tela incluir tarefa/IncluirTarefa.css',

  '/src/public/views/tela inicial/telaInicial.html',
  '/src/public/views/tela inicial/telaInicial.css',

  '/src/public/views/tela perfil/perfil.html',
  '/src/public/views/tela perfil/Perfil.css',

  '/src/public/app.js',
  '/manifest.json',

  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',


  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
  'https://fonts.gstatic.com',
  'https://fonts.googleapis.com', 
  'https://esm.run/@material/web/all.js',
  'https://esm.run/@material/web/typography/md-typescale-styles.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap',
  'https://fonts.googleapis.com/css2?family=Material+Icons',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',


  '/src/public/assets/logoIconBranco.ico',
  '/src/public/assets/logoIconRoxo.ico',
  '/src/public/assets/logoTransparenteBranco.png',
  '/src/public/assets/logoTransparenteBrancoFigma.png',
  '/src/public/assets/logoTransparenteRoxo.png',
  '/src/public/assets/logoTransparenteRoxoFigma.png',

  '/icons/windows11/SplashScreen.scale-100.png',
  '/icons/windows11/SplashScreen.scale-100.png',
  '/icons/windows11/SplashScreen.scale-100.png',
  '/icons/windows11/SplashScreen.scale-100.png',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});