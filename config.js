/**
 * CAFÉ AROMA - CONFIGURAÇÕES PERSONALIZÁVEIS
 *
 * Este arquivo contém todas as configurações principais que você pode
 * modificar para personalizar sua landing page da cafeteria.
 *
 * INSTRUÇÕES:
 * 1. Edite os valores abaixo conforme sua necessidade
 * 2. Salve o arquivo
 * 3. Recarregue a página para ver as mudanças
 */

// ===== INFORMAÇÕES DA EMPRESA =====
const CAFE_CONFIG = {
  // Informações básicas
  nome: "Café Aroma",
  slogan: "Sabores Únicos",
  descricao:
    "Experimente grãos selecionados, preparados com maestria e servidos com carinho.",

  // Contato
  telefone: "(11) 9999-8888",
  whatsapp: "5511999998888", // Formato: código país + código área + número
  email: "contato@cafearoma.com.br",

  // Endereço
  endereco: {
    rua: "Rua dos Cafés, 123",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
  },

  // Horário de funcionamento
  horarios: {
    segunda_sexta: "7h às 22h",
    sabado: "8h às 23h",
    domingo: "8h às 20h",
  },

  // Redes sociais (deixe em branco se não tiver)
  redes_sociais: {
    instagram: "https://instagram.com/cafearoma",
    facebook: "https://facebook.com/cafearoma",
    whatsapp: "https://wa.me/5511999998888",
  },
};

// ===== CONFIGURAÇÕES VISUAIS =====
const VISUAL_CONFIG = {
  // Cores principais (formato hexadecimal)
  cores: {
    primary: "#4A2C2A", // Cor principal (café médio)
    secondary: "#C8A882", // Cor secundária (cappuccino)
    accent: "#D4AF37", // Cor de destaque (dourado)
    background: "#FDF7F0", // Cor de fundo (leite)
    surface: "#FFFFFF", // Cor das superfícies (branco)
  },

  // Fontes (Google Fonts)
  fontes: {
    display: "Playfair Display", // Títulos
    body: "Inter", // Texto corrido
  },

  // Logo (se quiser usar imagem em vez do ícone)
  logo: {
    usar_imagem: false, // true para usar imagem, false para ícone
    caminho_imagem: "images/logo.png",
    largura: "150px",
    altura: "auto",
  },
};

// ===== CONFIGURAÇÕES DO CARDÁPIO =====
const MENU_CONFIG = {
  // Cafés
  cafes: [
    {
      nome: "Espresso Tradicional",
      descricao: "Café puro e intenso, extraído na pressão perfeita",
      preco: "8,00",
      imagem: "images/espresso.jpg",
    },
    {
      nome: "Cappuccino Cremoso",
      descricao: "Espresso com leite vaporizado e espuma cremosa",
      preco: "12,00",
      imagem: "images/cappuccino.jpg",
    },
    {
      nome: "Café Latte",
      descricao: "Combinação suave de espresso e leite vaporizado",
      preco: "14,00",
      imagem: "images/latte.jpg",
    },
    {
      nome: "Mocha Especial",
      descricao: "Espresso com chocolate belga e chantilly",
      preco: "16,00",
      imagem: "images/mocha.jpg",
    },
  ],

  // Doces
  doces: [
    {
      nome: "Croissant Artesanal",
      descricao: "Massa folhada crocante com recheios variados",
      preco: "9,00",
      imagem: "images/croissant.jpg",
    },
    {
      nome: "Brownie de Chocolate",
      descricao: "Brownie úmido com nozes e calda de chocolate",
      preco: "11,00",
      imagem: "images/brownie.jpg",
    },
    {
      nome: "Cheesecake Fruits",
      descricao: "Cheesecake cremoso com calda de frutas vermelhas",
      preco: "15,00",
      imagem: "images/cheesecake.jpg",
    },
    {
      nome: "Tiramisù Original",
      descricao: "Sobremesa italiana com café e mascarpone",
      preco: "18,00",
      imagem: "images/tiramisu.jpg",
    },
  ],

  // Bebidas
  bebidas: [
    {
      nome: "Café Gelado",
      descricao: "Espresso gelado com leite e cubos de gelo",
      preco: "10,00",
      imagem: "images/iced-coffee.jpg",
    },
    {
      nome: "Smoothie Natural",
      descricao: "Bebida refrescante com frutas da estação",
      preco: "12,00",
      imagem: "images/smoothie.jpg",
    },
    {
      nome: "Chai Latte",
      descricao: "Blend de especiarias com leite vaporizado",
      preco: "13,00",
      imagem: "images/chai.jpg",
    },
    {
      nome: "Chocolate Quente",
      descricao: "Chocolate belga cremoso com marshmallows",
      preco: "11,00",
      imagem: "images/hot-chocolate.jpg",
    },
  ],
};

