console.log("Testing.");


try 
{
    main();

} catch (error) {
    console.log(error);
}

async function main(){
    var gift_card_balance_information = await fetch_gift_card_balance_information();
    await postDataToFireBase(gift_card_balance_information);
   // await getDataFromFireBase();
}

async function fetch_gift_card_balance_information()
{
    var gift_card_balance = get_gift_card_balance();
    var usable_gift_card_balance = getSafeGiftCardLimit();
    var total_pending_value = Number(getPendingTotal());
    var total_pending_orders = get_total_pending_orders();
    var time_stamp = moment().format('MMMM Do YYYY, h:mm:ss a');
  
    var teamviewer_id = await get_teamviewer_id();
    var user_id = await get_user_id();
    



    var gift_card_balance_data = 
    {
        gift_card_balance:gift_card_balance,
        usable_gift_card_balance:usable_gift_card_balance,
        total_pending_value:total_pending_value,
        total_pending_orders:total_pending_orders,
        time_stamp:time_stamp,
        user_id: user_id,
        teamviewer_id: teamviewer_id
        

    }

    console.log("gift_card_balance_data",gift_card_balance_data);


    return gift_card_balance_data;
}

function get_teamviewer_id(){

    return new Promise((resolve, reject) => 
    {
        chrome.runtime.sendMessage({command: "get_teamviewer_id"}, function(response) 
        {
            console.log("response",response);
            resolve(response);
            
        });
        
    });
}

function get_user_id(){

    return new Promise((resolve, reject) => 
    {
        chrome.runtime.sendMessage({command: "get_user_id"}, function(response) 
        {
            console.log("response",response);
            resolve(response);
            
        });
        
    });
}

function get_gift_card_balance()
{
    var giftCardBalance = document.querySelector("#gc-ui-balance-gc-balance-value").innerText;
    var giftCardBalanceDecimal = giftCardBalance.match(/\d+\.?\d*/gi)[0];
    giftCardBalanceDecimal = Number(giftCardBalanceDecimal);

    return giftCardBalanceDecimal;
}

function get_total_pending_orders()
{
    var totalPendingAmount = 0;
    var totalPendingOrders = 0;

    var trElements = document.querySelectorAll("tr");
   
    if(trElements)
    {
        for (let index = 0; index < trElements.length; index++) {
            var trElement = trElements[index];
    
            if(trElement.textContent.includes('Pending'))
            {
                // something
                totalPendingOrders++;
                //console.log(trElement.innerText);
    
                var price = trElement.innerText.match(/\d{1,3}[.](\d{1,2})/gi)[0];
                price = Number(price);
    
                //console.log("price",price);
    
                totalPendingAmount = totalPendingAmount+price;
               
    
                //console.log("totalPendingAmount",totalPendingAmount);
    
            }
            
        }
    }
  
  


    totalPendingAmount = totalPendingAmount.toFixed(2);
    //console.log("totalPendingAmount",totalPendingAmount);

    //totalPendingAmount = Number(usableGcLimit);
    return totalPendingOrders;
}


function postDataToFireBase(data)
{
   return new Promise((resolve, reject) => {
    console.log("Beginning to send data to firebase", data);
   

    chrome.runtime.sendMessage({
        command: "post",
        type: "amazon_balance_data",
        data: data
 
 
    }, (response) =>{
        //response from the database (background.html>firebase.js)
 
    
        console.log('Submit To Firebase Response: ',response);
        resolve();
    
    });
   });
  
}



function getDataFromFireBase()
{
   

   return new Promise((resolve, reject) => {
    console.log("Beginning to get data from firebase");

    chrome.runtime.sendMessage({
        command: "get",
        type: 'amazon_accounts',
 
 
    }, (response) =>{
        //response from the database (background.html>firebase.js)
 
    
        console.log('Submit To Firebase Response: ',response);
        resolve();
    
    });

   });



}