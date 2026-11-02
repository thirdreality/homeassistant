import * as m from 'zigbee-herdsman-converters/lib/modernExtend';

export default {
    zigbeeModel: ['3RRE0194Z'],
    model: '3RRE0194Z',
    vendor: 'Third Reality, Inc',
    description: 'Smart Outdoor Repeater',
    ota: true,
    extend: [m.battery(), m.onOff()],
};
