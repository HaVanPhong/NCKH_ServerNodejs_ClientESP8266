#include <ESP8266WiFi.h>                // Thư viện dùng để kết nối WiFi của ESP8266
#include <WebSocketsClient.h>           // Thư viện WebSocketsClient

//cần thay đổi khi chạy
//wifi thư viện tầng 2
//const char* ssid = "HaUI FREE";         // Tên của mạng WiFi mà bạn muốn kết nối đến
//const char* password = "";   // Mật khẩu của mạng WiFi
//const char* host="201.0.189.124";

//wifi nhà Phòng
const char* ssid = "không có tên";
const char* password = "lich123456"; 
const char* host="192.168.0.103";
///==================================
const int port=8080;
const int led = 14;                      // Đèn led ở chân GPIO2
WebSocketsClient webSocket;
void setup() {
  Serial.begin(9600);                 // Khởi tạo kết nối Serial để truyền dữ liệu đến máy tính
  pinMode(led, OUTPUT);
  startWiFi();
  webSocket.begin(host, port, "/"); 
  
}
void loop() {
  webSocket.loop();
  connectWebSocket();
}
void startWiFi() {
  WiFi.begin(ssid, password);           // Kết nối vào mạng WiFi
  Serial.print("Connecting to ");
  Serial.print(ssid);
  // Chờ kết nối WiFi được thiết lập
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\n");
  Serial.println("Connection established!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());       // Gởi địa chỉ IP đến máy tinh
}
void connectWebSocket() {
           // Địa chỉ websocket server, port và URL
  webSocket.onEvent(webSocketEvent);
  // webSocket.setAuthorization("user", "password");        // Sử dụng thông tin chứng thực nếu cần
  webSocket.setReconnectInterval(3000);
}
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:                         // Sự kiện khi client ngắt kết nối
      Serial.printf("[WSc] Disconnected!\n");
      connectWebSocket();
      break;
    case WStype_CONNECTED:                            // Sự kiện khi client kết nối
      Serial.printf("[WSc] Connected to url: %s\n", payload);
      Serial.println("ket noi ben arduino ok");
        
//      while(1){
//        digitalWrite(led, HIGH);   // turn the LED on (HIGH is the voltage level)
//        delay(1000);                       // wait for a second
//        digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW
//        delay(1000);
//      
//      }
 
        webSocket.sendTXT("Arduino Connected");  // Thông báo kết nối thành công
 
              
      break;
    case WStype_TEXT:                                 // Sự kiện khi nhận được thông điệp dạng TEXT
      Serial.printf("[WSc] res text\n");
      Serial.printf("[WSc] get text: %s\n", payload);
      if ( strcmp((const char*)payload,"1") == 0){
        digitalWrite(led, HIGH);
      }else {
        digitalWrite(led, LOW); 
      }
//      while(1){
//        webSocket.sendTXT("Hi Server!");               // Gởi thông điệp đến server
//        delay(5000);
//      }
      break;
    default: 
      Serial.printf("[WSc] get text default: %s\n", payload);
      break;
   
  }
}
