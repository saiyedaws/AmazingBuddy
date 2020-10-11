function createTextBox(){
    var element = document.body.firstElementChild;
   
 
     var textArea = document.createElement("textarea");
     textArea.id = "textAreaID";

     element.append(textArea);

}

async function createScrollableTextBox(){

  

    try {
    

        document.querySelectorAll('.hwt-container').forEach(e => e.remove());
        document.querySelectorAll('.text_box_class').forEach(e => e.remove());
    


    } catch (error) {
        
    }

    var element = document.getElementById("gc-current-balance-title");
    
    

    var textArea = document.createElement("textarea");
    textArea.id = "scrollabletextbox";
    textArea.className = "text_box_class";
    textArea.name = "note";
    textArea.type = 'textarea';
    textArea.value = '';

    element.parentElement.append(textArea);
 



    

    try {
        addRedemptionDetailsToTextArea();
    } catch (error) {
        console.log(error);
    }
  
   
    
}

async function addRedemptionDetailsToTextArea(){
    var redemptionDetails = await getFromLocalStorage('redemptionDetails');
    var myLogs = "";

    for (var index = redemptionDetails.length - 1; index >= 0; index--)
    {
        var redemptionDetail = redemptionDetails[index];
        var myLog = JSON.stringify(redemptionDetail) + '\r\n'+ '\r\n'+ '\r\n';

        

        myLogs += myLog;
    }

   
    document.getElementById("scrollabletextbox").value = myLogs;
    try {
        styleTextArea();
    } catch (error) {
        
    }
}



function styleTextArea(){

   
    
$('#scrollabletextbox').highlightWithinTextarea({
    highlight: [
        {
            highlight: 'GC claim code is invalid',
            className: 'red'
        },
        {
            highlight: /{"giftCardClaimCode"\s*:\s*"(.+?)}/gi,
            className: 'yellow'
        }, 
        {
            highlight: /"timeStamp"\s*:\s*"(.+?)"/gi,
            className: 'blue'
        }, 
        {
            highlight: /"current_balance"\s*:\s*"(.+?)"/gi,
            className: 'green'
        },
        {
            highlight: 'has been added to your Gift Card Balance',
            className: 'green'
        },
        {
            highlight: 'Already redeemed to another account',
            className: 'orange'
        },

       
        
        
    ]
});

}


createScrollableTextBox();



async function createClaimMessageTotalBox(claimCodeType,claimCodeMessage)
{
    var innerHTMLMessage = '';
    var totalMessageCount = '';

    var element = document.getElementById("gc-redemption-form");
    var textArea = document.createElement("div");
    textArea.id = claimCodeType+"-claim-message-box";
    textArea.className = claimCodeType +' claim-message-box';
    element.append(textArea);



    var today = 1;
    var week = 7;
    var month = 30;
    var year = 365;

  

    totalMessageCount = await getTotalErrorMessage(claimCodeMessage,today); 
    innerHTMLMessage += '<span id="'+claimCodeType+'Text">'+"Total "+claimCodeType+" today: </span>" + '<span style="color:#ff0000;font-weight: bold;">'+totalMessageCount+'</span>';
    innerHTMLMessage += "<br>";
    console.log(innerHTMLMessage);

    totalMessageCount = await getTotalErrorMessage(claimCodeMessage,week); 
    innerHTMLMessage += "Total "+claimCodeType+" week: " + totalMessageCount;
    innerHTMLMessage += "<br>";
    console.log(innerHTMLMessage);

    totalMessageCount = await getTotalErrorMessage(claimCodeMessage,month); 
    innerHTMLMessage += "Total "+claimCodeType+" month: " + totalMessageCount;
    innerHTMLMessage += "<br>";
    console.log(innerHTMLMessage);

    totalMessageCount = await getTotalErrorMessage(claimCodeMessage,year); 
    innerHTMLMessage += "Total "+claimCodeType+" year: " + totalMessageCount;
    innerHTMLMessage += "<br>";
    console.log(innerHTMLMessage);


  document.getElementById(claimCodeType+'-claim-message-box').innerHTML = innerHTMLMessage;



}


createClaimMessageTotalBox("invalid","GC claim code is invalid");
createClaimMessageTotalBox("already-redeemed","Already redeemed to another account");
createClaimMessageTotalBox("valid","added to your Gift Card Balance");





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

function isWithinCustomDays(momentDate, days){
    return new Promise((resolve)=>{
  
      var REFERENCE = moment(); // fixed just for testing, use moment();
      var customDays = REFERENCE.clone().subtract(days, 'days').startOf('day');
  
      resolve(momentDate.isAfter(customDays, 'd'));
    });
  }
  
  
  
  