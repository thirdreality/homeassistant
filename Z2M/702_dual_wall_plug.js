const {} = require('zigbee-herdsman-converters/lib/modernExtend');
// Add the lines below
const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const ota = require('zigbee-herdsman-converters/lib/ota');
const utils = require('zigbee-herdsman-converters/lib/utils');
const globalStore = require('zigbee-herdsman-converters/lib/store');
const e = exposes.presets;
const ea = exposes.access;
const {deviceAddCustomCluster} = require('zigbee-herdsman-converters/lib/modernExtend');
const m = require('zigbee-herdsman-converters/lib/modernExtend');

module.exports = [{
    zigbeeModel: ['3RDP01072Z', '3RWP01073Z'],
    model: '3RDP01072Z',
    vendor: 'Third Reality',
    description: 'Smart Dual Plug ZP1',
	ota: true,
	whiteLabel: [
		{vendor: 'Third Reality', model: '3RWP01073Z', description: 'Smart Wall Plug ZW1', fingerprint: [{modelID: '3RWP01073Z'}]},
	],
	extend: [
		m.deviceEndpoints({endpoints: {left: 1, right: 2}}),
		m.onOff({endpointNames: ["left", "right"]}),
		m.electricityMeter({acFrequency: false, powerFactor: true, endpointNames: ["left", "right"], energy: {divisor: 1000, multiplier: 1}}),
		m.deviceAddCustomCluster('3rPlugSpecialCluster', {
            ID: 0xFF03,
            manufacturerCode: 0x1407,
            attributes: {
                resetSummationDelivered: {ID: 0x0000, type: 0x20},
				onToOffDelay: {ID: 0x0001, type: 0x21},
				offToOnDelay: {ID: 0x0002, type: 0x21},
				allowBind: {ID: 0x0020  , type: 0x20},
                //off_to_on_delay: {ID: 0x0002, type: 0x21},
            },
            commands: {},
            commandsResponse: {},
        }),
	],
}, ];