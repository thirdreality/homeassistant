"""Third Reality formaldehyde sensor devices."""

from typing import Final

from zigpy.quirks import CustomCluster
from zigpy.quirks.v2 import QuirkBuilder, ReportingConfig, SensorDeviceClass, SensorStateClass
from zigpy.quirks.v2.homeassistant import CONCENTRATION_PARTS_PER_BILLION
import zigpy.types as t
from zigpy.zcl.foundation import BaseAttributeDefs, ZCLAttributeDef
from zigpy.zcl.clusters.measurement import FormaldehydeConcentration

from zhaquirks.tuya.builder import TuyaFormaldehydeConcentration
from zhaquirks.develco.air_quality import DevelcoVOCMeasurement


class ThirdRealityRadarCluster(CustomCluster):
    """Third Reality's plug private cluster."""

    cluster_id = 0x042e

    class AttributeDefs(BaseAttributeDefs):
        """Define the attributes of a private cluster."""

        # reset the accumulated power of the plug
        volatile_organic_compounds: Final = ZCLAttributeDef(
            id=0x0000,
            type=t.Single,
            is_manufacturer_specific=True,
        )

(
    QuirkBuilder("Third Reality, Inc", "3RPL01084Z")
    .replaces(ThirdRealityRadarCluster)
    .sensor(
        endpoint_id=1,
        attribute_name=ThirdRealityRadarCluster.AttributeDefs.volatile_organic_compounds.name,
        cluster_id=ThirdRealityRadarCluster.cluster_id,
        device_class=SensorDeviceClass.VOLATILE_ORGANIC_COMPOUNDS_PARTS,
        state_class=SensorStateClass.MEASUREMENT,
        unit=CONCENTRATION_PARTS_PER_BILLION,
        fallback_name="Volatile organic compounds",
    )
    .add_to_registry()
)