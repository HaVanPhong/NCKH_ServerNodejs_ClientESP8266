#include <ESP8266WiFi.h>                // Thư viện dùng để kết nối WiFi của ESP8266
#include <WebSocketsClient.h>           // Thư viện WebSocketsClient
#include <Wire.h>
#include "rgb_lcd.h"

//cần thay đổi khi chạy
//wifi  
//  const char* ssid = "NVIDIA GeForce RTX 3090";         // Tên của mạng WiFi mà bạn muốn kết nối đến
//const char* password = "phatwifichoTuAnhbatke";   // Mật khẩu của mạng WiFi


//wifi nhà Phòng
const char* ssid = "không có tên";
const char* password = "lich123456"; 
///==================================
const char* host="socket.havanphong.tk";
const int port=80;
///==================================
const int led1 = 0;
const int led2 = 2;
//const int led3 = 4;
//const int led4 = 5;
const int led5 = 12;
const int led6 = 14;
const int led7 = 16;                      // Đèn led ở chân GPIO2
  const char* ID_AREA="6283dc8b6567fe4790424f03"; //id của khu vực. mỗi khu vực là 1 cái arduino
int c;
WebSocketsClient webSocket;

//lcd
rgb_lcd lcd;

const int colorR = 0;
const int colorG = 0;
const int colorB = 255;

void setup() {
  lcd.begin(16, 2);

  lcd.setRGB(colorR, colorG, colorB);

  // Print a message to the LCD.
  lcd.print("NCKH: IoT ...");
  lcd.setCursor(0, 1);
  lcd.print("Already...");

  
  Serial.begin(9600);                 // Khởi tạo kết nối Serial để truyền dữ liệu đến máy tính
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
//  pinMode(led3, OUTPUT);
//  pinMode(led4, OUTPUT);
//cảm biến chạm
//  pinMode (led3, INPUT_PULLUP);
//  pinMode(led4, OUTPUT);

  pinMode(led5, OUTPUT);
  pinMode(led6, OUTPUT);
  pinMode(led7, OUTPUT);

  
//  
  startWiFi();
  webSocket.begin(host, port, "/"); 
  
}
void loop() {
//if (digitalRead (led3) == LOW)   // NẾU CẢM BIẾN Ở MỨC THẤP
//{
//digitalWrite (led4, HIGH); // THÌ CHÂN ĐÈN Ở MỨC CAO ( BẬT ĐÈN)
//}
//else
//digitalWrite (led4, LOW); // NGƯỢC LẠI THÌ ĐÈN TẮT

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
              Serial.printf("Turn on led: %d", ((int)payload[25]-48)*10+((int)payload[26]-48));
              lcd.setCursor(0, 1);
              lcd.print("              ");
              lcd.setCursor(0, 1);
              lcd.print("Led on: ");
              lcd.setCursor(8, 1);
              lcd.print(((int)payload[25]-48)*10+((int)payload[26]-48));
          } else if((int)payload[28]-48 == 0) {
              digitalWrite(((int)payload[25]-48)*10+((int)payload[26]-48), LOW); 
              Serial.printf("Turn off led: %d", ((int)payload[25]-48)*10+((int)payload[26]-48));
              lcd.setCursor(0, 1);
              lcd.print("              ");
              lcd.setCursor(0, 1);
              lcd.print("Led off: ");
              lcd.setCursor(9, 1);
              lcd.print(((int)payload[25]-48)*10+((int)payload[26]-48));
          }
      }else {
            Serial.printf("Adruino just work with area: 626f391e052757f666bca23c");
            Serial.printf("C: %d", c);
            
      }
      
      break;
    default: 
      Serial.printf("[WSc] get text default: %s\n", payload);
      break;
   
  }
}
