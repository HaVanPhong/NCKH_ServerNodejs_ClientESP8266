#include <ESP8266WiFi.h>                // Thư viện dùng để kết nối WiFi của ESP8266
#include <WebSocketsClient.h>           // Thư viện WebSocketsClient


//cần thay đổi khi chạy
//wifi thư viện tầng 2
const char* ssid = "HaUI Library";         // Tên của mạng WiFi mà bạn muốn kết nối đến
const char* password = "";   // Mật khẩu của mạng WiFi
const char* host="204.0.194.195";

//wifi nhà Phòng
//const char* ssid = "không có tên";
//const char* password = "lich123456"; 
//const char* host="192.168.0.103";
///==================================
const int port=8080;
const int led = 14;                      // Đèn led ở chân GPIO2
const char* ID_AREA="626f391e052757f666bca23c"; //id của khu vực. mỗi khu vực là 1 cái arduino
int c;
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
      Serial.printf("[WSc] get text: %s\n", payload); //idArea;led;status

      c=1;
      for (int i=0; i<strlen(ID_AREA); i++){
        if (ID_AREA[i]!=(char)payload[i]){
           c=c+1; 
           break;
        }
      }
     
      if (c==1){
          if ((int)payload[28]-48 == 1){ //id;led;status
              digitalWrite(((int)payload[25]-48)*10+((int)payload[26]-48), HIGH);
              Serial.printf("Đã bật chân: %d", ((int)payload[25]-48)*10+((int)payload[26]-48));
          } else if((int)payload[28]-48 == 0) {
              digitalWrite(((int)payload[25]-48)*10+((int)payload[26]-48), LOW); 
              Serial.printf("Đã tắt chân: %d", ((int)payload[25]-48)*10+((int)payload[26]-48));
          }
      }else {
            Serial.printf("Adruino chỉ thực hiện cho khu vực 626f391e052757f666bca23c");
            Serial.printf("C: %d", c);
            
      }
      
      break;
    default: 
      Serial.printf("[WSc] get text default: %s\n", payload);
      break;
   
  }
}
