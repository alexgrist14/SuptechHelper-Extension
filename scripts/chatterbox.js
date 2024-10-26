
// function get_id(){
//   var interval = setInterval(()=>{
//   if (document.querySelector(".CopyContent.CopyTaskId")){
//     clearInterval(interval);
//     document.querySelector('.amber-icon.amber-icon_flip.TaskFormOffline__refresh').insertAdjacentHTML( 
//         'afterend', 
//         '<span id="ticket_show" >...</span>' 
//       );
//     document.getElementById("ticket_show").addEventListener("click", get_ticket, false);
//     console.log("added")

    
//   }},10)
// }

async function get_ticket(){
  try{
      
    //id = document.querySelector(".CopyContent.CopyTaskId").textContent
    const id = document.location.pathname.slice(6)
    const csrf_token = sendBC("csrf")
    await csrf_token
    const res = await fetch("https://supchat.taxi.yandex-team.ru/chatterbox-api/v1/tasks/"+id, {
    "headers": {
      "x-csrf-token": csrf_token
    },
    "method": "GET",
  });
  const result = await res.json()
  console.log(result)
  return result
  }
  catch(err){
    return
  }
  }
  get_ticket()


  function sendBC(message){
    let promise = new Promise(function(resolve,reject){
    chrome.runtime.sendMessage(
      message,
      (response) => {
      console.log('received sendBC', response);
      resolve(response)
      }
    )})
    return promise
  }
  try{
    async function send_test(){
      const ticket = await get_ticket()
      let result=await sendBC({
        'type':'send',
        'onmessage':'called_build_ticket',
        'data':{}
        })
        console.log(result)
    }
    
  }
  catch(err){console.log(err)}

let ticket = document.querySelector(
  "div.g-box.g-flex.TSFMmZMm0nsdX28dMBU5.vbGdvpWsx2Q4Iggc8YxQ"
);
if (ticket){
    appendMeta();
} 
else {
  const getTicketInterval = setInterval(() => {
    ticket = document.querySelector(
      "div.g-box.g-flex.TSFMmZMm0nsdX28dMBU5.vbGdvpWsx2Q4Iggc8YxQ"
    );
    if (ticket) {
      clearInterval(getTicketInterval);
      appendMeta();
      console.log(ticket);
    }
  }, 1000);
}

const appendMeta = () => {
  const ticket_meta = document.createElement("div");
  ticket_meta.textContent = "meta";
  ticket.appendChild(ticket_meta);
};
