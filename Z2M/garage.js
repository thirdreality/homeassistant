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
    zigbeeModel: ['3RDTS01056Z'],
    model: '3RDTS01056Z',
    vendor: 'Third Reality',
    description: 'Garage door tilt sensor',
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
		deviceAddCustomCluster('THIRD_REALITY_GARAGE_DELAY_CLUSTER_ID', {
			ID: 0xff01,
			manufacturerCode: 0x1407,
			attributes: {
				DELAY_OPEN_ATTR_ID: {ID: 0x0000, type: 0x21},
				ZCL_CABRATION_ATTR_ID: {ID: 0x0003, type: 0x21},
			},
			commands: {},
			commandsResponse: {},
		}),
	],
}, ];