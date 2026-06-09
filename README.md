# US_GK

> Site romântico personalizado — um presente digital feito com código e muito amor.

🔗 **[us-gk.vercel.app](https://us-gk.vercel.app)**

---

## 📌 Sobre o Projeto

O **US_GK** é uma página web criada como presente para a namorada. O site funciona por versões datadas: a página inicial exibe a versão mais recente e versões antigas continuam acessíveis por rotas como `/2024-12-17`.

Cada detalhe foi pensado para ser único, com música, fotos, dedicatória e contador em tempo real mostrando há quantos segundos o casal está junto.

---

## ⚙️ Tecnologias

- **Next.js** + **TypeScript**
- **Tailwind CSS**
- **CSS Animations** — transições e efeitos visuais
- **Vercel** — deploy

---

## ✨ Funcionalidades

- **Versões comemorativas** — `/` para a versão mais recente e `/<data>` para versões antigas
- **Sidebar de versões** — painel retrátil com todas as versões disponíveis
- **Tela de abertura com música** — botão de play para iniciar a surpresa
- **Galeria de fotos em carrossel** — fotos do casal navegáveis com indicador de posição
- **Dedicatória personalizada** — textos editáveis por versão
- **Contador em tempo real** — exibe quantos segundos o casal está junto, atualizado ao vivo segundo a segundo
- **Identidade visual imersiva** — tema dark com degradê roxo/rosa e tipografia impactante

---

## 🎨 Design

| Elemento | Escolha |
|---|---|
| Fundo | Preto (`#000`) |
| Cor de destaque | Rosa pink (`#FF0090`) |
| Contador | Gradiente roxo → rosa |
| Tipografia | Bold, clean e moderna |

---

## 🚀 Como Rodar

```bash
git clone https://github.com/KauanACL/us-gk.git
cd us-gk
npm install
npm run dev
```

Acesse: `http://localhost:3000`

> Para personalizar: edite as versões em `src/data/siteVersions.ts`, coloque as fotos em `public/versions/<data>/` usando `foto1`, `foto2`, `foto3` etc., e salve a música da versão como `music.mp3` na mesma pasta.

---

## 🌐 Deploy

Hospedado na **Vercel** com deploy automático a cada push na branch `main`.

---

## 👤 Autor

Desenvolvido por **Kauan** com 💕 — [LinkedIn](https://linkedin.com/in/kauan-acl) · [GitHub](https://github.com/KauanACL)
