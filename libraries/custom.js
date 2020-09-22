var waitUntilElementExistsAmazonBuddy = (selector, callback) => 
{
        var el = document.querySelector(selector);
        console.log("Checking - amazonbuddy");
        if (el){
            console.log("Found - amazonbuddy");
            return callback(el);
        }
        
        setTimeout(() => waitUntilElementExistsAmazonBuddy(selector, callback), 500);
}
        

var waitUntilElementExistsViaQuerySelectorAll = (selector, callback) => 
{
        var el = document.querySelectorAll(selector)[0];
        console.log("Checking - amazonbuddy");
        if (el){
            console.log("Found - amazonbuddy");
            return callback(el);
        }
        
        setTimeout(() => waitUntilElementExistsViaQuerySelectorAll(selector, callback), 500);
}
    