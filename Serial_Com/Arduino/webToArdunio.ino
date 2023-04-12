#include <Arduino_JSON.h>

const int analogInPin = A0;  
bool active = true;

long sensorValue = 0;  
long outputValue = 0;
long poti;  

const int redPin = 5;
const int greenPin = 6;
const int bluePin = 7;

JSONVar serialOutput;

void setup() {

  Serial.begin(9600);

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

}

void loop() {

  while (Serial.available() > 0) {

    // look for the next valid integer in the incoming serial stream:
    int red = Serial.parseInt();
    // do it again:
    int green = Serial.parseInt();
    // do it again:
    int blue = Serial.parseInt();

    // look for the newline. That's the end of your sentence:
    if (Serial.read() == '\n') {
      // constrain the values to 0 - 255 and invert
      // if you're using a common-cathode LED, just use "constrain(color, 0, 255);"
      red = 255 - constrain(red, 0, 255);
      green = 255 - constrain(green, 0, 255);
      blue = 255 - constrain(blue, 0, 255);

      // fade the red, green, and blue legs of the LED:
      analogWrite(redPin, red);
      analogWrite(greenPin, green);
      analogWrite(bluePin, blue);

      // print the three numbers in one string as hexadecimal:
    }
  }
    if (Serial.available() > 0) { 
      String jsonString = Serial.readStringUntil("\n");
      if (jsonString != '\n') {
        JSONVar serialInput = JSON.parse(jsonString);

        if (JSON.typeof(serialInput) == "undefined") {
          Serial.println("JSON parsing failed!");
        } else {
        active = (bool) serialInput["active"];
        }
      }
    }

  if (active) {

    sensorValue = analogRead(analogInPin);
    
    outputValue = map(sensorValue, 0, 1023, 0, 255);
    serialOutput["poti"] = outputValue;
    
    Serial.println(serialOutput);
  }
}
