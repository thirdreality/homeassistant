import * as m from "zigbee-herdsman-converters/lib/modernExtend";

export default { 
     zigbeeModel: ['3RAQ1096Z'], 
     model: '3RAQ1096Z', 
     vendor: 'Third Reality, Inc', 
     description: 'Smart Air Quality Sensor',
     ota: true,
     extend: [
        m.temperature(), 
        m.humidity(), 
        m.co2(),
        m.deviceAddCustomCluster("3rCO2SensorCluster", {
            name: "3rCO2SensorCluster",
            ID: 0x042e,
            manufacturerCode: 0x1407,
            attributes: {
               VolatileOrganicCompounds: {
                  name: "VolatileOrganicCompounds",
                  ID: 0x0000,
                  type: 0x23,
                  write: false,
                  max: 0xffffffff,
               },
            },
            commands: {},
            commandsResponse: {},
         }),
         m.numeric({
            name: "voc_index",
            cluster: "3rCO2SensorCluster",
            attribute: "VolatileOrganicCompounds",
            unit: "aqi",
            description: "Measured VOC Index",
            access: "STATE_GET",
         }),
     ], 
 };