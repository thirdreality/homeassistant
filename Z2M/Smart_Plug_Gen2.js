const {Zcl} = require('zigbee-herdsman');
const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const m = require('zigbee-herdsman-converters/lib/modernExtend');
const e = exposes.presets;
const ea = exposes.access;

module.exports = [{
        zigbeeModel: ["3RSP02028BZ","3RSPE01044BZ"],
        model: "3RSP02028BZ",
        vendor: "Third Reality",
        description: "Smart Plug Gen2",
        fromZigbee: [fz.on_off, fz.electrical_measurement, fz.metering, fz.power_on_behavior],
        toZigbee: [tz.on_off, tz.power_on_behavior],
        whiteLabel: [{vendor: "Third Reality", model: "3RSPE01044BZ", description: "Smart Plug E2", fingerprint: [{ modelID: "3RSPE01044BZ" }],},],
        ota: true,
        exposes: [e.switch(), e.power_on_behavior(), e.ac_frequency(), e.power(), e.power_factor(), e.energy(), e.current(), e.voltage()],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genOnOff", "haElectricalMeasurement", "seMetering"]);
            await endpoint.read("haElectricalMeasurement", ["acPowerMultiplier", "acPowerDivisor"]);
            await reporting.onOff(endpoint);
            await reporting.activePower(endpoint, {change: 10});
            await reporting.rmsCurrent(endpoint, {change: 50});
            await reporting.rmsVoltage(endpoint, {change: 5});
            await reporting.readMeteringMultiplierDivisor(endpoint);
            endpoint.saveClusterAttributeKeyValue("seMetering", {divisor: 3600000, multiplier: 1});
            endpoint.saveClusterAttributeKeyValue("haElectricalMeasurement", {
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
            m.deviceAddCustomCluster("3rPlugSpecialCluster", {
                name: "3rPlugSpecialCluster",
                ID: 0xff03,
                manufacturerCode: 0x1233,
                attributes: {
                    resetTotalEnergy: {name: "resetTotalEnergy", ID: 0x0000, type: 0x20, write: true},
                    countdownToTurnOff: {name: "countdownToTurnOff", ID: 0x0001, type: 0x21, write: true},
                    countdownToTurnOn: {name: "countdownToTurnOn", ID: 0x0002, type: 0x21, write: true},
                    allowBind: {name: "allowBind", ID: 0x0020, type: 0x20, write: true},
                    ledBrightness: {name: "ledBrightness", ID: 0x0010, type: Zcl.DataType.UINT8, write: true, max: 0x64},
                },
                commands: {},
                commandsResponse: {},
            }),
            m.enumLookup({
                name: "reset_total_energy",
                lookup: {Reset: 1},
                cluster: "3rPlugSpecialCluster",
                attribute: "resetTotalEnergy",
                description: "Reset the sum of consumed energy",
                access: "ALL",
            }),
            m.numeric({
                name: "countdown_to_turn_off",
                unit: "s",
                valueMin: 0,
                valueMax: 65535,
                cluster: "3rPlugSpecialCluster",
                attribute: "countdownToTurnOff",
                description: "(ON-OFF)",
                access: "ALL",
            }),
            m.numeric({
                name: "countdown_to_turn_on",
                unit: "s",
                valueMin: 0,
                valueMax: 65535,
                cluster: "3rPlugSpecialCluster",
                attribute: "countdownToTurnOn",
                description: "(OFF-ON)",
                access: "ALL",
            }),
            m.numeric({
                name: "led_brightness",
                unit: "%",
                valueMin: 0,
                valueMax: 100,
                cluster: "3rPlugSpecialCluster",
                attribute: "ledBrightness",
                description: "Set the brightness of LED",
                access: "ALL",
            }),
        ],
}, ];
