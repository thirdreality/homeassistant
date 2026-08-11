import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import {Zcl} from 'zigbee-herdsman';

const manufacturerCode = 0x1407;
const manufacturerOptions = {manufacturerCode, disableDefaultResponse: true, disableResponse: true};

export default {
    zigbeeModel: ['3RMS26Z'],
    model: '3RMS26Z',
    vendor: 'Third Reality, Inc',
    description: 'Smart PIR Sensor Gen2',
    ota: true,
    extend: [
        m.iasZoneAlarm({zoneType: "occupancy", zoneAttributes: ["alarm_1", "tamper"]}), 
        m.battery(),
        m.illuminance(),
        m.deviceAddCustomCluster("3rMotionSpecialCluster", {
            name: "3rMotionSpecialCluster",
            ID: 0xff01,
            manufacturerCode: manufacturerCode,
            attributes: {
                sensitivity: {
                    name: "sensitivity",
                    ID: 0x0000,
                    type: Zcl.DataType.UINT8,
                    write: true,
                    min: 1,
                    max: 5,
                    defaultValue: 3
                },
                coolDownTime: {
                    name: "coolDownTime",
                    ID: 0x0001,
                    type: Zcl.DataType.UINT16,
                    write: true,
                    max: 3600,
                },
                ledIndicator: {
                    name: "ledIndicator",
                    ID: 0x0002,
                    type: Zcl.DataType.UINT8,
                    write: true,
                    min: 0,
                    max: 1
                },
            },
            commands: {},
            commandsResponse: {},
        }),
        m.numeric({
            name: "sensitivity",
            valueMin: 1,
            valueMax: 5,
            valueDefault: 3,
            cluster: "3rMotionSpecialCluster",
            attribute: "sensitivity",
            description: "PIR sensor sensitivity level (1-5, default 3)",
            access: "ALL",
            zigbeeCommandOptions: manufacturerOptions,
        }),
        m.numeric({
            name: "cooldown",
            unit: "s",
            valueMin: 0,
            valueMax: 3600,
            valueDefault: 30,
            cluster: "3rMotionSpecialCluster",
            attribute: "coolDownTime",
            description: "Cooldown time between motion detections in seconds (0-3600s, default 30s)",
            access: "ALL",
            zigbeeCommandOptions: manufacturerOptions,
        }),
        m.binary({
            name: "led_indicator",
            valueOn: ["ON", 1],
            valueOff: ["OFF", 0],
            cluster: "3rMotionSpecialCluster",
            attribute: "ledIndicator",
            description: "Turn LED indicator on/off",
            access: "ALL",
            zigbeeCommandOptions: manufacturerOptions,
        }),
    ],
};
