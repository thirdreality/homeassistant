import * as m from 'zigbee-herdsman-converters/lib/modernExtend';

export default {
    zigbeeModel: ['3RWK0148Z'],
    model: '3RWK0148Z',
    vendor: 'Third Reality, Inc',
    ota: true,
    description: "Smart watering kit",
    extend: [
        m.battery({percentage: true, voltage: true, lowStatus: true, percentageReporting: true}),
        m.onOff({powerOnBehavior: false}),
        m.iasZoneAlarm({
            zoneType: "generic",
            zoneAttributes: ["alarm_1"],
            description: "Water shortage warning",
        }),
        m.deviceAddCustomCluster("3rWateringSpecialCluster", {
            ID: 0xfff2,
            manufacturerCode: 0x1407,
            attributes: {
                wateringTimes: {ID: 0x0000, type: 0x21, write: true, min: 1, max: 1800},
                intervalDay: {ID: 0x0001, type: 0x20, write: true, min: 0, max: 30},
            },
            commands: {},
            commandsResponse: {},
        }),
        m.numeric({
            name: "watering_times",
            cluster: "3rWateringSpecialCluster",
            attribute: "wateringTimes",
            valueMin: 1,
            valueMax: 1800,
            unit: "s",
            description: "watering times",
            access: "ALL",
        }),
        m.numeric({
            name: "interval_day",
            cluster: "3rWateringSpecialCluster",
            attribute: "intervalDay",
            valueMin: 0,
            valueMax: 30,
            unit: "Day",
            description: "interval day",
            access: "ALL",
        }),
    ],
};
