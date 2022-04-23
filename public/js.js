(function () {
  let status = document.getElementById("status");
  let sendBtn = document.getElementById("btnSubmit");
  let p = document.getElementById("p");
  let ws;

  function showMessage(message) {
    console.log(message);
    // p.append(message+"==||==")
    console.log(message);
    if (message === "1") {
      p.innerHTML = "Đèn đã bật";
    } else {
      p.innerHTML = "Đèn đã tắt";
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
    ws.onmessage = ({ data }) => showMessage("onmessage: " + data);
    ws.onclose = function () {
      ws = null;
    };
  }

  sendBtn.onclick = function () {
    if (!ws) {
      showMessage("No WebSocket connection :(");
      return;
    }

    ws.send(status.value);

    showMessage("on submit: " + status.value);
    //   status.value="";
    return false;
  };

  init();
})();
