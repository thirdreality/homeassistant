"""Third Reality formaldehyde sensor devices."""

from typing import Final

from zigpy.quirks import CustomCluster
from zigpy.quirks.v2 import QuirkBuilder, ReportingConfig, SensorDeviceClass, SensorStateClass
from zigpy.quirks.v2.homeassistant import PERCENTAGE
from zigpy.zcl.clusters.general import (
    Basic,
    Groups,
    Identify,
    LevelControl,
    OnOff,
    Ota,
    Scenes,
    Time,
)


(
    QuirkBuilder("Third Reality, Inc", "3RAP0149BZ")
    .prevent_default_entity_creation(
        endpoint_id=1,
        cluster_id=LevelControl.cluster_id,
        function=lambda entity: entity.translation_key in [
            "on_level",
            "on_off_transition_time",
            "default_move_rate",
            "start_up_current_level"
        ]
    )
    .sensor(
        cluster_id=LevelControl.cluster_id,
        attribute_name="current_level",
        device_class=SensorDeviceClass.AQI,
        state_class=SensorStateClass.MEASUREMENT,
        unit=PERCENTAGE,
        fallback_name="Air quality level",
    )
    .add_to_registry()
)