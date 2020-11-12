var gift_card_data;

let messageListener = (request, sender, sendResponse) => 
{
  


  
    chrome.tabs.onUpdated.addListener(sendMessageToUpdatedContentScriptListener);
         
    

   
};

//chrome.runtime.onMessage.addListener(messageListener);

chrome.tabs.onUpdated.addListener(sendMessageToUpdatedContentScriptListener);
 

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
      if (request.command === "get_teamviewer_id")
      {
        var teamviewer_id = localStorage.getItem('teamviewer_id');
        sendResponse(teamviewer_id);

      }

      if (request.command === "get_user_id")
      {
        var user_id = localStorage.getItem('user_id');
        sendResponse(user_id);

      }

      //return true to indicate you want to send a response asynchronously
      return true;
       
    });


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