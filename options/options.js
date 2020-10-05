
let bg_port = chrome.runtime.connect({ name: "option" });

document
.getElementById("import_gift_card_data_button")
.addEventListener("click", importGiftCardData);

async function importGiftCardData() 
{
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

appendArrayToLocalStorage(obj, 'redemptionDetails');

  
}

document
.getElementById("export_gift_card_data_button")
.addEventListener("click", exportGiftCardData);

async function exportGiftCardData() {

var redemptionDetails = await getFromLocalStorage("redemptionDetails");
var text = JSON.stringify(redemptionDetails);

bg_port.postMessage(
      
  {
       type: "from_option",
       command: "copy_to_clipboard",
       text: text

  });
}


document
.getElementById("clear_gift_card_data_button")
.addEventListener("click", clearGiftCardData);

async function clearGiftCardData() {

clearLocalStorage("redemptionDetails");



}


