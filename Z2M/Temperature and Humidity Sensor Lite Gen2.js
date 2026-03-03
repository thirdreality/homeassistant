import * as m from 'zigbee-herdsman-converters/lib/modernExtend';

export default {
    zigbeeModel: ['3RTHS0324Z'],
    model: '3RTHS0324Z',
    vendor: 'Third Reality, Inc',
    description: 'Temperature and Humidity Sensor Lite Gen2',
    extend: [m.battery(), m.temperature(), m.humidity(), m.commandsOnOff()],
};
