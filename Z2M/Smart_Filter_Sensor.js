import * as m from "zigbee-herdsman-converters/lib/modernExtend";

/**
 * Helper: wraps m.pressure() so that its exposes/configure/fromZigbee/toZigbee
 * are only active when the device actually has the msPressureMeasurement cluster.
 */
function conditionalPressure() {
    const base = m.pressure();

    // Check whether any endpoint on the device has the msPressureMeasurement input cluster
    function deviceHasPressureCluster(device) {
        if (!device || device.isDummyDevice) return true; // docs generation: show it
        return device.endpoints?.some((ep) =>
            ep.supportsInputCluster("msPressureMeasurement"),
        );
    }

    return {
        ...base,
        // Replace static exposes with a dynamic function that checks the cluster
        exposes: [
            (device, options) => {
                if (deviceHasPressureCluster(device)) {
                    // Return the original static exposes from m.pressure()
                    return base.exposes ?? [];
                }
                return [];
            },
        ],
        // Wrap each configure so it only runs when the cluster is present
        configure: (base.configure ?? []).map((configureFn) => {
            if (!configureFn) return configureFn;
            return async (device, coordinatorEndpoint, definition) => {
                if (deviceHasPressureCluster(device)) {
                    await configureFn(device, coordinatorEndpoint, definition);
                }
            };
        }),
        isModernExtend: true,
    };
}

export default {
    zigbeeModel: ["3RAP0149BZ"],
    model: "3RAP0149BZ",
    vendor: "Third Reality, Inc",
    description: "Smart Filter Sensor",
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
        conditionalPressure(),
    ],
};
