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
    zigbeeModel: ['3RMS16BZ'],
    model: '3RMS16BZ',
    vendor: 'Third Reality',
    description: 'Wireless motion sensor',
    fromZigbee: [fz.ias_occupancy_alarm_1, fz.battery],
    toZigbee: [],
    ota: ota.zigbeeOTA,
    exposes: [e.occupancy(), e.battery_low(), e.battery(), e.battery_voltage()],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        device.powerSource = 'Battery';
        device.save();
    },
	extend: [
		deviceAddCustomCluster('THIRD_REALITY_MOTION_DELAY_CLUSTER_ID', {
			ID: 0xff01,
			manufacturerCode: 0x1233,
			attributes: {
				cool_down_time: {ID: 0x0001, type: 0x21},
			},
			commands: {},
			commandsResponse: {},
		}),
	],
}, ];