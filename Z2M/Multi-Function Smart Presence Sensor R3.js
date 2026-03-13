import * as m from "zigbee-herdsman-converters/lib/modernExtend";

export default {
  zigbeeModel: ["3RPL01084Z"],
  model: "3RPL01084Z",
  vendor: "Third Reality",
  description: "Multi-Function Smart Presence Sensor R3",
  ota: true,
  extend: [
    m.occupancy(),
    m.illuminance(),
    m.deviceAddCustomCluster("3r60gRadarSpecialCluster", {
      ID: 0x042e,
      manufacturerCode: 0x1407,
      attributes: {
        totalVolatileOrganicCompounds: {
          ID: 0x0000,
          type: 0x23,
          write: false,
          max: 0xffffffff,
        },
        presenceSensorSensitivity: { ID: 0xF002, type: 0x20, write: true, min: 1, max: 6 },
        tvocSensorCalibration: { ID: 0xF001, type: 0x20, write: true, min: 1, max: 1 },
        airThreshold: { ID: 0xF003, type: 0x21, write: true, min: 3000, max: 15000 },
      },
      commands: {},
      commandsResponse: {},
    }),
    m.numeric({
      name: "total_volatile_organic_compounds",
      cluster: "3r60gRadarSpecialCluster",
      attribute: "totalVolatileOrganicCompounds",
      unit: "ppb",
      description: "Measured TVOC value",
      access: "STATE_GET",
    }),
    m.enumLookup({
      name: "tvoc_sensor_calibration",
      lookup: {Reset: 1},
      cluster: "3r60gRadarSpecialCluster",
      attribute: "tvocSensorCalibration",
      description: "TVOC sensor calibration",
      access: "ALL",
    }),
    m.numeric({
      name: "presence_sensor_sensitivity",
      valueMin: 1,
      valueMax: 6,
      cluster: "3r60gRadarSpecialCluster",
      attribute: "presenceSensorSensitivity",
      description: "Presence sensor sensitivity",
      access: "ALL",
    }),
    m.numeric({
      name: "air_threshold",
      valueMin: 3000,
      valueMax: 15000,
      cluster: "3r60gRadarSpecialCluster",
      attribute: "airThreshold",
      unit: "ppb",
      description: "Air threshold",
      access: "ALL",
    }),
    m.light({
      color: { modes: ["xy"], enhancedHue: true },
    }),
  ],
};
