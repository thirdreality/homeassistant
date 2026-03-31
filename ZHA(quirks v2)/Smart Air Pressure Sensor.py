"""Third Reality formaldehyde sensor devices."""

from typing import Final
from zigpy.quirks import CustomCluster
from zigpy.quirks.v2 import QuirkBuilder, SensorDeviceClass, SensorStateClass
from zigpy.quirks.v2.homeassistant import PERCENTAGE
from zigpy.zcl.clusters.general import AnalogInput
from zigpy.zcl.clusters.measurement import PressureMeasurement
from zigpy.zcl.clusters.general_const import AnalogInputType

class CustomAnalogInputCluster(CustomCluster, AnalogInput):
    """Custom AnalogInput cluster with modified description and application_type."""
    
    _CONSTANT_ATTRIBUTES = {
        AnalogInput.AttributeDefs.application_type.id: 0x00040000,  # Percentage类型 (0x04), group=0, index=0
        AnalogInput.AttributeDefs.description.id: "Dirty Level",  # 自定义名称
    }


(
    QuirkBuilder("Third Reality, Inc", "3RAP0149BZ")
    .adds(CustomAnalogInputCluster)
    .change_entity_metadata(
        endpoint_id=1,
        cluster_id=PressureMeasurement.cluster_id,
        new_primary=False,
        new_fallback_name="Pressure",
    )
    .add_to_registry()
)