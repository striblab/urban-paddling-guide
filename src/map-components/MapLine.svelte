<script>
    import { onMount } from "svelte";

    let {
        map,
        route,
        lineWidth,
        lineColor,
        lineHighlightColor,
        imageLoaded,
        routeClicked,
        routeSelected,
    } = $props();

    let id = route.routeID;
    let geojson = JSON.parse(route.routeGeojson);
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
    let innerWidth;

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
        if (!map.getLayer(`${id}-rtline`)) {
            map.addLayer(
                {
                    id: `${id}-rtline`,
                    type: "line",
                    source: id,
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case" // Add before this layer
            );
        }
        if (!map.getLayer(`${id}-hit`)) {
            map.addLayer(
                {
                    id: `${id}-hit`,
                    type: "line",
                    source: id,
                    layout: { "line-join": "round", "line-cap": "round" },
                    paint: {
                        "line-width": lineWidth + innerWidth < 600 ? 36 : 12,
                        "line-opacity": 0,
                    },
                },
                "road_footway-case" // Add before this layer
            );
        }

        map.on("mouseenter", `${id}-hit`, () => {
            map.getCanvas().style.cursor = "pointer";
            if (!routeSelected) {
                map.setPaintProperty(
                    `${id}-rtline`,
                    "line-width",
                    lineWidth + 1
                );
                map.setPaintProperty(
                    `${id}-rtline`,
                    "line-color",
                    lineHighlightColor
                );
            }
        });

        map.on("mouseleave", `${id}-hit`, () => {
            map.getCanvas().style.cursor = "";
            if (!routeSelected) {
                map.setPaintProperty(`${id}-rtline`, "line-width", lineWidth);
                map.setPaintProperty(`${id}-rtline`, "line-color", lineColor);
            }
        });

        map.on("click", `${id}-hit`, () => {
            routeClicked(id);
        });

        return () => {
            [`${id}-rtline`, `${id}-endpoints-img`, `${id}-hit`].forEach(
                (l) => {
                    if (map.getLayer(l)) map.removeLayer(l);
                }
            );
        };
    });

    $effect(() => {
        // Add endpoints to the map once the image has been added to the map
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

<svelte:window bind:innerWidth />
