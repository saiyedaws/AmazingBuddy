let bg_port = chrome.runtime.connect({ name: "option" });

document
  .getElementById("import_gift_card_data_button")
  .addEventListener("click", importGiftCardData);

async function importGiftCardData() {
  var input = document.createElement("textarea");
  input.id = "textArea_id";
  document.body.appendChild(input);
  input.click();
  input.focus();
  document.execCommand("paste");

  var redemptionDetails = document.getElementById("textArea_id").value;

  input.remove();

  console.log(redemptionDetails);

  var obj = JSON.parse(redemptionDetails);

  appendArrayToLocalStorage(obj, "redemptionDetails");
}

document
  .getElementById("export_gift_card_data_button")
  .addEventListener("click", exportGiftCardData);

async function exportGiftCardData() {
  var redemptionDetails = await getFromLocalStorage("redemptionDetails");
  var text = JSON.stringify(redemptionDetails);

  bg_port.postMessage({
    type: "from_option",
    command: "copy_to_clipboard",
    text: text,
  });
}

document
  .getElementById("clear_gift_card_data_button")
  .addEventListener("click", clearGiftCardData);

async function clearGiftCardData() {
  clearLocalStorage("redemptionDetails");
}


function addEventListener(){
  document.querySelector('#teamviewer_id_button').addEventListener('click', save_teamviewer_id);
  document.querySelector("#user_id_button").addEventListener("click",save_user_id);

  document.querySelector('#chrome_settings').addEventListener('click', open_chrome_settings);

}addEventListener();

function save_teamviewer_id()
{
  var teamviewer_id = document.querySelector("#teamviewer_id_input").value;
  localStorage.setItem('teamviewer_id', teamviewer_id);
  console.log("teamviewer_id",teamviewer_id);
  document.querySelector("#saved_teamviewer_id").innerHTML = "Saved Teamviewer-ID: "+teamviewer_id;

}

function save_user_id()
{
  var user_id = document.querySelector("#user_id_input").value;
  localStorage.setItem('user_id', user_id);
  console.log("user_id",user_id);
  document.querySelector("#saved_user_id").innerHTML = "Saved User-ID: "+user_id;
  
}

function restore_settings(){
  console.log(localStorage.getItem('teamviewer_id'));

  var teamviewer_id = localStorage.getItem('teamviewer_id');
  var saved_teamviewer_id = document.querySelector("#saved_teamviewer_id");
  saved_teamviewer_id.innerHTML = teamviewer_id;

  var user_id = localStorage.getItem('user_id');
  var saved_user_id = document.querySelector("#saved_user_id");
  saved_user_id.innerHTML = user_id;


}restore_settings();


function open_chrome_settings()
{
    copyToClipboard('https://www.amazon.ca');

    bg_port.postMessage({ type: "open_chrome_settings"});
}
