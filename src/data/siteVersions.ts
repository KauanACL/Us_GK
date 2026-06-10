export type TimelinePhoto = {
  src: string;
  title: string;
  caption: string;
};

export type VersionMode = "birthday" | "classic";

export type SiteVersionConfig = {
  date: string;
  label: string;
  mode: VersionMode;
  assetDir: string;
  startDate: string;
  title: string;
  subtitle: string;
  playLabel: string;
  dedicationTitle: string;
  paragraphs: string[];
  counterTitle: string;
  footerText: string;
  heroPhotoNumber?: number;
  timelineCaptions?: Record<number, Omit<TimelinePhoto, "src">>;
};

export type SiteVersion = SiteVersionConfig & {
  route: string;
  musicSrc: string;
  heroImage: string;
  images: string[];
  timeline?: TimelinePhoto[];
};

export type SiteVersionSummary = {
  date: string;
  label: string;
  route: string;
};

const birthdayTimelineCaptions: Record<number, Omit<TimelinePhoto, "src">> = {
  1: {
    title: "Primeira impressão",
    caption:
      "Chamou minha atenção logo de cara, linda demais, mas a gente nem esperava o que estava por vir.",
  },
  2: {
    title: "O segundo pedido",
    caption:
      "Mesmo o pedido já tendo acontecido antes, eu ainda fiquei nervoso aqui.",
  },
  3: {
    title: "Minha calmaria",
    caption:
      "Você tem o dom de me acalmar e deixar todos os momentos perfeitos.",
  },
  4: {
    title: "Futura mãe de gêmeos",
    caption:
      "Sempre imagino como vai ser nossa família. Por enquanto, a previsão é de gêmeos lindos kkkkk.",
  },
  5: {
    title: "Sempre comigo",
    caption:
      "Obrigado por estar sempre comigo. Quero que conte comigo para tudo.",
  },
  6: {
    title: "Só gostei da foto mesmo",
    caption: "A criatividade sumiu.",
  },
};

export const siteVersionConfigs: SiteVersionConfig[] = [
  {
    date: "2026-06-11",
    label: "Aniversário 11/06",
    mode: "birthday",
    assetDir: "2026-06-11",
    startDate: "2024-12-17T00:00:00",
    title: "Feliz aniversário, Amor",
    subtitle:
      "Uma nova versão do nosso canto para comemorar essa data tão especial do jeito que você merece.",
    playLabel: "Começar surpresa de aniversário",
    dedicationTitle: "Dedicatória",
    paragraphs: [
      "Fiz essa lembrança para você, a pessoa que alegra os meus dias e que, por onde passa, deixa sua marca.",
      "Para você, que me mostra como é amar, viver uma parceria, cultivar uma amizade, confiar, se dedicar e se preocupar.",
      "Você, Gillian, é tudo para mim. Amo seus olhos, seus sorrisos e suas risadas; amo sua voz, que tem efeitos em mim que você nem imagina. Eu te amo, e nunca se esqueça disso nem pense o contrário. Obrigado por tudo.",
    ],
    counterTitle: "Te amo há",
    footerText:
      "Ah, e sabe um dos livros que você queria? Ele está na sua mesa, um pequeno presente para você.",
    heroPhotoNumber: 1,
    timelineCaptions: birthdayTimelineCaptions,
  },
  {
    date: "2024-12-17",
    label: "Primeira versão",
    mode: "classic",
    assetDir: "2024-12-17",
    startDate: "2024-12-17T00:00:00",
    title: "Gillian, eu te amo demais!",
    subtitle: "A primeira versão desse presente digital.",
    playLabel: "Tocar música e começar surpresa",
    dedicationTitle: "Uma pequena dedicatória",
    paragraphs: [
      "Cada dia ao seu lado é um presente que eu guardo no coração. Sua presença ilumina meus dias e faz tudo ter mais sentido.",
      "Você é minha inspiração, minha força e minha alegria. Juntos construímos memórias que ficarão para sempre em nossos corações.",
      "Obrigado por ser exatamente quem você é e por me fazer tão feliz. Te amo mais a cada dia que passa.",
    ],
    counterTitle: "Te amo há",
    footerText: "E sempre vou te amar, hoje, amanhã e para sempre!",
    heroPhotoNumber: 1,
  },
];

export const sortedSiteVersionConfigs = [...siteVersionConfigs].sort((a, b) =>
  b.date.localeCompare(a.date),
);
