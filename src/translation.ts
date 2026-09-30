// translation.ts

export interface LookupResult {
  originalText: string;
  detectedLanguage: string;
  translatedText: string | null;
  error: string | null;
}


// ---------- Language Detector ----------

async function detectLanguage(text: string): Promise<string> {

  if (!("LanguageDetector" in self)) {
    console.warn(
      "LanguageDetector API não disponível neste navegador."
    );

    return "unknown";
  }

  try {

    const detector =
      await (self as any).LanguageDetector.create();

    const results =
      await detector.detect(text);

    return results[0]?.detectedLanguage ?? "unknown";

  } catch (error) {

    console.error(
      "Erro ao detectar idioma:",
      error
    );

    return "unknown";
  }
}


// ---------- Translator ----------

async function translateGeneric(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string | null> {

  if (!("Translator" in self)) {

    console.warn(
      "Translator API não disponível neste navegador."
    );

    return null;
  }

  // Não precisa traduzir se os idiomas forem iguais
  if (sourceLang === targetLang) {
    return text;
  }

  try {

    const availability =
      await (self as any).Translator.availability({
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
      });

    if (availability === "unavailable") {

      console.warn(
        `Tradução de ${sourceLang} para ${targetLang} não é suportada.`
      );

      return null;
    }

    const translator =
      await (self as any).Translator.create({

        sourceLanguage: sourceLang,
        targetLanguage: targetLang,

        monitor(m: EventTarget) {

          m.addEventListener(
            "downloadprogress",
            (e: any) => {

              console.log(
                `Baixando modelo de tradução (${sourceLang}→${targetLang}): ${Math.round(e.loaded * 100)}%`
              );

            }
          );

        },

      });

    return await translator.translate(text);

  } catch (error) {

    console.error(
      "Erro ao traduzir:",
      error
    );

    return null;
  }
}


// ---------- Tradução principal ----------

export async function lookupText(
  rawText: string,
  targetLanguage: string
): Promise<LookupResult> {

  const text = rawText.trim();

  if (!text) {

    return {
      originalText: rawText,
      detectedLanguage: "unknown",
      translatedText: null,
      error: "Texto vazio."
    };

  }

  const detectedLanguage =
    await detectLanguage(text);


  // Se o texto já estiver no idioma escolhido
  if (detectedLanguage === targetLanguage) {

    return {
      originalText: text,
      detectedLanguage,
      translatedText: text,
      error: null
    };

  }


  const translatedText =
    await translateGeneric(
      text,
      detectedLanguage,
      targetLanguage
    );


  return {

    originalText: text,

    detectedLanguage,

    translatedText,

    error: translatedText === null
      ? "Não foi possível traduzir o texto."
      : null

  };

}