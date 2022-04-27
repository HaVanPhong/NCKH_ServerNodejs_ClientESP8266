package com.example.nckh_client_app_android;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;

public class MainActivity extends AppCompatActivity {
    String name;
    WebSocket webSocket;
    String SERVER_PATH = "ws://SERVER-IP-HERE:PORT-NUMBER-HERE";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initiateSocketConnection();






    }
    private void initiateSocketConnection() {

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(SERVER_PATH).build();
        webSocket = client.newWebSocket(request, new SocketListener());

    }

    private class SocketListener extends WebSocketListener {

        @Override
        public void onOpen(WebSocket webSocket, Response response) {
            super.onOpen(webSocket, response);

            runOnUiThread(() -> {
                Toast.makeText(MainActivity.this,
                        "Socket Connection Successful!",
                        Toast.LENGTH_SHORT).show();

//                initializeView();
            });

        }

        @Override
        public void onMessage(WebSocket webSocket, String text) {
            super.onMessage(webSocket, text);

            runOnUiThread(() -> {

                try {
                    JSONObject jsonObject = new JSONObject(text);
                    jsonObject.put("isSent", false);


                } catch (JSONException e) {
                    e.printStackTrace();
                }

            });

        }
    }

}