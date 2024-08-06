#include <ArduinoJson.h>

#define COM_ID 0
#define DAQ_ID 1
#define FLIGHT_ID 2



bool PRESS_DEBUG = false;  // Simulate LOX and Eth fill.
bool STATE_DEBUG = false;  // run through states manually
bool WIFIDEBUG = true;     // Don't send/receive data.

#define SIMULATION_DELAY 25

// MODEL DEFINED PARAMETERS FOR TEST/HOTFIRE. Pressures in psi //
float pressureFuel = 495;  //495;  // Set pressure for fuel
float pressureOx = 465;    //465;  // Set pressure for lox
float threshold = 0.98;    // re-psressurrization threshold (/1x)
float ventTo = 5;          // c2se solenoids at this pressure to preserve lifetime.
#define abortPressure 700  // Cutoff pressure to automatically trigger abort
// refer to https://docs.google.com/spreadsheets/d/17NrJWC0AR4Gjejme-EYuIJ5uvEJ98FuyQfYVWI3Qlio/edit#gid=1185803967 for all pinouts



int time_send = 0;
int period = 300;


//::::::STATE VARIABLES::::::://
enum STATES { IDLE,
              ARMED,
              PRESS,
              QD,
              IGNITION,
              HOTFIRE,
              ABORT };

String state_names[] = { "Idle", "Armed", "Press", "QD", "Ignition", "HOTFIRE", "Abort" };

int DAQState = IDLE;
int COMState = IDLE;
int FlightState = IDLE;

bool ethComplete = false;
bool oxComplete = false;
bool oxVentComplete = false;
bool ethVentComplete = false;

int hotfireStart;

#define SEND_DELAY 20

bool flight_toggle = false;

// Structure example to send data.
// Must match the receiver structure.
struct struct_pt_offsets {
  bool PT_O1_set;
  bool PT_O2_set;
  bool PT_E1_set;
  bool PT_E2_set;
  bool PT_C1_set;
  bool PT_X_set;

  int PT_O1_offset;
  int PT_O2_offset;
  int PT_E1_offset;
  int PT_E2_offset;
  int PT_C1_offset;
  int PT_X_offset;
};

struct struct_readings {
  float PT_O1;
  float PT_O2;
  float PT_E1;
  float PT_E2;
  float PT_C1;
  float PT_X;
  int TC_1;
  int TC_2;
  int TC_3;
  int TC_4;
};

struct struct_message {
  int messageTime;
  int sender;
  int COMState;
  int DAQState;
  int FlightState;
  bool AUTOABORT;

  short int FlightQueueLength;
  bool ethComplete;
  bool oxComplete;
  bool oxVentComplete;
  bool ethVentComplete;
  bool sdCardInitialized;

  struct_readings filteredReadings;
  struct_readings rawReadings;
  struct_pt_offsets pt_offsets;
};


bool newTxData = false;

// Struct that holds data being sent out
struct_message outgoingData;

// IMPORTANT
JsonDocument json_writeout;

const byte startMarker = 255;
const byte txDataLen = sizeof(outgoingData);

unsigned long prevUpdateTime = 0;
unsigned long updateInterval = 500;

// #include <SoftwareSerial.h>
// SoftwareSerial sendSerial(6,7); // Rx and Tx NAMED sendSerial

void setup() {
  Serial.begin(115200);
  // Serial.setRxBufferSize(txDataLen);
  Serial.println("\nStarting SerialStructSend.ino\n");

  // set up Serial for communication
  // sendSerial.begin(9600); // to match SoftwareSerial on Uno
  initValues();
  // Serial.println(outgoingData.sdCardInitialized);
}



void loop() {
  // Serial.println("pending...");
  // this function updates the data in txData
  updateDataToSend();
  // this function sends the data if one is ready to be sent
  transmitData();
}

