<script lang="ts">
    export let routeData = [];

    import PopupCard from "./PopupCard.svelte";
    import { isMobile } from "./stores.js";
    import { onMount } from "svelte";
    import maplibregl from "maplibre-gl";
    import "maplibre-gl/dist/maplibre-gl.css";
    import basemap from "./data/urban_paddling_basemap.json";
    import upperMississippi from "./routes/upper_mississippi.json";
    import mississippiGorge from "./routes/mississippi_gorge.json";
    import lowerMississippi from "./routes/lower_mississippi.json";
    import upperMinnehaha from "./routes/upper_minnehaha.json";
    import lowerMinnehaha from "./routes/lower_minnehaha.json";
    import minnesota from "./routes/minnesota.json";
    import lebanonHills from "./routes/lebanon_hills.json";
    import mplsLakes from "./routes/mpls_lakes.json";
    import eastLakes from "./routes/east_lakes.json";
    import upperRice from "./routes/upper_rice.json";
    import lowerRice from "./routes/lower_rice.json";

    let mapContainer;
    let lineColor = "#EA8B8B";
    let lineWidth = 3;
    let hoverColor = "#E36363";
    let hoverWidth = 4;

    let zoomLevel;
    let minZoomValue;

    let popupLookup = {};
    let selectedMeta = null;

    const initialView = {
        center: [-93.265, 44.98] as [number, number],
        zoom: 9.75,
    };
    const mobileZoom = 5;

    $: zoomLevel = $isMobile ? mobileZoom : initialView.zoom;
    $: minZoomValue = zoomLevel;

    let map;

    $: if (routeData.length) {
        const fileSlugs = [
            "upper-mississippi",
            "mississippi-gorge",
            "lower-mississippi",
            "upper-minnehaha",
            "lower-minnehaha",
            "minnesota",
            "lebanon-hills",
            "mpls-lakes",
            "east-lakes",
            "upper-rice",
            "lower-rice",
        ];

        popupLookup = Object.fromEntries(
            fileSlugs
                .map((slug) => {
                    const layerId = `${slug}-line`;
                    const key =
                        slug === "mpls-lakes"
                            ? "minneapolis_lakes"
                            : slug.replace(/-/g, "_");
                    const meta = routeData.find((r) => r.mapUrl.includes(key));
                    return [layerId, meta];
                })
                .filter(([, meta]) => meta),
        );
    }

    onMount(() => {
        map = new maplibregl.Map({
            container: mapContainer,
            // @ts-ignore
            style: basemap,
            center: initialView.center,
            zoom: zoomLevel,
            cooperativeGestures: true,
            minZoom: minZoomValue,
            maxZoom: 14.75,
            maxBounds: [
                [-93.8, 44.6], // Southwest coordinates
                [-92.7, 45.3], // Northeast coordinates
            ],
        });
        // ensure canvas matches container on initial mobile mount
        map.resize();

        let activeRoute = null;
        let currentPopup = null;

        map.addControl(new maplibregl.NavigationControl(), "bottom-left");

        // add the route layers to the map
        map.on("load", () => {
            map.addSource("upper-mississippi", {
                type: "geojson",
                // @ts-ignore
                data: upperMississippi,
            });
            map.addLayer(
                {
                    id: "upper-mississippi-line",
                    type: "line",
                    source: "upper-mississippi",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case",
            );
            map.addSource("mississippi-gorge", {
                type: "geojson",
                // @ts-ignore
                data: mississippiGorge,
            });
            map.addLayer(
                {
                    id: "mississippi-gorge-line",
                    type: "line",
                    source: "mississippi-gorge",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case",
            );
            map.addSource("lower-mississippi", {
                type: "geojson",
                // @ts-ignore
                data: lowerMississippi,
            });
            map.addLayer(
                {
                    id: "lower-mississippi-line",
                    type: "line",
                    source: "lower-mississippi",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case",
            );
            map.addSource("upper-minnehaha", {
                type: "geojson",
                // @ts-ignore
                data: upperMinnehaha,
            });
            map.addLayer(
                {
                    id: "upper-minnehaha-line",
                    type: "line",
                    source: "upper-minnehaha",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case",
            );
            map.addSource("lower-minnehaha", {
                type: "geojson",
                // @ts-ignore
                data: lowerMinnehaha,
            });
            map.addLayer(
                {
                    id: "lower-minnehaha-line",
                    type: "line",
                    source: "lower-minnehaha",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case",
            );
            map.addSource("minnesota", {
                type: "geojson",
                // @ts-ignore
                data: minnesota,
            });
            map.addLayer(
                {
                    id: "minnesota-line",
                    type: "line",
                    source: "minnesota",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case",
            );
            map.addSource("lebanon-hills", {
                type: "geojson",
                // @ts-ignore
                data: lebanonHills,
            });
            map.addLayer(
                {
                    id: "lebanon-hills-line",
                    type: "line",
                    source: "lebanon-hills",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case",
            );
            map.addSource("mpls-lakes", {
                type: "geojson",
                // @ts-ignore
                data: mplsLakes,
            });
            map.addLayer(
                {
                    id: "mpls-lakes-line",
                    type: "line",
                    source: "mpls-lakes",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case",
            );
            map.addSource("east-lakes", {
                type: "geojson",
                // @ts-ignore
                data: eastLakes,
            });
            map.addLayer(
                {
                    id: "east-lakes-line",
                    type: "line",
                    source: "east-lakes",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case",
            );
            map.addSource("upper-rice", {
                type: "geojson",
                // @ts-ignore
                data: upperRice,
            });
            map.addLayer(
                {
                    id: "upper-rice-line",
                    type: "line",
                    source: "upper-rice",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case",
            );
            map.addSource("lower-rice", {
                type: "geojson",
                // @ts-ignore
                data: lowerRice,
            });
            map.addLayer(
                {
                    id: "lower-rice-line",
                    type: "line",
                    source: "lower-rice",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                    },
                },
                "road_footway-case",
            );

            // This is the only way I could figure out how to draw a square I'm sorry Tom
            const squareImg = new Image();
            squareImg.onload = () => {
                map.addImage("square", squareImg, { sdf: false });
                const sourceData = {
                    "upper-mississippi": upperMississippi,
                    "mississippi-gorge": mississippiGorge,
                    "lower-mississippi": lowerMississippi,
                    "upper-minnehaha": upperMinnehaha,
                    "lower-minnehaha": lowerMinnehaha,
                    minnesota: minnesota,
                    "lebanon-hills": lebanonHills,
                    "mpls-lakes": mplsLakes,
                    "east-lakes": eastLakes,
                    "upper-rice": upperRice,
                    "lower-rice": lowerRice,
                };
                Object.entries(sourceData).forEach(([slug, geojson]) => {
                    const coords = geojson.features[0].geometry.coordinates;
                    const features = [
                        {
                            type: "Feature",
                            geometry: { type: "Point", coordinates: coords[0] },
                        },
                        {
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: coords[coords.length - 1],
                            },
                        },
                    ];
                    map.addSource(`${slug}-points`, {
                        type: "geojson",
                        data: { type: "FeatureCollection", features },
                    });
                    map.addLayer({
                        id: `${slug}-points`,
                        type: "symbol",
                        source: `${slug}-points`,
                        layout: {
                            "icon-image": "square",
                            "icon-size": 0.5,
                            "icon-allow-overlap": false,
                        },
                    });
                });
            };
            squareImg.src =
                'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><rect width="12" height="12" fill="%23282828"/></svg>';
            // ensure layers render correctly immediately after adding
            map.resize();
        });

        const routes = [
            "upper-mississippi-line",
            "mississippi-gorge-line",
            "lower-mississippi-line",
            "upper-minnehaha-line",
            "lower-minnehaha-line",
            "minnesota-line",
            "lebanon-hills-line",
            "mpls-lakes-line",
            "east-lakes-line",
            "upper-rice-line",
            "lower-rice-line",
        ];

        //change cursor and highlight route on hover
        routes.forEach((layerId) => {
            // when the cursor enters the layer’s area
            map.on("mouseenter", layerId, () => {
                if (activeRoute === layerId) return;
                // change cursor so it’s obvious it’s interactive
                map.getCanvas().style.cursor = "pointer";
                // swap to your hover color
                map.setPaintProperty(layerId, "line-color", hoverColor);
                // (optionally bump width)
                map.setPaintProperty(layerId, "line-width", hoverWidth);
            });

            // when the cursor leaves
            map.on("mouseleave", layerId, () => {
                // if this layer is selected, do not reset on mouse leave
                if (activeRoute === layerId) return;
                map.getCanvas().style.cursor = "";
                map.setPaintProperty(layerId, "line-color", lineColor);
                map.setPaintProperty(layerId, "line-width", lineWidth);
            });
        });

        // click to open popup on each route layer
        routes.forEach((layerId) => {
            map.on("click", layerId, (e) => {
                const meta = popupLookup[layerId];
                if (!meta) return;
                // remove existing popup and reset previous highlight
                if (currentPopup) {
                    currentPopup.remove();
                }
                if (activeRoute && activeRoute !== layerId) {
                    map.setPaintProperty(activeRoute, "line-color", lineColor);
                    map.setPaintProperty(activeRoute, "line-width", lineWidth);
                }
                // set new active route and apply hover style
                activeRoute = layerId;
                map.setPaintProperty(layerId, "line-color", hoverColor);
                map.setPaintProperty(layerId, "line-width", hoverWidth);

                if (!e.features?.length) return;
                const feature = e.features[0];
                const geom = feature.geometry;
                // determine midpoint of the route coordinates
                let coords;
                let coordsList;
                if (geom.type === "LineString") {
                    coordsList = geom.coordinates;
                } else if (geom.type === "MultiLineString") {
                    coordsList = geom.coordinates.flat();
                } else {
                    coordsList = [[e.lngLat.lng, e.lngLat.lat]];
                }
                const midIndex = Math.floor(coordsList.length / 2);
                coords = coordsList[midIndex];

                // fit map to show entire route
                const allCoords =
                    geom.type === "LineString"
                        ? geom.coordinates
                        : geom.type === "MultiLineString"
                          ? geom.coordinates.flat()
                          : [coords];
                const lons = allCoords.map((c) => c[0]);
                const lats = allCoords.map((c) => c[1]);
                let bounds: [[number, number], [number, number]];
                bounds = [
                    [Math.min(...lons), Math.min(...lats)],
                    [Math.max(...lons), Math.max(...lats)],
                ];
                // fit map to show entire route with responsive padding
                const paddingValue = $isMobile ? 50 : 200;
                map.fitBounds(bounds, { padding: paddingValue, linear: true });

                // show sidebar popup
                selectedMeta = meta;
            });
        });

        // click outside any route: close popup and clear highlight
        map.on("click", (e) => {
            const existingLayers = routes.filter((layerId) =>
                map.getLayer(layerId),
            );
            if (existingLayers.length === 0) return;
            let features = [];
            try {
                features = map.queryRenderedFeatures(e.point, {
                    layers: existingLayers,
                });
            } catch (err) {
                console.warn("queryRenderedFeatures error:", err);
                return;
            }
            if (!features.length) {
                if (currentPopup) {
                    currentPopup.remove();
                    currentPopup = null;
                }
                if (activeRoute) {
                    map.setPaintProperty(activeRoute, "line-color", lineColor);
                    map.setPaintProperty(activeRoute, "line-width", lineWidth);
                    activeRoute = null;
                }
                selectedMeta = null;
            }
        });
        const onResize = () => map.resize();
        window.addEventListener("resize", onResize);

        // cleanup on destroy
        return () => {
            window.removeEventListener("resize", onResize);
            map.remove();
        };
    });

    // When isMobile toggles, update the live map's zoom extents
    $: if (map) {
        map.setMinZoom(minZoomValue);
        map.setZoom(zoomLevel);
    }
</script>

<div class="relative mx-auto h-[80vh] w-[90%] max-w-7xl mb-20">
    <!-- map canvas -->
    <div bind:this={mapContainer} class="h-full w-full"></div>

    <!-- overlay popup -->
    {#if selectedMeta}
        <div
            class="absolute top-0 left-0 w-full max-h-[80vh] overflow-auto z-50 px-4 py-2
                   md:top-auto md:bottom-0 md:right-0 md:left-auto md:w-1/3 md:px-4 md:py-4"
        >
            <PopupCard
                headline={selectedMeta.headline}
                subhead={selectedMeta.subhead}
                heroImg={selectedMeta.heroImg}
                heroImgAltText={selectedMeta.heroImgAltText}
            />
        </div>
    {/if}
    <button
        class="font-utility-button-02 text-[#434343] absolute bottom-2.5 left-12 bg-white/95 px-3 py-2 shadow-[0_1px_4px_rgba(0,0,0,0.3)] rounded-md z-50 text-sm hover:bg-gray-100"
        on:click={() =>
            map.flyTo({
                center: initialView.center,
                zoom: zoomLevel,
                essential: true,
            })}
    >
        Reset View
    </button>
</div>

<style>
    /* let the inner card define all popup styles */
    :global(.route-popup .maplibregl-popup-content) {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
    }
    /* hide the default arrow tip */
    :global(.route-popup .maplibregl-popup-tip) {
        display: none !important;
    }
</style>
