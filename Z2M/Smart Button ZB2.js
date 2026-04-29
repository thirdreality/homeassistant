import * as m from 'zigbee-herdsman-converters/lib/modernExtend';

export default{
    zigbeeModel: ["3RSB01085Z"],
    model: "3RSB01085Z",
    vendor: "Third Reality",
    description: "Smart button",
    // fromZigbee: [fz.itcmdr_clicks],
    ota: true,
    // exposes: [e.action(["single", "double", "hold", "release"])],
    extend: [
        m.deviceEndpoints({endpoints: {1: 1, 2: 2, 3: 3}}),
        m.actionEnumLookup({
            endpointNames: ["1", "2", "3"],
            // endpointNames: ["left"],
            cluster: "genMultistateInput",
            attribute: "presentValue",
            actionLookup: {release: 255, single: 1, double: 2, send: 2, hold: 0},
        }),
        m.identify(),
        m.battery(),
    ],
};
    