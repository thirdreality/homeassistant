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
    zigbeeModel: ['3RSP019BZ'],
    model: '3RSP019BZ',
    vendor: 'Third Reality',
    description: 'Zigbee / BLE smart plug',
    ota: ota.zigbeeOTA,
    fromZigbee: [fz.on_off, fz.electrical_measurement, fz.metering, fz.power_on_behavior],
    exposes: [e.switch(), e.power_on_behavior(), e.ac_frequency(), e.power(), e.power_factor(), e.energy(), e.current(), e.voltage()],
    toZigbee: [tz.on_off, tz.power_on_behavior],
	extend: [
        deviceAddCustomCluster('3rSwitchGen3SpecialCluster', {
            ID: 0xFF03,
            manufacturerCode: 0x1233,
            attributes: {
                on_to_off_delay: {ID: 0x0001, type: 0x21},
                off_to_on_delay: {ID: 0x0002, type: 0x21},
            },
            commands: {},
            commandsResponse: {},
        }),
    ],
}, ];