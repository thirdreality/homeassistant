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
    fromZigbee: [fz.temperature, fz.humidity, fz.soil_moisture, fz.battery],
    exposes: (device) => {
        const exps = [];
        const version = device?.applicationVersion || 0;
        if (version < 39) {
            exps.push(e.humidity());
        } else {
            exps.push(e.soil_moisture().withDescription('Soil Moisture'));
        }
        exps.push(e.temperature());
        exps.push(e.battery());
        return exps;
    },
    ota: true,
    extend: [
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
    configure: async (device, coordinatorEndpoint) => {
        const endpoint = device.getEndpoint(1);

        const version = device?.applicationVersion || 0;
        if (version < 39) {
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'msTemperatureMeasurement', 'msRelativeHumidity']);
            await reporting.humidity(endpoint, {min: 10, max: 3600, change: 100});
        } else {
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'msTemperatureMeasurement', 'msSoilMoisture']);
            await reporting.soil_moisture(endpoint, {min: 10, max: 3600, change: 100});
        }
        await reporting.batteryPercentageRemaining(endpoint);
        await reporting.temperature(endpoint, {min: 10, max: 3600, change: 100});
        await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);
        device.powerSource = "Battery";
        device.save();
    },
}, ];
    