void transmitData() {

  if (newTxData == true) {
    json_writeout["messageTime"] = outgoingData.messageTime;
    json_writeout["sender"] = outgoingData.sender;
    json_writeout["COMState"] = outgoingData.COMState;
    json_writeout["DAQState"] = outgoingData.DAQState;
    json_writeout["FlightState"] = outgoingData.FlightState;
    json_writeout["AUTOABORT"] = outgoingData.AUTOABORT;
    json_writeout["FlightQueueLength"] = outgoingData.FlightQueueLength;
    json_writeout["ethComplete"] = outgoingData.ethComplete;
    json_writeout["oxComplete"] = outgoingData.oxComplete;
    json_writeout["oxVentComplete"] = outgoingData.oxVentComplete;
    json_writeout["ethVentComplete"] = outgoingData.ethVentComplete;
    json_writeout["sdCardInitialized"] = outgoingData.sdCardInitialized;

    json_writeout["PT_O1"] = outgoingData.filteredReadings.PT_O1;
    json_writeout["PT_O2"] = outgoingData.filteredReadings.PT_O2;
    json_writeout["PT_E1"] = outgoingData.filteredReadings.PT_E1;
    json_writeout["PT_E2"] = outgoingData.filteredReadings.PT_E2;
    json_writeout["PT_C1"] = outgoingData.filteredReadings.PT_C1;
    json_writeout["PT_X"] = outgoingData.filteredReadings.PT_X ;

    json_writeout["TC_1"] = outgoingData.filteredReadings.TC_1;
    json_writeout["TC_2"] = outgoingData.filteredReadings.TC_2;
    json_writeout["TC_3"] = outgoingData.filteredReadings.TC_3;
    json_writeout["TC_4"] = outgoingData.filteredReadings.TC_4;


    json_writeout["PT_O1_set"] = outgoingData.pt_offsets.PT_O1_set;
    json_writeout["PT_O1_set"] = outgoingData.pt_offsets.PT_O1_set;
    json_writeout["PT_O2_set"] = outgoingData.pt_offsets.PT_O2_set;
    json_writeout["PT_E1_set"] = outgoingData.pt_offsets.PT_E1_set;
    json_writeout["PT_E2_set"] = outgoingData.pt_offsets.PT_E2_set;
    json_writeout["PT_C1_set"] = outgoingData.pt_offsets.PT_C1_set;
    json_writeout["PT_X_set"] = outgoingData.pt_offsets.PT_X_set;

    json_writeout["PT_O1_offset"] = outgoingData.pt_offsets.PT_O1_offset;
    json_writeout["PT_O2_offset"] = outgoingData.pt_offsets.PT_O2_offset;
    json_writeout["PT_E1_offset"] = outgoingData.pt_offsets.PT_E1_offset;
    json_writeout["PT_E2_offset"] = outgoingData.pt_offsets.PT_E2_offset;
    json_writeout["PT_C1_offset"] = outgoingData.pt_offsets.PT_C1_offset;
    json_writeout["PT_X_offset"] = outgoingData.pt_offsets.PT_X_offset;

    serializeJson(json_writeout, Serial);
    Serial.print('\n');

    newTxData = false;
  }
}

void updateDataToSend() {
  if (millis() - prevUpdateTime >= updateInterval) {
    prevUpdateTime = millis();
    if (newTxData == false) {  // ensure previous message has been sent

      outgoingData.messageTime = millis();
      outgoingData.sender = !DAQ_ID;
      outgoingData.COMState = ARMED;
      outgoingData.DAQState = PRESS;
      outgoingData.ethComplete = !ethComplete;
      outgoingData.oxComplete = !oxComplete;
      outgoingData.oxVentComplete = !oxVentComplete;
      outgoingData.ethVentComplete = !ethVentComplete;

      outgoingData.filteredReadings.PT_O1 = outgoingData.filteredReadings.PT_O1 + 0.2;
      outgoingData.filteredReadings.PT_O2 = outgoingData.filteredReadings.PT_O2 - 0.2;
      outgoingData.filteredReadings.PT_E1 = outgoingData.filteredReadings.PT_E1 + 0.42;
      outgoingData.filteredReadings.PT_E2 = outgoingData.filteredReadings.PT_E2 - 0.5631;
      outgoingData.filteredReadings.PT_C1 = outgoingData.filteredReadings.PT_C1 - 0.01;
      outgoingData.filteredReadings.PT_X  = outgoingData.filteredReadings.PT_X  + 0.96752;

      newTxData = true;
    }
  }
}

void initValues() {
  outgoingData.messageTime = millis();
  outgoingData.sender = 43;
  outgoingData.COMState = IDLE;
  outgoingData.DAQState = IDLE;
  outgoingData.FlightState = IDLE;
  outgoingData.AUTOABORT = false;
  outgoingData.FlightQueueLength = 1;
  outgoingData.ethComplete = 0;
  outgoingData.oxComplete = 0;
  outgoingData.oxVentComplete = 0;
  outgoingData.ethVentComplete = 0;
  outgoingData.sdCardInitialized = 1;


  outgoingData.filteredReadings.PT_O1 = 24.6;
  outgoingData.filteredReadings.PT_O2 = 24.7;
  outgoingData.filteredReadings.PT_E1 = 24.8;
  outgoingData.filteredReadings.PT_E2 = 24.9;
  outgoingData.filteredReadings.PT_C1 = 24.10;
  outgoingData.filteredReadings.PT_X = 24.11;

  outgoingData.filteredReadings.TC_1 = 1;
  outgoingData.filteredReadings.TC_2 = 2;
  outgoingData.filteredReadings.TC_3 = 3;
  outgoingData.filteredReadings.TC_4 = 4;

  outgoingData.pt_offsets.PT_O1_set = false;
  outgoingData.pt_offsets.PT_O1_set = true;
  outgoingData.pt_offsets.PT_O2_set = true;
  outgoingData.pt_offsets.PT_E1_set = true;
  outgoingData.pt_offsets.PT_E2_set = true;
  outgoingData.pt_offsets.PT_C1_set = true;
  outgoingData.pt_offsets.PT_X_set = true;

  outgoingData.pt_offsets.PT_O1_offset = 4;
  outgoingData.pt_offsets.PT_O2_offset = 5;
  outgoingData.pt_offsets.PT_E1_offset = 6;
  outgoingData.pt_offsets.PT_E2_offset = 7;
  outgoingData.pt_offsets.PT_C1_offset = 8;
  outgoingData.pt_offsets.PT_X_offset = 9;
}
