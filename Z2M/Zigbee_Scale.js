import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import {Zcl} from 'zigbee-herdsman';
import * as exposes from 'zigbee-herdsman-converters/lib/exposes';

const {presets: e, access: ea} = exposes;

// 单位转换工具函数：克 → 磅+盎司
const convertGramToPoundOunce = (gram) => {
  const totalOunces = gram / 28.3495;
  const pound = Math.floor(totalOunces / 16);
  const ounce = parseFloat((totalOunces % 16).toFixed(2));
  return { pound_ounce: `${pound}lb ${ounce}oz` };
};

// 自定义fromZigbee转换器
const fzLocal = {
  scale_weight: {
    cluster: "3rScaleSensorcluster",
    type: ["attributeReport", "readResponse"],
    convert: (model, msg, publish, options, meta) => {
      // 兼容处理：属性可能以名称或属性ID的形式出现
      let gram = undefined;
      if (msg.data.read_weight !== undefined) {
        gram = msg.data.read_weight;
      } else if (msg.data.readWeight !== undefined) {
        gram = msg.data.readWeight;
      } else if (msg.data["1"] !== undefined) {
        gram = msg.data["1"];
      } else if (msg.data[1] !== undefined) {
        gram = msg.data[1];
      }

      // 调试日志
      console.log(`[scale_weight] msg.data keys: ${JSON.stringify(Object.keys(msg.data))}, values: ${JSON.stringify(msg.data)}`);

      if (gram !== undefined) {
        const { pound_ounce } = convertGramToPoundOunce(gram);
        return {
          weight: gram,
          weight_pound_ounce: pound_ounce,
        };
      }
      return {};
    },
  },
};

// 自定义toZigbee转换器
const tzLocal = {
  reset_button: {
    key: ["reset_button"],
    convertSet: async (entity, key, value, meta) => {
      await entity.command("3rScaleSensorcluster", "reset", {}, {});
      return { state: { [key]: "RESET_INITIATED" } };
    },
  },
  start_report_button: {
    key: ["start_report_button"],
    convertSet: async (entity, key, value, meta) => {
      await entity.command("3rScaleSensorcluster", "start_report", {}, {});
      return { state: { [key]: "START_REPORT_INITIATED" } };
    },
  },
  stop_report_button: {
    key: ["stop_report_button"],
    convertSet: async (entity, key, value, meta) => {
      await entity.command("3rScaleSensorcluster", "stop_report", {}, {});
      return { state: { [key]: "STOP_REPORT_INITIATED" } };
    },
  },
  set_weight_button: {
    key: ["set_weight_button"],
    convertSet: async (entity, key, value, meta) => {
      const uint = Number(value);
      await entity.command("3rScaleSensorcluster", "set_weight", { uint }, {});
      return { state: { [key]: "SET_WEIGHT_INITIATED" } };
    },
  },
  convert_gram_to_pound_ounce: {
    key: ["convert_gram_to_pound_ounce"],
    convertSet: async (entity, key, value, meta) => {
      await entity.command("3rScaleSensorcluster", "convert_gram_to_pound_ounce", {}, {});
      return { state: { [key]: "CONVERT_INITIATED" } };
    },
  },
};

// 设备定义（ESM格式 export default）
export default {
  zigbeeModel: ["3RKS030Z"],
  model: "3RKS030Z",
  vendor: "Third Reality, Inc",
  description: "Scale - 克转磅/盎司",
  ota: true,
  extend: [
    m.battery(),
    m.deviceAddCustomCluster("3rScaleSensorcluster", {
      name: "3rScaleSensorcluster",
      ID: 0xff0c,
      attributes: {
        read_weight: {
          name: "read_weight",
          ID: 0x0001,
          type: Zcl.DataType.INT16,
        },
        attr2: {
          name: "attr2",
          ID: 0x0002,
          type: Zcl.DataType.INT16,
        },
        attr3: {
          name: "attr3",
          ID: 0x0003,
          type: Zcl.DataType.UINT8,
        },
        attr4: {
          name: "attr4",
          ID: 0x0004,
          type: Zcl.DataType.UINT8,
        },
        attr5: {
          name: "attr5",
          ID: 0x0005,
          type: Zcl.DataType.INT16,
        },
      },
      commands: {
        reset: { ID: 0x00, parameters: [] },
        start_report: { ID: 0x01, parameters: [] },
        stop_report: { ID: 0x02, parameters: [] },
        set_weight: { ID: 0x03, parameters: [{ name: "uint", type: Zcl.DataType.UINT8 }] },
        convert_gram_to_pound_ounce: { ID: 0x04, parameters: [] },
      },
      commandsResponse: {},
    }),
  ],
  fromZigbee: [
    fzLocal.scale_weight,
  ],
  toZigbee: [
    tzLocal.reset_button,
    tzLocal.start_report_button,
    tzLocal.stop_report_button,
    tzLocal.set_weight_button,
    tzLocal.convert_gram_to_pound_ounce,
  ],
  exposes: [
    // 基础重量（克）
    e.numeric("weight", ea.STATE).withUnit("g").withDescription("当前重量（克）"),
    // 磅+盎司转换
    e.text("weight_pound_ounce", ea.STATE).withDescription("重量（磅+盎司）"),
    // 功能按钮
    e.enum("reset_button", ea.SET, ["RESET"]).withDescription("手动重置重量（去皮）"),
    e.enum("start_report_button", ea.SET, ["START"]).withDescription("开始自动上报重量"),
    e.enum("stop_report_button", ea.SET, ["STOP"]).withDescription("停止自动上报重量"),
    e.text("set_weight_button", ea.SET).withDescription("手动设置重量（输入数字，单位克）"),
    e.enum("convert_gram_to_pound_ounce", ea.SET, ["CONVERT"]).withDescription("手动触发克转磅/盎司"),
  ],
  configure: async (device, coordinatorEndpoint, definition) => {
    const endpoint = device.getEndpoint(1);
    await endpoint.bind("3rScaleSensorcluster", coordinatorEndpoint);
    await endpoint.configureReporting("3rScaleSensorcluster", [
      {
        attribute: "read_weight",
        minimumReportInterval: 0,
        maximumReportInterval: 3600,
        reportableChange: 1,
      },
    ]);
  },
  meta: {
    disableActionGroup: true,
    configureKey: 1,
  },
};
