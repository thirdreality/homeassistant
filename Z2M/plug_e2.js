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
    zigbeeModel: ['3RSPE01044BZ'],
    model: '3RSPE01044BZ',
    vendor: 'Third Reality',
    description: 'Zigbee / BLE smart plug with power',
    fromZigbee: [fz.on_off, fz.electrical_measurement, fz.metering, fz.power_on_behavior],
    toZigbee: [tz.on_off, tz.power_on_behavior],
    ota: ota.zigbeeOTA,
    exposes: [e.switch(), e.power_on_behavior(), e.ac_frequency(), e.power(), e.power_factor(), e.energy(), e.current(), e.voltage()],
    configure: async (device, coordinatorEndpoint) => {
		const endpoint = device.getEndpoint(1);
		await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'haElectricalMeasurement', 'seMetering']);
		await endpoint.read('haElectricalMeasurement', ['acPowerMultiplier', 'acPowerDivisor']);
		await reporting.onOff(endpoint);
		await reporting.activePower(endpoint, {change: 10});
		await reporting.rmsCurrent(endpoint, {change: 50});
		await reporting.rmsVoltage(endpoint, {change: 5});
		await reporting.readMeteringMultiplierDivisor(endpoint);
		endpoint.saveClusterAttributeKeyValue('seMetering', {divisor: 3600000, multiplier: 1});
		endpoint.saveClusterAttributeKeyValue('haElectricalMeasurement', {
			acVoltageMultiplier: 1,
			acVoltageDivisor: 10,
			acCurrentMultiplier: 1,
			acCurrentDivisor: 1000,
			acPowerMultiplier: 1,
			acPowerDivisor: 10,
		});
		device.save();
	},
	extend: [
		deviceAddCustomCluster('THIRD_REALITY_PLUG_E2_CLUSTER_ID', {
			ID: 0xFF03,
			manufacturerCode: 0x1233,
			attributes: {
				reset_summation_delivered: {ID: 0x0000, type: 0x21},
				on_to_off_delay: {ID: 0x0001, type: 0x21},
				off_to_on_delay: {ID: 0x0002, type: 0x21},
			},
			commands: {},
			commandsResponse: {},
		}),
	],
}, ];