//this page is when an order is completed

//https://www.amazon.ca/gp/buy/thankyou/handlers/display.html?ie=UTF8&asins=B07DKYJY88&isRefresh=1&orderId=701-8596354-9134655&purchaseId=703-9007890-5391435&ref_=chk_typ_browserRefresh&viewId=ThankYouCart

console.log("start amazon Thank you");
main();


async function main()
{

    var time_stamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    var user_id = await get_user_id();
    

    var thank_you_order_data = 
    {
        time_stamp:time_stamp,
        user_id: user_id,
        is_account_used:"yes @ "+time_stamp
    }


    await postDataToFireBase(thank_you_order_data, "amazon_balance_data_update_after_order");
}




