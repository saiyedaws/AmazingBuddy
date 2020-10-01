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
            highlight: 'invalid',
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
            className: 'light_green'
        },
        
        
    ]
});

}


createScrollableTextBox();