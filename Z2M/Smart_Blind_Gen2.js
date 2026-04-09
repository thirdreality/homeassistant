import * as m from 'zigbee-herdsman-converters/lib/modernExtend';

export default{
    zigbeeModel: ['3RSB02015Z'],
    model: '3RSB02015Z',
    vendor: 'Third Reality',
    description: 'Third Reality Blind Gen2',
    ota: true,
	extend: [
		m.battery(),
		m.windowCovering({controls:["lift"]}),
		m.commandsWindowCovering({commands: ["open", "close", "stop"]}),
		m.deviceAddCustomCluster('3rSmartBlindGen2SpecialCluster', {
			name: "3rSmartBlindGen2SpecialCluster",
			ID: 0xFFF1,
			manufacturerCode: 0x1233,
			attributes: {
				infraredEnable: {name: "infraredEnable", ID: 0x0000, type: 0x20, write: true, min: 0, max: 1},
				compensationSpeed: {name: "compensationSpeed", ID: 0x0001, type: 0x28, write: true, min: -100, max: 100},
				limitPosition: {name: "limitPosition", ID: 0x0002, type: 0x21, write: true, min: 50, max: 4100},
				totalCycleTimes: {name: "totalCycleTimes", ID: 0x0003, type: 0x21, write: true, min: 200, max: 334},
				lastRemainingBatteryPercentage: {name: "lastRemainingBatteryPercentage", ID: 0x0004, type: 0x20, write: true, min: 0, max: 100}, 
			},
			commands: {},
			commandsResponse: {},
		}),
		m.binary({
			name: "ir_remote",
			valueOn: ["ON", 0x00],
			valueOff: ["OFF", 0x01],
			cluster: "3rSmartBlindGen2SpecialCluster",
			attribute: "infraredEnable",
			description: "IR Remote Function Enable/Disable",
		}),
		m.numeric({
			name: "bottom_balance_adjustment",
			valueMin: -100,
			valueMax: 100,
			cluster: "3rSmartBlindGen2SpecialCluster",
			attribute: "compensationSpeed",
			description: "Adjusts the left-right balance of the shade's bottom bar(turns -100 ~ 100).",
			access: "ALL",
		}),
		m.numeric({
			name: "preset_bottom_position",
			valueMin: 50,
			valueMax: 4100,
			cluster: "3rSmartBlindGen2SpecialCluster",
			attribute: "limitPosition",
			description: "Preset the bottom limit position of the blind",
			access: "ALL",
		}),
		m.numeric({
			name: "estimated_usable_curtain_cycles",
			valueMin: 200,
			valueMax: 334,
			cluster: "3rSmartBlindGen2SpecialCluster",
			attribute: "totalCycleTimes",
			description:
				"Indicates the estimated number of remaining curtain cycles, used to gauge the battery charge level(based on battery level).",
			access: "ALL",
		}),
		m.numeric({
			name: "battery_level_at_last_power_off",
			valueMin: 0,
			valueMax: 100,
			cluster: "3rSmartBlindGen2SpecialCluster",
			attribute: "lastRemainingBatteryPercentage",
			description:
				"Stores the battery level recorded at the moment of the last power-off, used to help estimate the current battery capacity.",
			access: "STATE_GET",
		}),
	],
};
