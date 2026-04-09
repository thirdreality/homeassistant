import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
export default {
    zigbeeModel: ['3RPS01083Z'],
    model: '3RPS01083Z',
    vendor: 'Third Reality, Inc',
    description: 'Smart Presence Sensor R2',
    ota: true,
    extend: [
        m.battery(), 
        m.iasZoneAlarm({"zoneType":"generic","zoneAttributes":["alarm_1"]}),
        m.deviceAddCustomCluster("3r24Gradarcluster", {
            ID: 0xff01,
            manufacturerCode: 0x1407,
            attributes: {
                sensorSensitivity: {ID: 0x0060, type: 0x20, write: true, min: 1, max: 5},
                sensorCalibration: {ID: 0x0003, type: 0x20, write: true, min: 1, max: 1},
            },
            commands: {},
            commandsResponse: {},
        }),
        m.enumLookup({
            name: "sensor_calibration",
            lookup: {Press: 1},
            cluster: "3r24Gradarcluster",
            attribute: "sensorCalibration",
            description: "sensor calibration",
            access: "ALL",
        }),
        m.numeric({
            name: "sensor_sensitivity",
            valueMin: 1,
            valueMax: 5,
            cluster: "3r24Gradarcluster",
            attribute: "sensorSensitivity",
            description: "sensor sensitivity",
            access: "ALL",
        }),
    ],
};
