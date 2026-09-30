export type Idioma =
  | "pt"
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it";


export interface TextosInterface {
  titulo: string;
  traduzirPara: string;
  traducao: string;
  traduzindo: string;
  traducaoNaoDisponivel: string;
  erroTraducao: string;
}


export const textos: Record<Idioma, TextosInterface> = {

  pt: {
    titulo: "Tradutor",
    traduzirPara: "Traduzir para:",
    traducao: "Tradução",
    traduzindo: "Traduzindo...",
    traducaoNaoDisponivel: "Tradução não disponível.",
    erroTraducao: "Ocorreu um erro ao traduzir."
  },

  en: {
    titulo: "Translator",
    traduzirPara: "Translate to:",
    traducao: "Translation",
    traduzindo: "Translating...",
    traducaoNaoDisponivel: "Translation unavailable.",
    erroTraducao: "An error occurred while translating."
  },

  es: {
    titulo: "Traductor",
    traduzirPara: "Traducir a:",
    traducao: "Traducción",
    traduzindo: "Traduciendo...",
    traducaoNaoDisponivel: "Traducción no disponible.",
    erroTraducao: "Ocurrió un error al traducir."
  },

  fr: {
    titulo: "Traducteur",
    traduzirPara: "Traduire vers :",
    traducao: "Traduction",
    traduzindo: "Traduction en cours...",
    traducaoNaoDisponivel: "Traduction non disponible.",
    erroTraducao: "Une erreur s'est produite lors de la traduction."
  },

  de: {
    titulo: "Übersetzer",
    traduzirPara: "Übersetzen nach:",
    traducao: "Übersetzung",
    traduzindo: "Übersetzung läuft...",
    traducaoNaoDisponivel: "Übersetzung nicht verfügbar.",
    erroTraducao: "Beim Übersetzen ist ein Fehler aufgetreten."
  },

  it: {
    titulo: "Traduttore",
    traduzirPara: "Traduci in:",
    traducao: "Traduzione",
    traduzindo: "Traduzione in corso...",
    traducaoNaoDisponivel: "Traduzione non disponibile.",
    erroTraducao: "Si è verificato un errore durante la traduzione."
  }

};