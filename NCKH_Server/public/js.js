(function () {
  let status = document.getElementById("status");
  let idEquip= document.getElementById("idEquip");
  let sendBtn = document.getElementById("btnSubmit");
  let led= document.getElementById("led");
  let p = document.getElementById("p");
  let ws;

  function showMessage(message) {
    // p.append(message+"==||==")
    console.log("status: "+message);
    if (message==="1") {
      p.innerText = "Đèn đã bật";
    } else {
      p.innerText = "Đèn đã tắt";
    }
  }

  function init() {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }

    ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log("Connection opened!");
    };
    ws.onmessage = ({ data }) => showMessage(data);
    ws.onclose = function () {
      ws = null;
    };
  }

  sendBtn.onclick = function () {
    if (!ws) {
      showMessage("No WebSocket connection :(");
      return;
    }
    let obj= ""+idEquip.value+";"+led.value+";"+status.value;
    // let json= JSON.stringify(obj);
    ws.send(obj);

    showMessage(json);
    //   status.value="";
    return false;
  };

  init();
})();
