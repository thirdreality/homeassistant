import * as m from 'zigbee-herdsman-converters/lib/modernExtend';

export default {
    zigbeeModel: ['3RCB01057Z', '3RCB02070Z', '3RCB1095Z'],
    model: '3RCB01057Z',
    vendor: 'Third Reality',
    description: 'Smart Color Bulb ZL1',
	whiteLabel: [
		{vendor: 'Third Reality', model: '3RCB02070Z', description: 'Smart Color Bulb ZL4', fingerprint: [{modelID: '3RCB02070Z'}]},
		{vendor: 'Third Reality', model: '3RCB1095Z', description: 'Smart Color Bulb ZL2', fingerprint: [{modelID: '3RCB1095Z'}]},
	],
    ota: true,
    extend: [
		m.light({colorTemp: {range: [154, 500]}, color: {modes: ["xy", "hs"], enhancedHue: false}}),
        m.deviceAddCustomCluster("3rColorSpecialCluster", {
            name: "3rColorSpecialCluster",
            ID: 0xff04,
            manufacturerCode: 0x1407,
            attributes: {
				allowBind: {name: "allowBind", ID: 0x0020 , type: 0x20, write: true, max: 1},
            },
            commands: {},
            commandsResponse: {},
        }),
        m.enumLookup({
            name: "start_bind",
            lookup: {StartBind: 1},
            cluster: "3rColorSpecialCluster",
            attribute: "allowBind",
            description: "Start bind the light to the controller",
            access: "ALL",
        }),
    ],
};
    