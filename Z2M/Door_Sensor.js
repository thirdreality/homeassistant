import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import * as exposes from 'zigbee-herdsman-converters/lib/exposes';
import fz from 'zigbee-herdsman-converters/converters/fromZigbee';
import {Zcl} from "zigbee-herdsman";
const e = exposes.presets;

export default {
	zigbeeModel: ["3RDS17BZ"],
	model: "3RDS17BZ",
	vendor: "Third Reality",
	description: "Door sensor",
	fromZigbee: [fz.ias_contact_alarm_1, fz.battery],
	toZigbee: [],
	ota: true,
	exposes: [e.contact(), e.battery_low(), e.battery(), e.battery_voltage()],
	configure: async (device, coordinatorEndpoint) => {
		const endpoint = device.getEndpoint(1);
		await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);
		device.powerSource = "Battery";
		device.save();
	},
	extend: [
		m.deviceAddCustomCluster("3rDoorSpecialCluster", {
			name: "3rDoorSpecialCluster",
			ID: 0xff01,
			manufacturerCode: 0x1233,
			attributes: {
				delayOpenAttrId: {name: "delayOpenAttrId", ID: 0x0000, type: Zcl.DataType.UINT16, write: true, max: 0xffff},
			},
			commands: {},
			commandsResponse: {},
		}),
		m.numeric({
			name: "delay_open",
			unit: "s",
			valueMin: 0,
			valueMax: 65535,
			scale: 1,
			cluster: "3rDoorSpecialCluster",
			attribute: "delayOpenAttrId",
			description: "Delay open time",
			access: "ALL",
		}),
	],
};