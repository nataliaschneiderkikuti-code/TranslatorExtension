# Extensão de Tradução

Extensão para navegador desenvolvida com React, TypeScript e Vite.

A extensão permite selecionar um texto em uma página da web e utilizar o menu de contexto do navegador para abrir um popup com a tradução do texto.

## Funcionalidades

- Seleção de texto em páginas da web
- Tradução de textos utilizando as APIs de tradução do Chrome
- Escolha do idioma de destino
- Interface disponível em diferentes idiomas
- Popup exibido próximo ao texto selecionado
- Popup pode ser movimentado pela página
- Popup fecha ao clicar fora dele
- Idioma escolhido fica salvo para as próximas utilizações

## Idiomas disponíveis

- Português
- Inglês
- Espanhol
- Francês
- Alemão
- Italiano

## Tecnologias

- TypeScript
- React
- Vite
- Chrome Extensions API
- Chrome Translator API
- Chrome Language Detector API

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
npm run build
```

## Executando o projeto

Para gerar a extensão:

```bash
npm run build
```

O resultado será gerado na pasta:
dist/

## Carregando a extensão no Chrome

Abra o Chrome.
Acesse:
chrome://extensions/
Ative o Modo do desenvolvedor.
Clique em Carregar sem compactação.
Selecione a pasta dist/.

Depois disso, a extensão estará disponível no navegador.

## Uso

1. Abra uma página da web.
2. Selecione um trecho de texto.
3. Clique com o botão direito.
4. Selecione a opção de tradução da extensão.
5. O popup será exibido próximo ao cursor.
6. O texto será traduzido para o idioma selecionado.

O idioma de destino pode ser alterado clicando no ícone da extensão e utilizando o seletor de idiomas.
