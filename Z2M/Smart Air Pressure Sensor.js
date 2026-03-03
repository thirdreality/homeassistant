import * as m from "zigbee-herdsman-converters/lib/modernExtend";

export default {
  zigbeeModel: ["3RAP0149BZ"],
  model: "3RAP0149BZ",
  vendor: "Third Reality, Inc",
  description: "Smart Air Pressure Sensor",
  ota: true,
  extend: [
    m.battery(),
    m.pressure(),
    m.pressure({
      attribute: { ID: 0xff01, type: 0x23 },
      name: "Pressure",
      unit: "Pa",
      scale: 1,
    }),
    m.numeric({
        name: "press diff level",
        cluster: "genLevelCtrl",
        attribute: 'currentLevel',
        description: "press diff level",
        access: "STATE_GET",
    }),
  ],
};
