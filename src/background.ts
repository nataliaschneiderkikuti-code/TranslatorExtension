chrome.runtime.onInstalled.addListener(() => {

  chrome.contextMenus.create({

    id: "consultar-texto",

    title: "Traduzir texto",

    contexts: ["selection"]

  });

});


chrome.contextMenus.onClicked.addListener(
  async (info, tab) => {

    if (info.menuItemId !== "consultar-texto") {
      return;
    }

    if (!tab?.id) {
      return;
    }


    const resultado =
      await chrome.storage.local.get(
        "targetLanguage"
      );


    const targetLanguage =
      typeof resultado["targetLanguage"] === "string"
        ? resultado["targetLanguage"]
        : "pt";


    chrome.tabs.sendMessage(
      tab.id,
      {
        type: "mostrar-popup",
        texto: info.selectionText ?? "",
        targetLanguage
      }
    );

  }
);