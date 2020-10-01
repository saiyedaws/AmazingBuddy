try {
    addUsableGiftCardBalance();
} catch (error) {
    console.log(error);
}


function addUsableGiftCardBalance(){

    var usableBalance = getSafeGiftCardLimit();

    var element = document.querySelector("#gc-balance-table .gc-balance-left-section h2");


    var h2Element = document.createElement("h2");
    h2Element.className = "a-text-bold a-text-normal";
    h2Element.innerText = "Safe Gift Card Usage Limit: ";

    var spanElement = document.createElement("span");
    spanElement.id = "usable_balance_value";
    spanElement.innerText = "CDN$" + usableBalance;
    spanElement.style.color = "red";

    h2Element.append(spanElement);



    element.append(h2Element);


}

function getSafeGiftCardLimit(){

    var giftCardBalance = document.querySelector("#gc-ui-balance-gc-balance-value").innerText;
   
    var giftCardBalanceDecimal = giftCardBalance.match(/\d+\.?\d*/gi)[0];

    var usableGcLimit = giftCardBalanceDecimal*0.45;

    usableGcLimit = usableGcLimit.toFixed(2);
    return n;
}