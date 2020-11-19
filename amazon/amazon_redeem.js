try {
    try {
        document.body.style.zoom = "50%";
        document.getElementById('gc-current-balance').style.zoom = "200%";
    } catch (error) {
        console.log(error);
    }

    appendRedeemGiftCardButton();
} catch (error) {
    console.log(error);
}

try {
    checkClaimCodeMessage()
} catch (error) {
    console.log(error);
}

function appendRedeemGiftCardButton(){
    
    /*
    document.getElementById("gc-redemption-apply").style.display = "none";



    var element = document.getElementById("gc-redemption-input-parent");
    

    var button = document.createElement("button");
    button.id = "custom_redeem_button";
    button.innerHTML = "Redeem & Save GiftCard";
    button.type = 'button';
    button.className = 'a-button a-button-span12 a-button-primary';


    element.parentElement.append(button);

    */

    document.getElementById("gc-redemption-apply").querySelector('.a-button-inner').style.display = "none";
   var element = document.getElementById("gc-redemption-apply");
    

   var button = document.createElement("button");
   button.id = "custom_redeem_button";
   button.innerHTML = "Apply to your balance";

   button.type = 'button';
   button.className = 'a-button a-button-span12 a-button-primary a-button-inner a-size-medium';


   element.append(button);

    button.onclick = function () 
    {
      

        var giftCardData = getRedeemInputData2()
        console.log(giftCardData);

        appendToLocalStorage(giftCardData, 'redemptionDetails');


       document.getElementById("gc-redemption-apply-button").click();

       setTimeout(() => {
        checkClaimCodeMessage();
       }, 4000);
	};

}

async function checkClaimCodeMessage()
{
    var claimCodeMessage = getClaimCodeMessage();

    if(claimCodeMessage)
    {
        var currentBalance = getCurrentBalance();

        var giftCardData =
        {
    
          giftCardClaimMessage: claimCodeMessage,
          current_balance: currentBalance,
         // timeStamp: getDate(),
          timeStamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
       
        } 
    
        await appendToLocalStorage(giftCardData, 'redemptionDetails');

        //on finding new claimcode message, create new scrollabletextarea
        try {
            createScrollableTextBox();
            
        } catch (error) {
            console.log(error);
        }
       
    }
  
}

 


function getRedeemInputData2()
{
    var redeemInputLine = document.getElementById("gc-redemption-input");

    var giftCardData =
    {
      giftCardClaimCode: redeemInputLine.value,
      previousBlanace: getCurrentBalance(),
      //timeStamp: getDate(),
      timeStamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
    
   
    } 

    return giftCardData;
}




 function getDate()
 {
     
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    return dateTime;

 }

 function getClaimCodeMessage()
 {
     var claimCodeMessage = '';

     if(document.getElementById("gc-redemption-error"))
     {
        claimCodeMessage +=  document.getElementById("gc-redemption-error").innerText;
     }

     if(document.getElementById("alertRedemptionSuccess"))
     {
        claimCodeMessage +=  document.getElementById("alertRedemptionSuccess").innerText;
     }

     if(document.getElementById("gc-redemption-alert"))
     {
        claimCodeMessage +=  document.getElementById("gc-redemption-alert").innerText;
     }

     return claimCodeMessage;
 }

function getCurrentBalance(){
    var currentBalance = document.getElementById("gc-current-balance").innerText;

    return currentBalance;
}
 



