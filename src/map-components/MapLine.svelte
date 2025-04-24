<script>
    let { map, geojson, id } = $props();

    $effect(() => {
        if (map) {
            map.on("load", () => {
                map.addSource(id, {
                    type: "geojson",
                    data: geojson,
                });
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
            });
        }
    });
</script>
