import {
  useEffect,
  useRef,
  useState
} from "react";

import "./App.css";

import {
  textos,
  type Idioma
} from "./i18n";


const idiomas: {
  codigo: Idioma;
  nome: string;
  bandeira: string;
}[] = [

  {
    codigo: "pt",
    nome: "Português",
    bandeira: "/flags/br.svg"
  },

  {
    codigo: "en",
    nome: "English",
    bandeira: "/flags/us.svg"
  },

  {
    codigo: "es",
    nome: "Español",
    bandeira: "/flags/es.svg"
  },

  {
    codigo: "fr",
    nome: "Français",
    bandeira: "/flags/fr.svg"
  },

  {
    codigo: "de",
    nome: "Deutsch",
    bandeira: "/flags/de.svg"
  },

  {
    codigo: "it",
    nome: "Italiano",
    bandeira: "/flags/it.svg"
  }

];


function App() {

  const [idioma, setIdioma] =
    useState<Idioma>("pt");

  const [dropdownAberto, setDropdownAberto] =
    useState(false);

  const seletorRef =
    useRef<HTMLDivElement>(null);


  // Recupera o idioma salvo

  useEffect(() => {

    chrome.storage.local
      .get("targetLanguage")
      .then((resultado) => {

        const idiomaSalvo =
          resultado["targetLanguage"];

        if (
          typeof idiomaSalvo === "string" &&
          idiomas.some(
            (item) => item.codigo === idiomaSalvo
          )
        ) {

          setIdioma(
            idiomaSalvo as Idioma
          );

        }

      });

  }, []);


  // Fecha o dropdown ao clicar fora

  useEffect(() => {

    const fecharAoClicarFora =
      (event: MouseEvent) => {

        if (
          seletorRef.current &&
          !seletorRef.current.contains(
            event.target as Node
          )
        ) {

          setDropdownAberto(false);

        }

      };


    document.addEventListener(
      "mousedown",
      fecharAoClicarFora
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        fecharAoClicarFora
      );

    };

  }, []);


  // Altera o idioma

  const alterarIdioma =
    async (novoIdioma: Idioma) => {

      setIdioma(novoIdioma);

      await chrome.storage.local.set({
        targetLanguage: novoIdioma
      });

      setDropdownAberto(false);

    };


  const idiomaAtual =
    idiomas.find(
      (item) => item.codigo === idioma
    );


  const interfaceAtual =
    textos[idioma];


  return (

    <div className="popup-extensao">

      <h2>
        {interfaceAtual.titulo}
      </h2>


      <label>
        {interfaceAtual.traduzirPara}
      </label>


      <div
        className="seletor-idioma"
        ref={seletorRef}
      >

        {/* Botão principal */}

        <button
          className="botao-idioma"
          onClick={() =>
            setDropdownAberto(
              !dropdownAberto
            )
          }
        >

          <img
            className="bandeira"
            src={idiomaAtual?.bandeira}
            alt=""
          />


          <span className="nome-idioma">
            {idiomaAtual?.nome}
          </span>


          <span className="seta">
            {dropdownAberto
              ? "▲"
              : "▼"}
          </span>

        </button>


        {/* Opções */}

        {dropdownAberto && (

          <div className="opcoes-idioma">

            {idiomas.map((item) => (

              <button
                key={item.codigo}
                className={
                  `opcao-idioma ${
                    item.codigo === idioma
                      ? "idioma-selecionado"
                      : ""
                  }`
                }
                onClick={() =>
                  alterarIdioma(
                    item.codigo
                  )
                }
              >

                <img
                  className="bandeira"
                  src={item.bandeira}
                  alt=""
                />


                <span className="nome-idioma">
                  {item.nome}
                </span>

              </button>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}


export default App;