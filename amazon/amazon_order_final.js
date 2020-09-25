

function addListener(){
    try {
        console.log("Starting amazon Order Final");
    
    
        document.querySelector("#placeYourOrder input")
        //document.querySelector('[data-action="gc-element"]')
            .addEventListener("click", function () 
            {
                console.log("placeYourOrder worked");
                
                var amazonOrderData = getAmazonOrderData();
                console.log('amazonOrderData',amazonOrderData);
                postDataToFireBase(amazonOrderData);
            });
    } catch (error) {
        console.log("error", error);
    }
}
waitUntilElementExistsAmazonBuddy('.asin-title', (el) => addListener());

//waitUntilElementExistsAmazonBuddy('.asin-title', (el) => addTrackOrderDetailsButton());

function addTrackOrderDetailsButton()
{


   var placeYourOrderButton =  document.querySelector('#checkoutDisplayPage').parentElement;


   var btn = document.createElement("BUTTON");
   btn.innerHTML = "Log This Order";
   btn.className = "track_order";
   btn.id = "track-button-ID";
   


   var body = document.getElementsByTagName("head")[0];
    body.parentElement.prepend(btn);

    //placeYourOrderButton.appendChild(btn);




   
    //Send on click
   btn.onclick = function () 
   {
       console.log("details");
       console.log("placeYourOrder worked");
            
       var amazonOrderData = getAmazonOrderData();
       console.log('amazonOrderData',amazonOrderData);

          postDataToFireBase(amazonOrderData);
       
      
      
       
   }
   

}




function postDataToFireBase(amazonOrderData)
{
   
    console.log("Beginning to send data to firebase");
   

   chrome.runtime.sendMessage({
       command: "post",
       type: "amazon-order-data",
       amazonOrderData: amazonOrderData


   }, (response) =>{
       //response from the database (background.html>firebase.js)

   
       postDataToFireBase_callback(response);
   
   });

}


var postDataToFireBase_callback = function(response){

    console.log('Submit To Firebase Response: ',response);

    try {
        var trackButton = document.getElementById("track-button-ID");
        trackButton.innerHTML = response.status;
    } catch (error) {
        
    }


};



function getAmazonOrderData(){


    return{
        'shippingAddress': getShippingAddress(),
        'orderSummaryData':getOrderSummary(),
        'deliveryDate': getDeliveryDate(),
        'productTitle':getProductTitle(),
        'timeStamp': getDate()

    }
}

function getDate()
{
    
   var today = new Date();
   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   var dateTime = date+' '+time;

   return dateTime;

}

function getShippingAddress() {
	var shippingAddress = document.getElementById("desktop-shipping-address-div");
    console.log(shippingAddress.innerText);
    
    return shippingAddress.innerText;
}

function getOrderSummary() 
{
	var orderSummary = document.getElementById("subtotals-marketplace-table");
	console.log(orderSummary.innerText);

	//You could use xpath to accomplish this

	var xpath = "//span[contains(text(),'Total:')]";
	var matchingElement = document.evaluate(
		xpath,
		orderSummary,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue;
	console.log(matchingElement);
	console.log(matchingElement.parentElement);
	var orderTotal = matchingElement.parentElement.parentElement.querySelectorAll(
		"td"
	)[1].innerText;

	return {
		orderSummary: orderSummary.innerText,
		orderTotal: orderTotal,
    };
    
}



function getDeliveryDate()
{
    var deliveryDate = "ETA N/A";
    var date = document.getElementsByClassName("a-row a-text-bold a-size-medium a-spacing-small")[0];

   deliveryDate = date.innerText;


    return decodeHTMLEntities(deliveryDate);
};

function decodeHTMLEntities(text) 
{
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}

function getProductTitle(){
    var productTitle = document.getElementsByClassName("asin-title")[0].innerText;

    return productTitle;
}


