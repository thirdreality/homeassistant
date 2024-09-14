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
    zigbeeModel: ['3RVS01031Z'],
    model: '3RVS01031Z',
    vendor: 'Third Reality',
    description: 'Zigbee vibration sensor',
    fromZigbee: [fz.ias_vibration_alarm_1, fz.battery ],
    toZigbee: [],
    ota: ota.zigbeeOTA,
    exposes: [e.vibration(), e.battery_low(), e.battery(), e.battery_voltage(), e.x_axis(), e.y_axis(), e.z_axis()],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        device.powerSource = 'Battery';
        device.save();
    },
	extend: [
		deviceAddCustomCluster('THIRD_REALITY_VIBRATE_DELAY_CLUSTER_ID', {
			ID: 0xfff1,
			manufacturerCode: 0x1233,
			attributes: {
				cool_down_time: {ID: 0x0004, type: 0x21},
                x_axis: {ID: 0x0001, type: 0x21},
                y_axis: {ID: 0x0002, type: 0x21},
                Z_axis: {ID: 0x0003, type: 0x21},
			},
			commands: {},
			commandsResponse: {},
		}),
	],
}, ];