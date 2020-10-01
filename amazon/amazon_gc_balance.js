function addUsableGiftCardBalance(){

    var usableBalance = "0.00";

    var element = document.querySelector("#gc-balance-table .gc-balance-left-section h2");


    var h2Element = document.createElement("h2");
    h2Element.className = "a-text-bold a-text-normal";
    h2Element.innerText = "Gift Card Usage Limit: ";

    var spanElement = document.createElement("span");
    spanElement.id = "usable_balance_value";
    spanElement.innerText = "CDN$" + usableBalance;
    spanElement.style.color = "red";

    h2Element.append(spanElement);



    element.append(h2Element);


}

function calculateSafeGiftCardLimit(){

    var giftCardBalance = document.querySelector("#gc-ui-balance-gc-balance-value").innerText;

}