<script>
    import { onMount } from "svelte";

    let { map, geojson, id, lineWidth, imageLoaded } = $props();

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
                    "line-width": lineWidth,
                },
            });
        }
        if (!map.getLayer(`${id}-hit`)) {
            map.addLayer({
                id: `${id}-hit`,
                type: "line",
                source: id,
                layout: { "line-join": "round", "line-cap": "round" },
                paint: {
                    "line-width": lineWidth + 12,
                    "line-opacity": 0,
                },
            });
        }

        map.on("mouseenter", `${id}-hit`, () => {
            map.getCanvas().style.cursor = "pointer";
            map.setPaintProperty(`${id}-line`, "line-width", lineWidth + 1);
            map.setPaintProperty(`${id}-line`, "line-color", "#E36363");
        });

        map.on("mouseleave", `${id}-hit`, () => {
            map.getCanvas().style.cursor = "pointer";
            map.setPaintProperty(`${id}-line`, "line-width", lineWidth);
            map.setPaintProperty(`${id}-line`, "line-color", "#EA8B8B");
        });

        return () => {
            [`${id}-line`, `${id}-endpoints-img`, `${id}-hit`].forEach((l) => {
                if (map.getLayer(l)) map.removeLayer(l);
            });
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
