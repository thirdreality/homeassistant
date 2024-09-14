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
    zigbeeModel: ['3RWS18BZ'],
    model: '3RWS18BZ',
    vendor: 'Third Reality',
    description: 'Water sensor',
    fromZigbee: [fz.ias_water_leak_alarm_1, fz.battery],
    toZigbee: [],
    ota: ota.zigbeeOTA,
    exposes: [e.water_leak(), e.battery_low(), e.battery(), e.battery_voltage()],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        device.powerSource = 'Battery';
        device.save();
    },
	extend: [
		deviceAddCustomCluster('THIRD_REALITY_WATER_SENSOR_CLUSTER_ID', {
                ID: 0xff01,
                manufacturerCode: 0x1233,
                attributes: {
                    siren_on_off: {ID: 0x0010, type: 0x20},
                    siren_mintues: {ID: 0x0011, type: 0x20},
                },
                commands: {},
                commandsResponse: {},
            }),
	],
}, ];