// ===== PROMOÇÕES ESPECIAIS =====
const PROMOCOES_CONFIG = [
  {
    titulo: "Combo Manhã Perfeita",
    descricao: "Cappuccino + Croissant Artesanal. Válido das 7h às 11h.",
    desconto: "30% OFF",
    preco_original: "21,00",
    preco_promocional: "14,70",
    icone: "fas fa-percentage",
    tipo: "desconto",
  },
  {
    titulo: "Fidelidade Aroma",
    descricao:
      "Compre 9 cafés e ganhe o 10º gratuitamente. Acumule pontos e desfrute!",
    desconto: "DESTAQUE",
    preco_original: "",
    preco_promocional: "Grátis",
    icone: "fas fa-crown",
    tipo: "fidelidade",
  },
  {
    titulo: "Tarde Doce",
    descricao: "Qualquer sobremesa + bebida quente. Válido das 14h às 18h.",
    desconto: "DOCE",
    preco_original: "25,00",
    preco_promocional: "19,90",
    icone: "fas fa-heart",
    tipo: "combo",
  },
];

// ===== CONFIGURAÇÕES DE FORMULÁRIO =====
const FORM_CONFIG = {
  // Método de envio
  metodo: "javascript", // "javascript", "formspree", "php", "netlify"

  // Para Formspree
  formspree_id: "YOUR_FORMSPREE_ID",

  // Para EmailJS
  emailjs: {
    service_id: "YOUR_SERVICE_ID",
    template_id: "YOUR_TEMPLATE_ID",
    user_id: "YOUR_USER_ID",
  },

  // E-mail de destino
  email_destino: "contato@cafearoma.com.br",

  // Campos obrigatórios
  campos_obrigatorios: ["name", "email", "message"],
};

// ===== CONFIGURAÇÕES DE SEO =====
const SEO_CONFIG = {
  titulo_pagina: "Café Aroma - Os Melhores Cafés Artesanais",
  descricao_meta:
    "Desperte seus sentidos com grãos premium e ambiente aconchegante. Cafés, doces e bebidas especiais no coração da cidade.",
  palavras_chave:
    "café, cafeteria, espresso, cappuccino, doces, São Paulo, café artesanal",
  autor: "Café Aroma",

  // Open Graph (redes sociais)
  og: {
    titulo: "Café Aroma - Sabores Únicos",
    descricao:
      "A melhor cafeteria da região com grãos premium e ambiente aconchegante.",
    imagem: "images/hero-coffee.jpg",
    url: "https://cafearoma.com.br",
  },
};

// ===== CONFIGURAÇÕES ANALÍTICAS =====
const ANALYTICS_CONFIG = {
  // Google Analytics
  google_analytics: {
    ativo: false,
    tracking_id: "GA_MEASUREMENT_ID",
  },

  // Facebook Pixel
  facebook_pixel: {
    ativo: false,
    pixel_id: "YOUR_PIXEL_ID",
  },

  // Google Tag Manager
  gtm: {
    ativo: false,
    container_id: "GTM-XXXXXX",
  },
};

// ===== CONFIGURAÇÕES AVANÇADAS =====
const ADVANCED_CONFIG = {
  // PWA
  pwa: {
    ativo: true,
    nome_app: "Café Aroma",
    cor_tema: "#4A2C2A",
  },

  // Service Worker
  service_worker: {
    ativo: true,
    cache_version: "v1",
  },

  // Animações
  animacoes: {
    ativo: true,
    velocidade: "normal", // "slow", "normal", "fast"
  },

  // Lazy Loading
  lazy_loading: {
    ativo: true,
  },
};

// ===== EXPORTAÇÃO (NÃO MEXER) =====
// Esta parte conecta as configurações com o site
if (typeof window !== "undefined") {
  window.CAFE_CONFIG = CAFE_CONFIG;
  window.VISUAL_CONFIG = VISUAL_CONFIG;
  window.MENU_CONFIG = MENU_CONFIG;
  window.PROMOCOES_CONFIG = PROMOCOES_CONFIG;
  window.FORM_CONFIG = FORM_CONFIG;
  window.SEO_CONFIG = SEO_CONFIG;
  window.ANALYTICS_CONFIG = ANALYTICS_CONFIG;
  window.ADVANCED_CONFIG = ADVANCED_CONFIG;
}

/**
 * COMO USAR ESTE ARQUIVO:
 *
 * 1. PERSONALIZAÇÃO BÁSICA:
 *    - Edite CAFE_CONFIG com suas informações
 *    - Ajuste cores em VISUAL_CONFIG se desejar
 *    - Modifique itens do cardápio em MENU_CONFIG
 *
 * 2. FORMULÁRIO:
 *    - Configure FORM_CONFIG para seu método preferido
 *    - Veja DEPLOY.md para instruções detalhadas
 *
 * 3. SEO:
 *    - Personalize SEO_CONFIG com suas informações
 *    - Adicione Google Analytics se desejar
 *
 * 4. SALVANDO MUDANÇAS:
 *    - Após editar, salve o arquivo
 *    - Inclua este arquivo no HTML: <script src="config.js"></script>
 *    - Atualize a página para ver as mudanças
 *
 * DICA: Mantenha backup das configurações originais!
 */
