# 🚀 Guia de Deploy - Café Aroma Landing Page

## 📋 Pré-requisitos

Antes de fazer o deploy, certifique-se de:

- [ ] **Imagens adicionadas** na pasta `images/`
- [ ] **Informações personalizadas** (nome, endereço, contatos)
- [ ] **Cores e estilo** ajustados conforme necessário
- [ ] **Formulário configurado** (se usando backend)
- [ ] **Testes realizados** em diferentes dispositivos
- [ ] **Conteúdo revisado** (textos, preços, etc.)

## 🌐 Opções de Hospedagem

### 1. Netlify (Recomendado - Grátis)

**Vantagens:**

- Deploy automático via Git
- HTTPS gratuito
- CDN global
- Forms handling
- Domínio customizado

**Passos:**

1. Criar conta no [Netlify](https://netlify.com)
2. Conectar repositório GitHub/GitLab
3. Configurar build settings:
   - Build command: (deixe vazio)
   - Publish directory: `/`
4. Deploy automático

**Configuração do Forms (Netlify):**

```html
<form
  name="contact"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
>
  <input type="hidden" name="bot-field" />
  <input type="hidden" name="form-name" value="contact" />
  <!-- Seus campos aqui -->
</form>
```

### 2. Vercel (Grátis)

**Vantagens:**

- Deploy ultra-rápido
- Edge Network global
- Analytics incluído
- Domínio customizado

**Passos:**

1. Criar conta no [Vercel](https://vercel.com)
2. Conectar repositório
3. Deploy automático
4. Configurar domínio (opcional)

### 3. GitHub Pages (Grátis)

**Passos:**

1. Subir código para repositório GitHub
2. Ir em Settings > Pages
3. Selecionar source branch (main)
4. Acessar via username.github.io/repositorio

### 4. Hospedagem Tradicional (cPanel)

**Recomendado para clientes que já têm hospedagem:**

1. **Via FTP:**

   - Usar FileZilla ou WinSCP
   - Fazer upload para pasta public_html
   - Configurar .htaccess

2. **Via cPanel File Manager:**
   - Acessar File Manager
   - Upload do arquivo ZIP
   - Extrair na pasta pública

## 📁 Estrutura para Upload

### Arquivo ZIP para Cliente

```
cafe-aroma-site.zip
├── index.html
├── css/
│   ├── style.css
│   └── critical.css
├── js/
│   └── script.js
├── images/
│   └── (todas as imagens)
├── .htaccess
├── manifest.json
├── sw.js
└── INSTRUCOES.txt
```

## 🔧 Configurações de Servidor

### Apache (.htaccess já incluído)

- Compressão GZIP
- Cache headers
- Segurança básica
- Redirects HTTPS (opcional)

### Nginx (configuração manual)

```nginx
server {
    listen 80;
    server_name cafearoma.com.br;
    root /var/www/cafe-aroma;
    index index.html;

    # Compressão
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    # Cache estático
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

## 📧 Configuração de Formulário

### Opção 1: Formspree (Mais Simples)

```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
  <!-- Seus campos -->
</form>
```

### Opção 2: EmailJS (Client-side)

```javascript
// Adicione no script.js
emailjs.send("service_id", "template_id", formData).then(() => {
  showNotification("Mensagem enviada!", "success");
});
```

### Opção 3: Backend PHP (servidor próprio)

```php
<?php
// contact.php
if ($_POST) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = 'contato@cafearoma.com.br';
    $subject = 'Contato do Site';
    $body = "Nome: $name\nE-mail: $email\nMensagem: $message";

    mail($to, $subject, $body);

    echo json_encode(['success' => true]);
}
?>
```

## 🎨 Otimizações de Imagens

### Antes do Deploy:

1. **Redimensionar imagens:**

   - Hero: 800x800px
   - Menu items: 400x300px
   - About: 600x400px

2. **Comprimir imagens:**

   - Use TinyPNG ou Squoosh
   - Qualidade 80-85%
   - Formato WebP quando possível

3. **Gerar favicons:**
   - Use RealFaviconGenerator.net
   - Tamanhos: 16x16, 32x32, 180x180, 192x192, 512x512

## 📊 Google Analytics

### Configuração:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

## 🔍 Google Search Console

1. Verificar propriedade
2. Enviar sitemap.xml
3. Monitorar indexação
4. Verificar Core Web Vitals

### Sitemap.xml (criar se necessário):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cafearoma.com.br/</loc>
    <lastmod>2024-11-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 🧪 Testes Pós-Deploy

### Checklist de Testes:

- [ ] **Design responsivo** em diferentes telas
- [ ] **Velocidade de carregamento** (PageSpeed Insights)
- [ ] **Links funcionando** (navegação)
- [ ] **Formulário de contato** (envio e recebimento)
- [ ] **Imagens carregando** corretamente
- [ ] **Menu mobile** funcionando
- [ ] **SEO básico** (título, description)
- [ ] **Analytics funcionando** (se configurado)

### Ferramentas de Teste:

- Google PageSpeed Insights
- GTmetrix
- Lighthouse (Chrome DevTools)
- Mobile-Friendly Test (Google)
- Browser testing (diferentes navegadores)

## 📱 PWA (Opcional)

Para tornar o site uma Progressive Web App:

1. **Service Worker já incluído** (sw.js)
2. **Manifest.json configurado**
3. **Adicionar no HTML:**

```html
<link rel="manifest" href="/manifest.json" />
<script>
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
</script>
```

## 🚨 Troubleshooting

### Problemas Comuns:

**Imagens não carregam:**

- Verificar nomes dos arquivos
- Verificar permissões (755 para pastas)
- Verificar caminhos relativos

**CSS não aplicado:**

- Verificar cache do navegador (Ctrl+F5)
- Verificar sintaxe CSS
- Verificar caminho do arquivo

**JavaScript não funciona:**

- Verificar console do navegador (F12)
- Verificar sintaxe
- Verificar compatibilidade

**Formulário não envia:**

- Verificar action do form
- Verificar configuração do servidor
- Verificar logs de erro

## 📞 Suporte

Para suporte adicional ou customizações:

- Documentação completa no README.md
- Código comentado para facilitar modificações
- Estrutura modular para fácil manutenção

---

**Deploy realizado com sucesso? 🎉**
Teste tudo e entre em contato se precisar de ajuda!
