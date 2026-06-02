import * as m from "zigbee-herdsman-converters/lib/modernExtend";

export default {
    zigbeeModel: ["3RAQ1096Z"],
    model: "3RAQ1096Z",
    vendor: "Third Reality, Inc",
    description: "Smart Air Quality Sensor",
    ota: true,
    extend: [
        m.temperature(),
        m.humidity(),
        m.co2(),
        m.deviceAddCustomCluster("3rAirQualitySensorCluster", {
            name: "3rAirQualitySensorCluster",
            ID: 0x042e,
            manufacturerCode: 0x1407,
            attributes: {
                vocIndex: {
                    name: "vocIndex",
                    ID: 0x0100,
                    type: 0x23,
                    write: false,
                    max: 0xffffffff,
                },
            },
            commands: {},
            commandsResponse: {},
        }),
        m.numeric({
            name: "voc_index",
            cluster: "3rAirQualitySensorCluster",
            attribute: "vocIndex",
            unit: "VOC Index points",
            description: "Measured VOC Index",
            access: "STATE_GET",
        }),
    ],
};
