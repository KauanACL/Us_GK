export type TimelinePhoto = {
  src: string;
  title: string;
  caption: string;
};

export type SiteVersion = {
  id: "birthday-2026" | "first-version";
  label: string;
  route: string;
  musicSrc: string;
  heroImage: string;
  images: string[];
  timeline?: TimelinePhoto[];
  startDate: string;
  title: string;
  subtitle: string;
  playLabel: string;
  dedicationTitle: string;
  paragraphs: string[];
  counterTitle: string;
  footerText: string;
};

const sharedImages = [
  "/IMG7.JPG",
  "/IMG8.JPEG",
  "/IMG10.JPG",
  "/IMG11.JPG",
  "/IMG12.jpg",
  "/IMG13.JPG",
  "/IMG14.JPG",
  "/IMG15.JPG",
  "/IMG16.JPG",
  "/IMG18.JPG",
  "/IMG19.jpg",
  "/IMG20.jpg",
  "/IMG21.JPG",
  "/IMG22.JPG",
];

const birthdayTimeline: TimelinePhoto[] = [
  {
    src: "/IMG7.JPG",
    title: "O comeco do nosso album",
    caption:
      "A primeira parte dessa nova versao pode guardar aquela foto que abre a historia do aniversario.",
  },
  {
    src: "/IMG8.JPEG",
    title: "Seu sorriso em destaque",
    caption:
      "Troque esta frase por uma lembranca curta sobre o que voce sentiu nesse momento.",
  },
  {
    src: "/IMG10.JPG",
    title: "Um dia para lembrar",
    caption:
      "Aqui entra uma legenda simples, como se fosse uma pagina do diario de voces.",
  },
  {
    src: "/IMG11.JPG",
    title: "Nosso jeito",
    caption:
      "Use este espaco para uma frase leve, romantica ou ate uma brincadeira de voces.",
  },
  {
    src: "/IMG12.jpg",
    title: "Detalhes que ficam",
    caption:
      "A linha do tempo foi feita para cada foto ter seu proprio significado.",
  },
  {
    src: "/IMG13.JPG",
    title: "Mais uma memoria",
    caption:
      "Quando adicionar fotos novas, e so trocar o caminho da imagem e editar esta legenda.",
  },
  {
    src: "/IMG14.JPG",
    title: "Um capitulo nosso",
    caption:
      "Este bloco pode virar uma declaracao curta sobre um lugar, uma data ou uma sensacao.",
  },
  {
    src: "/IMG15.JPG",
    title: "O presente e voce",
    caption:
      "No aniversario dela, cada foto pode lembrar uma qualidade que voce ama nela.",
  },
  {
    src: "/IMG16.JPG",
    title: "Quando tudo fica melhor",
    caption:
      "A legenda pode ser direta: o que essa foto significa para voce.",
  },
  {
    src: "/IMG18.JPG",
    title: "Guardado com carinho",
    caption:
      "Mais um ponto da linha do tempo para preencher com uma memoria real.",
  },
  {
    src: "/IMG19.jpg",
    title: "Mais perto do dia 11",
    caption:
      "Este item ja usa a copia JPG para abrir bem em mais navegadores.",
  },
  {
    src: "/IMG20.jpg",
    title: "Uma versao nova",
    caption:
      "A ideia e que futuras datas possam ganhar novos capitulos como este.",
  },
  {
    src: "/IMG21.JPG",
    title: "Tudo que a gente construiu",
    caption:
      "Use esta parte para uma frase maior se quiser marcar uma lembranca importante.",
  },
  {
    src: "/IMG22.JPG",
    title: "Feliz aniversario, meu amor",
    caption:
      "A ultima foto fecha a galeria e leva para a dedicatória final da surpresa.",
  },
];

export const siteVersions: Record<SiteVersion["id"], SiteVersion> = {
  "birthday-2026": {
    id: "birthday-2026",
    label: "Aniversario 11/06",
    route: "/",
    musicSrc: "/music.mp3",
    heroImage: "/IMG22.JPG",
    images: sharedImages,
    timeline: birthdayTimeline,
    startDate: "2024-12-17T00:00:00",
    title: "Feliz aniversario, Gillian",
    subtitle:
      "Uma nova versao do nosso cantinho, preparada para guardar o dia 11/06 do jeito que ele merece.",
    playLabel: "Comecar surpresa de aniversario",
    dedicationTitle: "Para o seu dia",
    paragraphs: [
      "Hoje a surpresa e para celebrar voce: sua forma de sorrir, de cuidar, de iluminar os lugares e de deixar tudo mais bonito so por estar por perto.",
      "Este espaco vai ganhar novas fotos, uma nova musica e pequenas lembrancas desse aniversario. A estrutura ja esta pronta para voce trocar cada detalhe quando quiser.",
      "Que este dia seja leve, feliz e cheio de amor. Eu amo caminhar ao seu lado e poder comemorar mais um capitulo da sua vida.",
    ],
    counterTitle: "Te amo ha",
    footerText:
      "E que venham muitas outras datas para transformar em novas versoes da nossa historia.",
  },
  "first-version": {
    id: "first-version",
    label: "Primeira versao",
    route: "/primeira-versao",
    musicSrc: "/music.mp3",
    heroImage: "/IMG7.JPG",
    images: sharedImages,
    startDate: "2024-12-17T00:00:00",
    title: "Gillian te amo demais!",
    subtitle: "A primeira versao desse presente digital.",
    playLabel: "Tocar musica e comecar surpresa",
    dedicationTitle: "Uma pequena dedicatoria",
    paragraphs: [
      "Cada dia ao seu lado e um presente que eu guardo no coracao. Sua presenca ilumina meus dias e faz tudo ter mais sentido.",
      "Voce e minha inspiracao, minha forca e minha alegria. Juntos construimos memorias que ficarao para sempre em nossos coracoes.",
      "Obrigado por ser exatamente quem voce e e por me fazer tao feliz. Te amo mais a cada dia que passa.",
    ],
    counterTitle: "Te amo ha",
    footerText: "E sempre vou te amar, hoje, amanha e para sempre!",
  },
};
