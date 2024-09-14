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
    zigbeeModel: ['3RSB015BZ'],
    model: '3RSB015BZ',
    vendor: 'Third Reality',
    description: 'Roller blind motor',
    fromZigbee: [fz.cover_position_tilt, fz.battery],
    toZigbee: [tz.cover_state, tz.cover_position_tilt],
    ota: ota.zigbeeOTA,
	exposes: [e.cover_position(), e.battery()],
	extend: [
		deviceAddCustomCluster('THIRD_REALITY_BLIND_DELAY_CLUSTER_ID', {
			ID: 0xFFF1,
			manufacturerCode: 0x1233,
			attributes: {
				infrared_off: {ID: 0x0000, type: 0x20}, 
			},
			commands: {},
			commandsResponse: {},
		}),
	],
}, ];