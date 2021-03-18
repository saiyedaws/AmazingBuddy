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

function postDataToFireBase(data, messageType)
{
   return new Promise((resolve, reject) => {
    console.log("Beginning to send data to firebase", data);
   

    chrome.runtime.sendMessage({
        command: "post",
        type: messageType,
        data: data
 
 
    }, (response) =>{
        //response from the database (background.html>firebase.js)
 
    
        console.log('Submit To Firebase Response: ',response);
        resolve();
    
    });
   });
  
}
