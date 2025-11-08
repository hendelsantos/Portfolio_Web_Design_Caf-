// Service Worker para Café Aroma
// Implementação básica de PWA com cache estratégico

const CACHE_NAME = "cafe-aroma-v1";
const STATIC_CACHE = "cafe-aroma-static-v1";
const DYNAMIC_CACHE = "cafe-aroma-dynamic-v1";

// Assets para cache estático
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/script.js",
  "/manifest.json",
  // Adicionar imagens principais aqui
  "/images/hero-coffee.jpg",
  "/images/about-coffee.jpg",
  // Fontes do Google Fonts (se disponíveis offline)
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap",
];

// Instalação do Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker instalando...");

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("Cache estático criado");
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error("Erro ao criar cache estático:", error);
      })
  );

  // Força a ativação imediata
  self.skipWaiting();
});

// Ativação do Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker ativando...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Remove caches antigos
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log("Removendo cache antigo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Assume controle de todas as abas
  self.clients.claim();
});

// Interceptação de requests
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Estratégia para diferentes tipos de recursos
  if (request.destination === "document") {
    // HTML - Network First com fallback para cache
    event.respondWith(networkFirstStrategy(request));
  } else if (request.destination === "image") {
    // Imagens - Cache First
    event.respondWith(cacheFirstStrategy(request));
  } else if (
    request.destination === "script" ||
    request.destination === "style"
  ) {
    // CSS/JS - Stale While Revalidate
    event.respondWith(staleWhileRevalidateStrategy(request));
  } else {
    // Outros recursos - Network First
    event.respondWith(networkFirstStrategy(request));
  }
});

// Estratégia Network First
async function networkFirstStrategy(request) {
  try {
    // Tenta buscar da rede primeiro
    const networkResponse = await fetch(request);

    // Se bem-sucedida, atualiza o cache
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());

    return networkResponse;
  } catch (error) {
    // Se falhar, busca do cache
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback para página offline (opcional)
    if (request.destination === "document") {
      return caches.match("/index.html");
    }

    throw error;
  }
}

// Estratégia Cache First
async function cacheFirstStrategy(request) {
  // Busca do cache primeiro
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    // Se não estiver em cache, busca da rede
    const networkResponse = await fetch(request);

    // Adiciona ao cache
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());

    return networkResponse;
  } catch (error) {
    console.error("Erro ao buscar recurso:", error);
    throw error;
  }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  // Busca da rede em paralelo
  const networkRequest = fetch(request)
    .then((networkResponse) => {
      // Atualiza o cache com a nova versão
      cache.put(request, networkResponse.clone());
      return networkResponse;
    })
    .catch((error) => {
      console.error("Erro na rede:", error);
    });

  // Retorna cache imediatamente se disponível, senão espera pela rede
  return cachedResponse || networkRequest;
}

// Limpeza periódica do cache
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CLEAR_CACHE") {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.startsWith("cafe-aroma-dynamic")) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  }
});

// Notificação de atualização disponível
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Background Sync (futuro)
self.addEventListener("sync", (event) => {
  console.log("Background sync:", event.tag);

  if (event.tag === "contact-form") {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  // Implementar sincronização do formulário quando voltar online
  console.log("Sincronizando formulário de contato...");
}
