var gift_card_data;

let messageListener = (request, sender, sendResponse) => 
{
  


  
    chrome.tabs.onUpdated.addListener(sendMessageToUpdatedContentScriptListener);
         
    

   
};

//chrome.runtime.onMessage.addListener(messageListener);

chrome.tabs.onUpdated.addListener(sendMessageToUpdatedContentScriptListener);
 


var sendMessageToUpdatedContentScriptListener = (tabId, changeInfo, tab) => {

    console.log('tab',tab);

    chrome.tabs.onUpdated.removeListener(sendMessageToUpdatedContentScriptListener);


  

        if(changeInfo.status === 'complete' && tab.title == 'https://www.amazon.ca/portal-migration/gc/redeem/result')
    {
       

        console.log("Sending Message to Content Page: Amazon");

        chrome.tabs.sendMessage(tabId, 
            {   type:"wait_for_page_update",
             
            });
    
    }
    
}