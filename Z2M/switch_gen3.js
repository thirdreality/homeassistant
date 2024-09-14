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

module.exports = [{
    zigbeeModel: ['3RSS009Z'],
    model: '3RSS009Z',
    vendor: 'Third Reality',
    description: 'Smart switch Gen3',
    fromZigbee: [fz.on_off, fz.battery],
    toZigbee: [tz.on_off, tz.ignore_transition],
    ota: ota.zigbeeOTA,
    exposes: [e.switch(), e.battery(), e.battery_voltage()],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        device.powerSource = 'Battery';
        device.save();
    },
	extend: [
		deviceAddCustomCluster('THIRD_REALITY_SWITCH_GEN3_CLUSTER_ID', {
			ID: 0xff02,
			manufacturerCode: 0x1233,
			attributes: {
				back_on: {ID: 0x0001, type: 0x21},
				back_off: {ID: 0x0002, type: 0x21},
			},
			commands: {},
			commandsResponse: {},
		}),
	],
}, ];