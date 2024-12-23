const {} = require("zigbee-herdsman-converters/lib/modernExtend");
// Add the lines below
const fz = require("zigbee-herdsman-converters/converters/fromZigbee");
const tz = require("zigbee-herdsman-converters/converters/toZigbee");
const exposes = require("zigbee-herdsman-converters/lib/exposes");
const reporting = require("zigbee-herdsman-converters/lib/reporting");
const ota = require("zigbee-herdsman-converters/lib/ota");
const utils = require("zigbee-herdsman-converters/lib/utils");
const globalStore = require("zigbee-herdsman-converters/lib/store");
const e = exposes.presets;
const ea = exposes.access;
const {
  deviceAddCustomCluster,
} = require("zigbee-herdsman-converters/lib/modernExtend");

module.exports = [
  {
    zigbeeModel: ["3RDP01072Z"],
    model: "3RDP01072Z",
    vendor: "Third Reality",
    description: "Zigbee / BLE smart plug with power",
    fromZigbee: [
      fz.on_off,
      fz.electrical_measurement,
      fz.metering,
      fz.power_on_behavior,
    ],
    toZigbee: [tz.on_off, tz.power_on_behavior],
    ota: ota.zigbeeOTA,
    meta: { multiEndpoint: true },
    exposes: [
      e.switch().withEndpoint("left"),
      e.power_on_behavior().withEndpoint("left"),
      e.ac_frequency().withEndpoint("left"),
      e.power().withEndpoint("left"),
      e.power_factor().withEndpoint("left"),
      e.energy().withEndpoint("left"),
      e.current().withEndpoint("left"),
      e.voltage().withEndpoint("left"),
      e.switch().withEndpoint("right"),
      e.power_on_behavior().withEndpoint("right"),
      e.power().withEndpoint("right"),
      e.power_factor().withEndpoint("right"),
      e.energy().withEndpoint("right"),
      e.current().withEndpoint("right"),
    ],
    endpoint: (device) => {
      return { left: 1, right: 2 };
    },
    configure: async (device, coordinatorEndpoint) => {
      const endpoint = device.getEndpoint(1);
      //await reporting.onOff(endpoint);
      // await reporting.activePower(endpoint, {change: 10});
      // await reporting.rmsCurrent(endpoint, {change: 50});
      // await reporting.rmsVoltage(endpoint, { change: 5 });
      // await reporting.readMeteringMultiplierDivisor(endpoint);
      endpoint.saveClusterAttributeKeyValue("seMetering", {
        divisor: 3600000,
        multiplier: 1,
      });
      endpoint.saveClusterAttributeKeyValue("haElectricalMeasurement", {
        acVoltageMultiplier: 1,
        acVoltageDivisor: 10,
        acCurrentMultiplier: 1,
        acCurrentDivisor: 1000,
        acPowerMultiplier: 1,
        acPowerDivisor: 10,
      });
      const endpoint2 = device.getEndpoint(2);
      endpoint2.saveClusterAttributeKeyValue("seMetering", {
        divisor: 3600000,
        multiplier: 1,
      });
      endpoint2.saveClusterAttributeKeyValue("haElectricalMeasurement", {
        acCurrentMultiplier: 1,
        acCurrentDivisor: 1000,
        acPowerMultiplier: 1,
        acPowerDivisor: 10,
      });
      device.save();
    },
  },
];
