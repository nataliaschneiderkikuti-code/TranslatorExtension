import {
  lookupText,
  type LookupResult
} from "./translation";

import {
  textos,
  type Idioma
} from "./i18n";


let mouseX = 0;
let mouseY = 0;


// ---------- Posição do mouse ----------

document.addEventListener(
  "mousemove",
  (event) => {

    mouseX =
      event.clientX;

    mouseY =
      event.clientY;

  }
);


// ---------- Mensagem do background ----------

chrome.runtime.onMessage.addListener(
  (message) => {

    if (
      message.type !==
      "mostrar-popup"
    ) {
      return;
    }


    const idioma: Idioma =
      message.targetLanguage ?? "pt";


    const interfaceAtual =
      textos[idioma];


    // Remove popup anterior

    const popupExistente =
      document.getElementById(
        "meu-popup"
      );


    if (popupExistente) {
      popupExistente.remove();
    }


    // ---------- Popup ----------

    const popup =
      document.createElement("div");


    popup.id =
      "meu-popup";


    popup.style.position =
      "fixed";


    popup.style.left =
      `${mouseX + 10}px`;


    popup.style.top =
      `${mouseY + 10}px`;


    popup.style.width =
      "300px";


    popup.style.backgroundColor =
      "white";


    popup.style.color =
      "black";


    popup.style.border =
      "1px solid #ccc";


    popup.style.borderRadius =
      "10px";


    popup.style.boxShadow =
      "0 4px 15px rgba(0, 0, 0, 0.2)";


    popup.style.zIndex =
      "999999";


    popup.style.fontFamily =
      "Arial, sans-serif";


    // ---------- Cabeçalho ----------

    const header =
      document.createElement("div");


    header.textContent =
      message.texto;


    header.style.padding =
      "12px";


    header.style.fontWeight =
      "bold";


    header.style.cursor =
      "move";


    header.style.borderBottom =
      "1px solid #ddd";


    header.style.userSelect =
      "none";


    popup.appendChild(
      header
    );


    // ---------- Conteúdo ----------

    const conteudo =
      document.createElement("div");


    conteudo.style.padding =
      "12px";


    conteudo.innerHTML =
      `<p>${interfaceAtual.traduzindo}</p>`;


    popup.appendChild(
      conteudo
    );


    document.body.appendChild(
      popup
    );


    // ---------- Tradução ----------

    lookupText(
      message.texto,
      message.targetLanguage
    )

      .then(
        (resultado: LookupResult) => {

          if (
            !document.body.contains(
              popup
            )
          ) {
            return;
          }


          conteudo.innerHTML =
            renderizarConteudo(
              resultado,
              idioma
            );

        }
      )

      .catch(
        (erro) => {

          if (
            !document.body.contains(
              popup
            )
          ) {
            return;
          }


          console.error(
            "Erro ao traduzir:",
            erro
          );


          conteudo.innerHTML =
            `<p>${interfaceAtual.erroTraducao}</p>`;

        }
      );


    // ---------- Fechar ao clicar fora ----------

    const fecharAoClicarFora =
      (event: MouseEvent) => {

        const alvo =
          event.target as Node;


        if (
          !popup.contains(
            alvo
          )
        ) {

          popup.remove();


          document.removeEventListener(
            "mousedown",
            fecharAoClicarFora
          );

        }

      };


    setTimeout(
      () => {

        document.addEventListener(
          "mousedown",
          fecharAoClicarFora
        );

      },
      0
    );


    // ---------- Arrastar ----------

    let arrastando =
      false;


    let deslocamentoX =
      0;


    let deslocamentoY =
      0;


    header.addEventListener(
      "mousedown",
      (event) => {

        arrastando =
          true;


        const rect =
          popup.getBoundingClientRect();


        deslocamentoX =
          event.clientX -
          rect.left;


        deslocamentoY =
          event.clientY -
          rect.top;


        event.preventDefault();

      }
    );


    document.addEventListener(
      "mousemove",
      (event) => {

        if (!arrastando) {
          return;
        }


        popup.style.left =
          `${event.clientX - deslocamentoX}px`;


        popup.style.top =
          `${event.clientY - deslocamentoY}px`;

      }
    );


    document.addEventListener(
      "mouseup",
      () => {

        arrastando =
          false;

      }
    );

  }
);


// ---------- Segurança ----------

function escapeHtml(
  texto: string
): string {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    texto;


  return div.innerHTML;

}


// ---------- Conteúdo do popup ----------

function renderizarConteudo(
  resultado: LookupResult,
  idioma: Idioma
): string {

  const interfaceAtual =
    textos[idioma];


  const partes: string[] =
    [];


  partes.push(
    `<p><strong>${interfaceAtual.traducao}</strong></p>`
  );


  if (
    resultado.translatedText
  ) {

    partes.push(
      `<p>${escapeHtml(
        resultado.translatedText
      )}</p>`
    );

  } else {

    partes.push(
      `<p><em>${interfaceAtual.traducaoNaoDisponivel}</em></p>`
    );

  }


  return partes.join("");

}