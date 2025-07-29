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
    zigbeeModel: ['3RSM0147Z'],
    model: '3RSM0147Z',
    vendor: 'Third Reality',
    description: 'Soil sensor',
    ota: true,
    extend: [
        m.temperature(),
        m.soilMoisture(),
        m.battery(),
        m.deviceAddCustomCluster("3rSoilSpecialCluster", {
            ID: 0xff01,
            manufacturerCode: 0x1407,
            attributes: {
                celsiusDegreeCalibration: {ID: 0x0031, type: 0x29},
                humidityCalibration: {ID: 0x0032, type: 0x29},
                fahrenheitDegreeCalibration: {ID: 0x0033, type: 0x29},
            },
            commands: {},
            commandsResponse: {},
        }),
    ],
}, ];
    