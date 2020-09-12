var waitUntilElementExists = (selector, callback) => 
{
        var el = document.querySelector(selector);
        console.log("Checking");
        if (el){
            console.log("Found");
            return callback(el);
        }
        
        setTimeout(() => waitUntilElementExists(selector, callback), 500);
}
        

var waitUntilElementExistsViaQuerySelectorAll = (selector, callback) => 
{
        var el = document.querySelectorAll(selector)[0];
        console.log("Checking");
        if (el){
            console.log("Found");
            return callback(el);
        }
        
        setTimeout(() => waitUntilElementExistsViaQuerySelectorAll(selector, callback), 500);
}
    