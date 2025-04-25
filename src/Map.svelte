<script lang="ts">

    import PopupCard from "./PopupCard.svelte";
    export let routeData: any[] = [];
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

    // routeConfigs: list of route slugs and corresponding GeoJSON data
    const routeConfigs = [
        { slug: "upper-mississippi", data: upperMississippi },
        { slug: "mississippi-gorge", data: mississippiGorge },
        { slug: "lower-mississippi", data: lowerMississippi },
        { slug: "upper-minnehaha", data: upperMinnehaha },
        { slug: "lower-minnehaha", data: lowerMinnehaha },
        { slug: "minnesota", data: minnesota },
        { slug: "lebanon-hills", data: lebanonHills },
        { slug: "mpls-lakes", data: mplsLakes },
        { slug: "east-lakes", data: eastLakes },
        { slug: "upper-rice", data: upperRice },
        { slug: "lower-rice", data: lowerRice },
    ];

    // slugs: route slugs
    // hitLayerIds: IDs for invisible hit-test line layers
    const slugs = routeConfigs.map((c) => c.slug);
    const hitLayerIds = slugs.map((s) => `${s}-line-hit`);

    let mapContainer;

    let lineColor = "#EA8B8B";
    let lineWidth = 3;
    let hoverColor = "#E36363";
    let hoverWidth = 4;

    let zoomLevel;
    let minZoomValue;

    // Popup state: lookup maps layer IDs to metadata, selectedMeta holds current popup content
    let popupLookup = {};
    let selectedMeta = null;

    // Initial map center and zoom configuration
    const initialView = {
        center: [-93.265, 44.98] as [number, number],
        zoom: 9.75,
    };
    const mobileZoom = 5;

    // Update zoomLevel and minZoomValue whenever isMobile changes
    $: zoomLevel = $isMobile ? mobileZoom : initialView.zoom;
    $: minZoomValue = zoomLevel;

    let map;

    // Build popupLookup from routeData once routeData is available
    $: if (routeData.length) {
        popupLookup = Object.fromEntries(
            routeConfigs
                .map(({ slug }) => {
                    const layerId = `${slug}-line`;
                    const key =
                        // Gotta handle Mpls Lakes differently for some reason
                        slug === "mpls-lakes"
                            ? "minneapolis_lakes"
                            : slug.replace(/-/g, "_");
                    const meta = routeData.find((r) => r.mapUrl.includes(key));
                    return [layerId, meta];
                })
                .filter(([, m]) => m),
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
        map.resize();
        // Resize canvas to match container dimensions (fixes mobile sizing)

        // Track currently active route and popup instance
        let activeRoute = null;
        let currentPopup = null;

        map.addControl(new maplibregl.NavigationControl(), "bottom-left");

        map.on("load", () => {
            routeConfigs.forEach(({ slug, data }) => {
                map.addSource(slug, { type: "geojson", data });
                map.addLayer({
                    id: `${slug}-line`,
                    type: "line",
                    source: slug,
                    layout: { "line-join": "round", "line-cap": "round" },
                    paint: { "line-color": lineColor, "line-width": lineWidth },
                });
            });

            // Load square icon and add start/end point symbol layers for each route
            const squareImg = new Image();
            squareImg.onload = () => {
                map.addImage("square", squareImg, { sdf: false });
                routeConfigs.forEach(({ slug, data }) => {
                    const coords = data.features[0].geometry.coordinates;
                    const points = [
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
                        data: { type: "FeatureCollection", features: points },
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

                // Add invisible, wider line layers for hit-testing click/tap events
                slugs.forEach((slug) => {
                    map.addLayer({
                        id: `${slug}-line-hit`,
                        type: "line",
                        source: slug,
                        layout: { "line-join": "round", "line-cap": "round" },
                        paint: {
                            "line-color": "#000",
                            "line-width": lineWidth + 12,
                            "line-opacity": 0,
                        },
                    });
                });
            };
            squareImg.src =
                'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><rect width="12" height="12" fill="%23282828"/></svg>';
            map.resize();
            // Ensure all new layers render correctly after load
        });

        //change cursor and highlight route on hover (use hit layers)
        hitLayerIds.forEach((layerId) => {
            map.on("mouseenter", layerId, () => {
                const realLayer = layerId.replace("-hit", "");
                if (activeRoute === realLayer) return;
                map.getCanvas().style.cursor = "pointer";
                map.setPaintProperty(realLayer, "line-color", hoverColor);
                map.setPaintProperty(realLayer, "line-width", hoverWidth);
            });
            map.on("mouseleave", layerId, () => {
                const realLayer = layerId.replace("-hit", "");
                if (activeRoute === realLayer) return;
                map.getCanvas().style.cursor = "";
                map.setPaintProperty(realLayer, "line-color", lineColor);
                map.setPaintProperty(realLayer, "line-width", lineWidth);
            });
        });

        // click to open popup on each hit layer
        hitLayerIds.forEach((layerId) => {
            map.on("click", layerId, (e) => {
                const realLayer = layerId.replace("-hit", "");
                const meta = popupLookup[realLayer];
                if (!meta) return;
                if (currentPopup) {
                    currentPopup.remove();
                }
                if (activeRoute && activeRoute !== realLayer) {
                    map.setPaintProperty(activeRoute, "line-color", lineColor);
                    map.setPaintProperty(activeRoute, "line-width", lineWidth);
                }
                activeRoute = realLayer;
                map.setPaintProperty(realLayer, "line-color", hoverColor);
                map.setPaintProperty(realLayer, "line-width", hoverWidth);

                if (!e.features?.length) return;
                const feature = e.features[0];
                const geom = feature.geometry;
                // fit map to show entire route when selected
                const allCoords =
                    geom.type === "LineString"
                        ? geom.coordinates
                        : geom.type === "MultiLineString"
                          ? geom.coordinates.flat()
                          : [[e.lngLat.lng, e.lngLat.lat]];
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
            // update to use hitLayerIds for click-outside detection
            const existingLayers = hitLayerIds.filter((layerId) =>
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
        // Add window resize listener to update map canvas size dynamically
        const onResize = () => map.resize();
        window.addEventListener("resize", onResize);

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
    <div bind:this={mapContainer} class="h-full w-full"></div>

    <!-- Popup Overlay -->
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
    <!-- Reset View Button -->
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

<!-- Popup Overrides -->
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
