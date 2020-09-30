//console.log('starting page worked');

try {
    document.getElementById('gc-redemption-apply-button').addEventListener('click',function()
    {
       // console.log('btnComment worked');
    
        getRedeemInputData();
     });
     
} catch (error) 
{
    console.log("error",error)
    
}


 chrome.runtime.onMessage.addListener((request, sender, sendResponse) => 
 {
     //console.log("request",request);
    if (request.type === 'wait_for_page_update') 
    {
       // console.log("Recieved Message From Background.")
       // console.log("gift_card_data",request.gift_card_data);

        var giftCardData = request.gift_card_data;
        giftCardData.gift_card_claim_message = getClaimCodeMessage();
        giftCardData.current_balance = getCurrentBalance();

        //console.log("giftCardData",giftCardData);

        appendToLocalStorage(giftCardData);
        postDataToFireBase(giftCardData);
    }
    
});


 function getRedeemInputData()
 {
     var redeemInputLine = document.getElementById("gc-redemption-input");
     console.log("redeemInputLine", redeemInputLine.value);

    var time_stamp = getDate();


     chrome.runtime.sendMessage({
          type: 'gift_card_submitted',
          gift_card_data:
          {
            gift_card_claim_code: redeemInputLine.value,
            time_stamp: time_stamp,
            gift_card_claim_message: "",
            prevous_balance: getCurrentBalance(),
            current_balance: '',
         
          } 

        });

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
 

 function postDataToFireBase(giftCardData)
 {
    
     console.log("Beginning to send data to firebase");
    

    chrome.runtime.sendMessage({
        command: "post",
        type: "giftcard-data",
        email: "",
        giftCardData: giftCardData


    }, (response) =>{
        //response from the database (background.html>firebase.js)

    
        postDataToFireBase_callback(response);
    
    });

 }

 var postDataToFireBase_callback = function(response){

    console.log('Submit To Firebase Response: ',response);

};

function appendToLocalStorage(newItem)
{

var oldItems = JSON.parse(localStorage.getItem('giftCardDataArray')) || [];

 oldItems.push(newItem);

localStorage.setItem('giftCardDataArray', JSON.stringify(oldItems));


}