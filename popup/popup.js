let bg_port = chrome.runtime.connect({ name: "popup" });

document
  .getElementById("display_gift_card_button")
  .addEventListener("click", viewOrders);

async function viewOrders() {
  var redemptionDetails = await getFromLocalStorage("redemptionDetails");
  console.log("redemptionDetails", redemptionDetails);
}

document
  .getElementById("total_invalid_redemption")
  .addEventListener("click", getTotalInvalidGiftCards);

async function getTotalInvalidGiftCards() 
{
 
  var totalInvalid = 0;
 

  var redemptionDetails = await getFromLocalStorage("redemptionDetails");
 

  redemptionDetails.forEach((redemptionDetail) => 
  {
    if (redemptionDetail.giftCardClaimMessage)
      if (redemptionDetail.giftCardClaimMessage.includes("invalid")) 
      {
        var timeStamp = redemptionDetail.timeStamp;
        console.log("timeStamp: ",timeStamp);

        var timeStampFormatted = moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a');
        console.log("timeStampFormatted: ",timeStampFormatted);


      console.log("isInLastWeek: ",isInLastWeek(timeStamp)); // true
      }



  });


  



}


function isInLastWeek(dateToCheck)
{
var now = moment();
var dateToCheckMoment = moment(dateToCheck);


const diffDays = now.diff(dateToCheckMoment, 'days');

console.log(diffDays);

  
}