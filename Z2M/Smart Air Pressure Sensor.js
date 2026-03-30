import * as m from "zigbee-herdsman-converters/lib/modernExtend";

export default {
  zigbeeModel: ["3RAP0149BZ"],
  model: "3RAP0149BZ",
  vendor: "Third Reality, Inc",
  description: "Smart Air Pressure Sensor",
  ota: true,
  extend: [
    m.battery(),
    m.numeric({
      name: "dirty_level",
      unit: "%",
      cluster: "genAnalogInput",
      attribute: "presentValue",
      description: "Measure dirty level",
      access: "STATE_GET",
    }),
    m.pressure(),
  ],
};
