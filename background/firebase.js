// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDLqt51UeNxyjlSqA5znH06WH8D0zwCHRU",
    authDomain: "amzn-buddy.firebaseapp.com",
    databaseURL: "https://amzn-buddy.firebaseio.com",
    projectId: "amzn-buddy",
    storageBucket: "amzn-buddy.appspot.com",
    messagingSenderId: "1056312450993",
    appId: "1:1056312450993:web:4637db4840e9c873a36790"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("firebase initializeApp",firebase);

chrome.runtime.onMessage.addListener((msg, sender, response) => 
{
	console.log(msg);

	if (msg.command == "post" && msg.type == "giftcard-data") 
	{
		console.log("Starting Post To firebase");

		var gift_card_data = msg.giftCardData;
		console.log('gift_card_data', gift_card_data);

		var gift_card_claim_code = gift_card_data.gift_card_claim_code;

		var time_stamp = gift_card_data.time_stamp;

		var gift_card_claim_message = gift_card_data.gift_card_claim_message;
		var b64_gift_card_claim_message = btoa(gift_card_claim_message);
		var enc_gift_card_claim_message = encodeURIComponent(gift_card_claim_message).replace(/\./g, '%2E');

		



		var referenceDomain = '/email-id';

		var savedEmail = localStorage.getItem("email");
		console.log("savedEmail",savedEmail);
		var b64_email = btoa(savedEmail);
		var enc_email = encodeURIComponent(savedEmail).replace(/\./g, '%2E');


		//referenceDomain = '/'+referenceDomain +'/'+ enc_email +'/'+msg.type;
		referenceDomain = referenceDomain +'/'+ b64_email+'/'+msg.type;

		//this works
		//referenceDomain = "/domain/" + enc_email;


		/* 
		var gift_card_data = 

		gift_card_claim_code: redeemInputLine.value,
		time_stamp: time_stamp,
		gift_card_claim_message: "",
		prevous_balance: getCurrentBalance(),
		current_balance: '',
		enc_email: encSavedEmail,
		'timeStamp': getDate()
		
		*/


		try {
			var newPost = firebase
				.database()
				.ref(referenceDomain)
				.push()
				.set({
					"gift_card_claim_code": gift_card_claim_code,
					"enc_gift_card_claim_message": enc_gift_card_claim_message,
					"b64_gift_card_claim_message": b64_gift_card_claim_message,
					"current_balance": gift_card_data.current_balance,
					"prevous_balance": gift_card_data.prevous_balance,
					"timeStamp": time_stamp,
					
				});



			var postId = newPost.key;
			console.log("postId",postId);

			response({
				type: "result",
				status: "success",
				data: postId,
				request: msg,
			});


		} catch (error) 
		{
			console.log("error: ", error);
			response({
				type: "result",
				status: "error",
				data: error,
				request: msg,
			});
		}
	}


	if (msg.command == "post" && msg.type == "amazon-order-data") 
	{
	
		console.log("Starting Post To firebase amazon-order-data", msg);

		var amazonOrderData = msg.amazonOrderData;

		var referenceDomain = '/email-id';
		var savedEmail = localStorage.getItem("email");
		var b64_email = btoa(savedEmail);

		referenceDomain = referenceDomain +'/'+ b64_email+'/'+msg.type;

		/*
		'shippingAddress': getShippingAddress(),
        'orderSummaryData':getOrderSummary(),
        'deliveryDate': getDeliveryDate(),
        'productTitle':getProductTitle()
		timeStamp
		*/

		try {
			var newPost = firebase
				.database()
				.ref(referenceDomain)
				.push()
				.set({
					"shippingAddress": btoa(amazonOrderData.shippingAddress),
					"orderSummary": btoa(amazonOrderData.orderSummaryData.orderSummary),
					"orderTotal": btoa(amazonOrderData.orderSummaryData.orderTotal),
					"deliveryDate": btoa(amazonOrderData.deliveryDate),
					"productTitle": btoa(amazonOrderData.productTitle.replace(/[^a-zA-Z , . & = \d]/g, "")),
					"timeStamp": amazonOrderData.timeStamp,
					
				});



			var postId = newPost.key;
			console.log("postId",postId);

			response({
				type: "result",
				status: "success",
				data: postId,
				request: msg,
			});


		} catch (error) 
		{
			console.log("error: ", error);
			response({
				type: "result",
				status: "error",
				data: error,
				request: msg,
			});
		}

		
	}


	if (msg.command == "post" && msg.type == "amazon_balance_data") 
	{

		 var gift_card_balance_information = msg.data;
		 
		console.log("Starting Post To firebase amazon_balance_data", msg);


		var referenceDomain = `/amazon_accounts/${gift_card_balance_information.user_id}`;



		try {
			var newPost = firebase
				.database()
				.ref(referenceDomain)
				//.push()
				
				.set({
					"gift_card_balance": gift_card_balance_information.gift_card_balance,
					"usable_gift_card_balance": gift_card_balance_information.usable_gift_card_balance,
					"total_pending_value": gift_card_balance_information.total_pending_value,
					"total_pending_orders": gift_card_balance_information.total_pending_orders,
					"time_stamp": gift_card_balance_information.time_stamp,
					"user_id": gift_card_balance_information.user_id,
					"teamviewer_id": gift_card_balance_information.teamviewer_id,
					"is_account_used":gift_card_balance_information.is_account_used
					
				});



			var postId = newPost.key;
			console.log("postId",postId);

			response({
				type: "result",
				status: "success",
				data: postId,
				request: msg,
			});


		} catch (error) 
		{
			console.log("error: ", error);
			response({
				type: "result",
				status: "error",
				data: error,
				request: msg,
			});
		}

		
	}

	if (msg.command == "post" && msg.type == "amazon_balance_data_update_after_order") 
	{

		 var gift_card_balance_information = msg.data;
		 
		console.log("Starting Post To firebase amazon_balance_data_update_after_order", msg);


		var referenceDomain = `/amazon_accounts/${gift_card_balance_information.user_id}`;



		try {
			var newPost = firebase
				.database()
				.ref(referenceDomain)
				//.push()
				
				.update({
					//"time_stamp": gift_card_balance_information.time_stamp,
					//"user_id": gift_card_balance_information.user_id,
					//"teamviewer_id": gift_card_balance_information.teamviewer_id,
					"is_account_used":gift_card_balance_information.is_account_used
					
				});



			var postId = newPost.key;
			console.log("postId",postId);

			response({
				type: "result",
				status: "success",
				data: postId,
				request: msg,
			});


		} catch (error) 
		{
			console.log("error: ", error);
			response({
				type: "result",
				status: "error",
				data: error,
				request: msg,
			});
		}

		
	}

	if(msg.command == "get" && msg.type == "amazon_accounts")
	{

		
		firebase.database().ref('/amazon_accounts/').once('value').then(function(snapshot) 
		{
			console.log("snapshot",snapshot);
			console.log("snapshot Val",snapshot.val());
			response({
				type: "done",
			});
			// ...

		});
	}

	return true;
});
