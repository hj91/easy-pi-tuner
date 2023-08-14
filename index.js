/***

easy-pi-tuner/index.js  Copyright 2023, Harshad Joshi and Bufferstack.IO Analytics Technology LLP. Pune

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

***/



/**
 * SelfTuningPIController Class
 * 
 * This class implements a Proportional-Integral (PI) controller that self-tunes its gains 
 * based on the system's response to minimize the error over time.
 */
class SelfTuningPIController {
    
    /**
     * Constructs a new SelfTuningPIController.
     * 
     * @param {number} initialKp - Initial proportional gain. Default is 1.0.
     * @param {number} initialKi - Initial integral gain. Default is 0.0.
     * @param {number} dt - Time interval between updates. Default is 1.0.
     */
    constructor(initialKp = 1.0, initialKi = 0.0, dt = 1.0) {
        this.kp = initialKp;
        this.ki = initialKi;
        this.dt = dt;

        // Integral term accumulator
        this.integral = 0;

        // Error from the previous update
        this.previousError = 0;

        // Rate at which the controller adjusts its gains
        this.tuningRate = 0.01; 
    }

    /**
     * Updates the controller based on the setpoint and measured value.
     * 
     * @param {number} setpoint - Desired target value.
     * @param {number} measuredValue - Current value measured from the system.
     * @returns {number} - Control output based on the PI calculation.
     */
    update(setpoint, measuredValue) {
        const error = setpoint - measuredValue;

        // Calculate the proportional term
        const proportional = this.kp * error;

        // Accumulate the integral term
        this.integral += error * this.dt;
        const integral = this.ki * this.integral;

        // Adjust the PI gains based on the system's response
        this.adjustGains(error, this.integral);

        return proportional + integral;
    }

    /**
     * Adjusts the PI gains based on the error and integral of the error.
     * 
     * @param {number} error - Current error.
     * @param {number} integralError - Accumulated error over time.
     */
    adjustGains(error, integralError) {
        // If the current error is greater than the previous error, decrease the proportional gain
        // Otherwise, increase the proportional gain
        if (Math.abs(error) > Math.abs(this.previousError)) {
            this.kp -= this.tuningRate;
        } else {
            this.kp += this.tuningRate;
        }

        // If the accumulated error is greater than the previous accumulated error, decrease the integral gain
        // Otherwise, increase the integral gain
        if (Math.abs(integralError) > Math.abs(this.previousError * this.dt)) {
            this.ki -= this.tuningRate;
        } else {
            this.ki += this.tuningRate;
        }

        // Update the previous error for the next iteration
        this.previousError = error;
    }
}

// Export the class for use in other modules
module.exports = SelfTuningPIController;

