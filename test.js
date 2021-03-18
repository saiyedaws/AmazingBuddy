var elms = document.getElementsByClassName("total_pending_value");
var total = 0;

for (let index = 0; index < elms.length; index++) 
{
    const element = elms[index];
    console.log(element.innerText);

    try {
        var price =  parseInt(element.innerText);
        total = total + price;
        
    }
     catch (error) {
        
    }
 
}

console.log("total: ",total);