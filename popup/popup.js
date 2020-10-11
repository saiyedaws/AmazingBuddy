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
  .addEventListener("click", getMessage);

  
async function getTotalErrorMessage(errorMessage, daysToCheck) 
{
 
  var totalErrorMessage = 0;

  var redemptionDetails = await getFromLocalStorage("redemptionDetails");
 
  for (let index = 0; index < redemptionDetails.length; index++) 
  {
    var redemptionDetail = redemptionDetails[index];

    if (redemptionDetail.giftCardClaimMessage){
      if (redemptionDetail.giftCardClaimMessage.includes(errorMessage)) 
      {
       
        var timeStamp = redemptionDetail.timeStamp;
        var timeStampMoment = moment(timeStamp, 'MMMM Do YYYY, h:mm:ss a');
                //console.log("timeStampMoment: ",timeStampMoment);
        var checkIsWithinCustomDays = await isWithinCustomDays(timeStampMoment, daysToCheck);
        // console.log("is "+timeStamp+" today?: "+ await isWithinCustomDays(timeStampMoment, daysToCheck));

        if(checkIsWithinCustomDays)
        {
          totalErrorMessage++;
        }


     

       
        
       
      }

    }
    
  }



  console.log(errorMessage+" total Within "+daysToCheck+" days: ",totalErrorMessage);

  return totalErrorMessage;

}

function getMessage()
{
  var today = 1;
  var week = 7;
  var month = 30;
  var year = 365;

  var totalInvalidToday = getTotalErrorMessage("GC claim code is invalid",today); 
  var totalInvalidThisWeek = getTotalErrorMessage("GC claim code is invalid",week); 
  var totalInvalidThisMonth = getTotalErrorMessage("GC claim code is invalid",month); 
  var totalInvalidThisYear = getTotalErrorMessage("GC claim code is invalid",year); 

  var totalSuccessToday = getTotalErrorMessage("added to your Gift Card Balance",today); 
  var totalSuccessThisWeek = getTotalErrorMessage("added to your Gift Card Balance",week); 
  var totalSuccessThisMonth = getTotalErrorMessage("added to your Gift Card Balance",month); 
  var totalSuccessThisYear= getTotalErrorMessage("added to your Gift Card Balance",year); 


  return{
    totalInvalidToday: totalInvalidToday,
    totalInvalidThisWeek: totalInvalidThisWeek,
    totalInvalidThisMonth: totalInvalidThisMonth,
    totalInvalidThisYear: totalInvalidThisYear,

    totalSuccessToday: totalSuccessToday,
    totalSuccessThisWeek: totalSuccessThisWeek,
    totalSuccessThisMonth: totalSuccessThisMonth,
    totalSuccessThisYear: totalSuccessThisYear,

  }

}


function isWithinCustomDays(momentDate, days){
  return new Promise((resolve)=>{

    var REFERENCE = moment(); // fixed just for testing, use moment();
    var customDays = REFERENCE.clone().subtract(days, 'days').startOf('day');

    resolve(momentDate.isAfter(customDays, 'd'));
  });
}



