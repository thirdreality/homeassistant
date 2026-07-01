import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import * as exposes from 'zigbee-herdsman-converters/lib/exposes';
import fz from 'zigbee-herdsman-converters/converters/fromZigbee';

const e = exposes.presets;

const fzLocal = {
    thirdreality_acceleration: {
        cluster: 'THIRD_REALITY_VIBRATE_DELAY_CLUSTER_ID',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            //const vibration = msg.data['0'];
            if (msg.data['0'] == 1)
			{
				const payload = {"x_axis": msg.data['x_axis'], "y_axis": msg.data['y_axis'], "z_axis": msg.data['z_axis']};
				return payload;
			}
			//const payload = {};
			if (msg.data['Xangle']!== undefined)
			{
				const payload = {"Xangle": msg.data['Xangle']};
				return payload;
			}
			if (msg.data['y_angle']!== undefined)
			{
				const payload = {"y_angle": msg.data['y_angle']};
				return payload;
			}
			if (msg.data['z_angle']!== undefined)
			{
				const payload = {"z_angle": msg.data['z_angle']};
				return payload;
			}
        },
    },
};
export default {
    zigbeeModel: ['3RVS01031Z'],
    model: '3RVS01031Z',
    vendor: 'Third Reality',
    description: 'Zigbee vibration sensor',
    fromZigbee: [fzLocal.thirdreality_acceleration, fz.ias_vibration_alarm_1],
    ota: true,
    exposes: [e.vibration()],
	extend: [
		m.deviceAddCustomCluster('THIRD_REALITY_VIBRATE_DELAY_CLUSTER_ID', {
			name: "THIRD_REALITY_VIBRATE_DELAY_CLUSTER_ID",
			ID: 0xfff1,
			manufacturerCode: 0x1233,
			attributes: {
				cool_down_time: {name: "cool_down_time", ID: 0x0004, type: 0x21, write: true, max: 7200},
                x_axis: {name: "x_axis", ID: 0x0001, type: 0x29, write: false, min: -32768},
                y_axis: {name: "y_axis", ID: 0x0002, type: 0x29, write: false , min: -32768},
                z_axis: {name: "z_axis", ID: 0x0003, type: 0x29, write: false, min: -32768},
				x_angle: {name: "x_angle", ID: 0x0005, type: 0x29, write: false, min: -180},
                y_angle: {name: "y_angle", ID: 0x0006, type: 0x29, write: false, min: -180},
                z_angle: {name: "z_angle", ID: 0x0007, type: 0x29, write: false, min: -180},
			},
			commands: {},
			commandsResponse: {},
		}),
		m.battery(),
		// m.iasZoneAlarm({
		// 	zoneType: "generic",
		// 	zoneAttributes: ["alarm_1"],
		// 	description: "Being in vibration",
		// }),
		m.numeric({
			name: "cool_down_time",
			unit: "s",
			valueMin: 0,
			valueMax: 7200,
			cluster: "THIRD_REALITY_VIBRATE_DELAY_CLUSTER_ID",
			attribute: "cool_down_time",
			description: "coolDownTime",
			access: "ALL",
		}),
		m.numeric({
			name: "x_axis",
			cluster: "THIRD_REALITY_VIBRATE_DELAY_CLUSTER_ID",
			attribute: "x_axis",
			description: "X axis acceleration",
			access: "STATE_GET",
		}),
		m.numeric({
			name: "y_axis",
			cluster: "THIRD_REALITY_VIBRATE_DELAY_CLUSTER_ID",
			attribute: "y_axis",
			description: "Y axis acceleration",
			access: "STATE_GET",
		}),
		m.numeric({
			name: "z_axis",
			cluster: "THIRD_REALITY_VIBRATE_DELAY_CLUSTER_ID",
			attribute: "z_axis",
			description: "Z axis acceleration",
			access: "STATE_GET",
		}),
	],
};