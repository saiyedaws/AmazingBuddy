document.getElementById('display_gift_card_button').addEventListener('click', displayGiftCardData);

function displayGiftCardData(){

    
    var giftCardDataArray = JSON.parse(localStorage.getItem('giftCardDataArray')) || [];
    console.log("giftCardDataArray",giftCardDataArray);

}


document.getElementById('set_object_button').addEventListener('click', setGiftCardData);
function setGiftCardData(){

    
    var oldItems = JSON.parse(localStorage.getItem('giftCardDataArray')) || [];


    var newItem = 
    {
      gift_card_claim_code: 'redeemInputLine.value',
      time_stamp: 'time_stamp',
      gift_card_claim_message: "",
      prevous_balance: 'getCurrentBalance',
      current_balance: '',
   
    } 

    oldItems.push(newItem);
   
   localStorage.setItem('giftCardDataArray', JSON.stringify(oldItems));

}

