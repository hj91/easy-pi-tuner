// easy-pid-tuner/self-tuning-controller.js

const SelfTuningPIController = require('easy-pid-tuner');

// Example usage
const controller = new SelfTuningPIController();
const setpoint = 100;
let currentTemperature = 20;

for (let i = 0; i < 10; i++) {
    const controlOutput = controller.update(setpoint, currentTemperature);
    console.log(`Iteration ${i + 1}: Control Output = ${controlOutput}, Kp = ${controller.kp}, Ki = ${controller.ki}`);

    // Simulate the effect of the control output on the system
    currentTemperature += controlOutput * 0.1;
}

