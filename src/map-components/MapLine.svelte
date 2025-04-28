<script>
    import { onMount } from "svelte";

    let { map, geojson, id, imageLoaded } = $props();

    let coords = geojson.features[0].geometry.coordinates;
    let endPoints = [
        {
            type: "Feature",
            geometry: { type: "Point", coordinates: coords[0] },
        },
        {
            type: "Feature",
            geometry: { type: "Point", coordinates: coords[coords.length - 1] },
        },
    ];

    onMount(() => {
        if (!map.getSource(id)) {
            map.addSource(id, {
                type: "geojson",
                data: geojson,
            });
        }
        if (!map.getSource(`${id}-endpoints`)) {
            map.addSource(`${id}-endpoints`, {
                type: "geojson",
                data: { type: "FeatureCollection", features: endPoints },
            });
        }
        if (!map.getLayer(`${id}-line`)) {
            map.addLayer({
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
            });
        }

        return () => {
            if (map.getLayer(`${id}-line`)) map.removeLayer(`${id}-line`);
            if (map.getLayer(`${id}-endpoints-img`))
                map.removeLayer(`${id}-endpoints-img`);
        };
    });

    $effect(() => {
        if (map && imageLoaded) {
            if (!map.getLayer(`${id}-endpoints-img`)) {
                map.addLayer({
                    id: `${id}-endpoints-img`,
                    type: "symbol",
                    source: `${id}-endpoints`,
                    layout: {
                        "icon-image": "square",
                        "icon-size": 0.5,
                        "icon-allow-overlap": false,
                    },
                });
            }
        }
    });
</script>
