var csrf;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//возвращает промис который будет готов когда ксрф будет не None
function Promise_csrf(){
	//let csrf_status=csrf_is_bad
	let prom=new Promise(function(resolve,reject){
		let interval=setInterval(()=>{
			if(csrf){clearInterval(interval);resolve()}
			else{me();console.log("try me")}
		},1000)
	})
	return prom
}

var me_running = false
async function me(){
	var a
	if (!me_running){
		me_running = true
		console.log("me fetching")
		a=await fetch("https://supchat.taxi.yandex-team.ru/chatterbox-api/me/", {
			// "headers": {
			// 	"accept": "application/json, text/plain, */*",
			// 	"accept-language": "ru,en;q=0.9",
			// 	"sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"YaBrowser\";v=\"23\"",
			// 	"sec-ch-ua-mobile": "?0",
			// 	"sec-ch-ua-platform": "\"Windows\"",
			// 	"sec-fetch-dest": "empty",
			// 	"sec-fetch-mode": "cors",
			// 	"sec-fetch-site": "same-origin"
			// },
			// "referrer": "https://supchat.taxi.yandex-team.ru/chat/64b69efde3e5da54e93fcaa9",
			// "referrerPolicy": "strict-origin-when-cross-origin",
			// "body": null,
			"method": "POST",
			// "mode": "cors",
			// "credentials": "include"
		});
	} else return
	a=await a.json()
	me_running = false
	csrf = a.csrf_token
	console.log("csrf ",csrf)
}




setListenerForMessage("called_build_ticket",async (message)=>{

	return "answ_"+message

	
})

setListenerForMessage("csrf",async (message)=>{
  console.log("csrf")
	return csrf

	
})

function setListenerForMessage(onmessage, callback){
	//log('setted listener for', onmessage)
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == 'send'&& message.onmessage==onmessage){
		console.log(message.onmessage," = ", onmessage)
		
		var messagesend = callback(message)//3
		messagesend.then((result)=>{///3
            console.log("SENDING BACK ", result)//3
		sendResponse(result)

		})//3
				return true
		}
	})
}
