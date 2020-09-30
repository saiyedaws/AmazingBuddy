document.getElementById('display_gift_card_button').addEventListener('click', viewOrders);

function displayGiftCardData(){

    
    var giftCardDataArray = JSON.parse(localStorage.getItem('giftCardDataArray')) || [];
    console.log("giftCardDataArray",giftCardDataArray);

}

async function viewOrders(){

   


  var redemptionDetails = await getFromLocalStorage('redemptionDetails');
  console.log("redemptionDetails",redemptionDetails);
  
     
  
  }