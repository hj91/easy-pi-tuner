# easy-pi-tuner

A Proportional-Integral (PI) controller that self-tunes its gains based on the system's response to minimize the error over time.

## Design Philosophy

Traditional PI controllers rely on fixed gains that are manually tuned based on empirical testing or system analysis. While these controllers are effective in many scenarios, they may not adapt well to systems with changing dynamics or external disturbances.

The `easy-pi-tuner` is designed to address this limitation. By dynamically adjusting its gains based on the system's response, it can adapt to varying conditions, potentially offering more robust control in diverse scenarios.

## Working

The `SelfTuningPIController` class calculates the control output based on the difference between the setpoint (desired value) and the measured value. The control output is a combination of:

- **Proportional Term**: Proportional to the current error.
- **Integral Term**: Accumulates the error over time.

The unique feature of this controller is its ability to adjust the proportional (Kp) and integral (Ki) gains dynamically. If the error increases, the gains are adjusted to try to reduce the error, and vice versa.

## Applications

The `easy-pi-tuner` can be beneficial in:

- **Systems with Changing Dynamics**: For systems where the dynamics change over time, such as processes that have different phases or stages.
- **Noisy Environments**: In scenarios where there's a lot of external disturbances or noise, the controller can adapt its gains to maintain control.
- **Situations where Manual Tuning is Challenging**: In complex systems where manual tuning is difficult or time-consuming.

## Installation

```bash
npm install easy-pi-tuner
```

## Usage

To use the `SelfTuningPIController`, first import the module:

```javascript
const SelfTuningPIController = require('easy-pi-tuner');
```

Then, create a new instance of the controller:

```javascript
const controller = new SelfTuningPIController();
```

You can set desired values and update the controller based on measured values:

```javascript
const desiredValue = 100; // Example setpoint
const measuredValue = 90; // Example current value

const controlOutput = controller.update(desiredValue, measuredValue);
```

The `controlOutput` can then be used to control your system, and the controller will automatically adjust its gains based on the system's response.

## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for details.

## Example 

Check example.js included with this module

## Author

Harshad Joshi @ Bufferstack.IO Analytics Technology LLP, Pune
