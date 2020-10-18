
//appendRedeemGiftCardButton();

function appendRedeemGiftCardButton(){
    

 
   var element = document.getElementById("gc-redemption-container");
    
   var button = document.createElement("button");
   button.id = "capture_image";
   button.className = "capture_image_class";
   button.type = 'button';
   button.innerText = 'Click To Take Screen Shot!';

   element.prepend(button);

    button.onclick = function () 
    {

        displayCustomElements(false);
       html2canvas($('#gc-redemption-container').get(0)).then( function (canvas) 
       {
        console.log(canvas);

        canvas.toBlob(function(blob) 
        { 
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]).then(function()
            {
               
                

                alert("Copied Image!");
                displayCustomElements(true);

                console.log("test");

            }); 

           
            
        });

        });

	};

}


function displayCustomElements(displayElements)
{
    if(!displayElements)
    {
        document.querySelectorAll(".hwt-container").forEach(function(element)
        {
            element.style.display = "none";
        });

        document.querySelectorAll(".claim-message-box").forEach(function(element)
        {
            element.style.display = "none";
        });

        document.querySelectorAll(".capture_image_class").forEach(function(element)
        {
            element.style.display = "none";
        });


        document.getElementById("gc-redemption-apply").querySelector('.a-button-inner').style.display = "";
        document.querySelector("#custom_redeem_button").style.display = "none";


    }




    if(displayElements)
    {
        document.querySelectorAll(".hwt-container").forEach(function(element)
        {
            element.style.display = "";
        });

        document.querySelectorAll(".claim-message-box").forEach(function(element)
        {
            element.style.display = "";
        });

        document.querySelectorAll(".capture_image_class").forEach(function(element)
        {
            element.style.display = "";
        });


        document.getElementById("gc-redemption-apply").querySelector('.a-button-inner').style.display = "none";
        document.querySelector("#custom_redeem_button").style.display = "";
    }


   
   

}