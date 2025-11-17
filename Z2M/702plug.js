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
    zigbeeModel: ['3RSPE02065Z', '3RSPU01080Z', '3RSP02064Z'],
    model: '3RSPE02065Z',
    vendor: 'Third Reality',
    description: 'Zigbee / BLE smart 702 e3 plug with power',
	whiteLabel: [
		{vendor: 'Third Reality', model: '3RSP02064Z', description: 'Zigbee / BLE smart 702 gen3 plug with power', fingerprint: [{modelID: '3RSP02064Z'}]},
		{vendor: 'Third Reality', model: '3RSPU01080Z', description: 'Zigbee / BLE smart 702 uk plug with power', fingerprint: [{modelID: '3RSPU01080Z'}]},
	],
	ota: true,
	extend: [
		m.onOff(), 
		m.electricityMeter({acFrequency: true, powerFactor: true}),
		m.deviceAddCustomCluster('3r702PlugSpecialCluster', {
            ID: 0xFF03,
            manufacturerCode: 0x1407,
            attributes: {
                resetSummationDelivered: {ID: 0x0000, type: 0x20},
                off_to_on_delay: {ID: 0x0002, type: 0x21},
				on_to_off_delay: {ID: 0x0001, type: 0x21},
                allowBind: {ID: 0x0020  , type: 0x20},
                power_up_value: {ID: 0x0040, type: 0x21},
                power_down_value: {ID: 0x0041, type: 0x21},
            },
            commands: {},
            commandsResponse: {},
        }),
		],
}, ];