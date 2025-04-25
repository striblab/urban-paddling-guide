<script>
    import { onMount } from "svelte";

    let { map, geojson, id } = $props();

    onMount(() => {
        if (!map.getSource(id)) {
            map.addSource(id, {
                type: "geojson",
                data: geojson,
            });
        }
        if (!map.getLayer(`${id}-line`)) {
            map.addLayer(
                {
                    id: `${id}-line`,
                    type: "line",
                    source: id,
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
            );
        }

        return () => {
            if (map.getLayer(`${id}-line`)) map.removeLayer(`${id}-line`);
        };
    });
</script>
