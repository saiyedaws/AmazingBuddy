var gift_card_data;

let messageListener = (request, sender, sendResponse) => 
{
    //chrome.runtime.onMessage.removeListener(messageListener);

    if (request.type === 'gift_card_submitted') 
    {

        //console.log("sent from tab.id=", sender.tab.id);
        console.log("request gift_card_data: ",request.gift_card_data);
        gift_card_data = request.gift_card_data;

        /*
        var amazonRedeemTab = sender.id;
        chrome.tabs.sendMessage(amazonRedeemTab, 
        {   type:"wait_for_page_update",
            gift_card_data: request.gift_card_data
        });
        */

       
       chrome.tabs.onUpdated.addListener(sendMessageToUpdatedContentScriptListener);
         
    }

   
};

chrome.runtime.onMessage.addListener(messageListener);



var sendMessageToUpdatedContentScriptListener = (tabId, changeInfo, tab) => {


   // chrome.tabs.onUpdated.removeListener(sendMessageToUpdatedContentScriptListener);

   // console.log("tabId",tabId);
   // console.log("changeInfo",changeInfo);
    //console.log("tab",tab);
    //console.log("tab.title", tab.title);
   

    if(changeInfo.status === 'complete' && tab.title == 'https://www.amazon.ca/portal-migration/gc/redeem/result')
    {
        chrome.tabs.onUpdated.removeListener(sendMessageToUpdatedContentScriptListener);

        console.log("Sending Message to Content Page: Amazon");

        chrome.tabs.sendMessage(tabId, 
            {   type:"wait_for_page_update",
                gift_card_data: gift_card_data
            });
    
    }
    
}