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
    var pendingTotal = getPendingTotal();

    var giftCardPlusPending = giftCardBalanceDecimal + pendingTotal;

    var usableGcLimit = giftCardPlusPending*0.45;
    usableGcLimit = usableGcLimit.toFixed(2);

    

    return usableGcLimit;
}


function getPendingTotal()
{
    var totalPendingAmount = 0;

    var trElements = document.querySelectorAll("tr");
   
  
    for (let index = 0; index < trElements.length; index++) {
        var trElement = trElements[index];

        if(trElement.textContent.includes('Pending'))
        {
            // something
            console.log(trElement.innerText);

            var price = trElement.innerText.match(/\d{1,3}[.](\d{1,2})/gi)[0];
            price = Number(price);

            console.log("price",price);

            totalPendingAmount = totalPendingAmount+price;
           

            console.log("totalPendingAmount",totalPendingAmount);

        }
        
    }


    totalPendingAmount = totalPendingAmount.toFixed(2);
    console.log("totalPendingAmount",totalPendingAmount);

    return totalPendingAmount;
}