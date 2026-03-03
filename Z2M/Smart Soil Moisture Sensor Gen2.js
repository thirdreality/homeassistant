import * as m from 'zigbee-herdsman-converters/lib/modernExtend';

export default {
    zigbeeModel: ['3RSM0347Z'],
    model: '3RSM0347Z',
    vendor: 'Third Reality, Inc',
    description: 'Smart Soil Moisture Sensor Gen2',
    ota: true,
    extend: [
        m.battery(),
        m.temperature(), 
        m.soilMoisture(),
        m.deviceAddCustomCluster("3rSoilGen2SpecialCluster", {
            ID: 0xff01,
            manufacturerCode: 0x1407,
            attributes: {
                celsiusDegreeCalibration: {ID: 0x0031, type: 0x29, write: true, min: -32768},
                humidityCalibration: {ID: 0x0032, type:0x29, write: true, min: -32768},
                fahrenheitDegreeCalibration: {ID: 0x0033, type: 0x29, write: true, min: -32768},
            },
            commands: {},
            commandsResponse: {},
          }  
        ),
        m.numeric({
            name: "celsius_degree_calibration",
            unit: "°C",
            valueMin: -200,
            valueMax: 200,
            scale: 100,
            cluster: "3rSoilGen2SpecialCluster",
            attribute: "celsiusDegreeCalibration",
            description: "Celsius degree calibration",
            access: "ALL",
        }),
        m.numeric({
            name: "humidity_calibration",
            unit: "%",
            valueMin: -100,
            valueMax: 100,
            scale: 100,
            cluster: "3rSoilGen2SpecialCluster",
            attribute: "humidityCalibration",
            description: "Humidity calibration",
            access: "ALL",
        }),
        m.numeric({
            name: "fahrenheit_degree_calibration",
            unit: "°F",
            valueMin: -200, 
            valueMax: 200,
            scale: 100,
            cluster: "3rSoilGen2SpecialCluster",
            attribute: "fahrenheitDegreeCalibration", 
            description: "Fahrenheit degree calibration",
            access: "ALL",
        }),
    ],
};
