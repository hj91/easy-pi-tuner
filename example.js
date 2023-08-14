//easy-pid-tuner/example.js - (c) Harshad Joshi @ Bufferstack.IO Analytics Technology LLP, Pune

// Import the SelfTuningPIController from the module
const SelfTuningPIController = require('./index.js');

// Mock functions simulating a temperature control system. Use your modbus or opcua library to read actual values using this 
function readTemperatureSensor() {
    return 20 + Math.random() * 2; 
}

// convert the control output of a PI controller to a Pulse Width Modulation (PWM) signal 
function convertToPWM(controlOutput) {
    return Math.min(Math.max(Math.round(controlOutput), 0), 255);
}

function controlHeater(pwmSignal) {
    console.log(`Heater PWM signal set to: ${pwmSignal}`);
}

// Example application
const controller = new SelfTuningPIController();
const desiredTemperature = 23;

setInterval(() => {
    const currentTemperature = readTemperatureSensor();
    console.log(`Current Temperature: ${currentTemperature}°C`);

    const controlOutput = controller.update(desiredTemperature, currentTemperature);
    const pwmSignal = convertToPWM(controlOutput);
    controlHeater(pwmSignal);

    console.log(`Controller Gains - Kp: ${controller.kp.toFixed(2)}, Ki: ${controller.ki.toFixed(2)}\n`);
}, 1000);

