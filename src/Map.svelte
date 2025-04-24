<script lang="ts">
    export let routeData = [];

    import PopupCard from "./PopupCard.svelte";
    import { mount } from "svelte";
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
    let hoverColor = "#cd2e2e";
    let hoverWidth = 4;

    let popupLookup = {};

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
                    const key = slug === "mpls-lakes"
                      ? "minneapolis_lakes"
                      : slug.replace(/-/g, "_");
                    const meta = routeData.find((r) => r.mapUrl.includes(key));
                    return [layerId, meta];
                })
                .filter(([, meta]) => meta),
        );
    }

    onMount(() => {
        const map = new maplibregl.Map({
            container: mapContainer,
            // @ts-ignore
            style: basemap,
            center: [-93.265, 44.98], // Minneapolis
            zoom: 9.75,
            cooperativeGestures: true,
            minZoom: 9.75,
            maxZoom: 14.75,
            maxBounds: [
                [-93.8, 44.6], // Southwest coordinates
                [-92.7, 45.3], // Northeast coordinates
            ],
        });

        let activeRoute = null;
        let currentPopup = null;

        map.addControl(new maplibregl.NavigationControl(), "top-right");

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
                let coords: [number, number];
                // handle LineString and MultiLineString geometries
                if (geom.type === "LineString") {
                    const [lng, lat] = geom.coordinates[0];
                    coords = [lng, lat];
                } else if (geom.type === "MultiLineString") {
                    const [lng, lat] = geom.coordinates[0][0];
                    coords = [lng, lat];
                } else {
                    // fallback to event location
                    coords = [e.lngLat.lng, e.lngLat.lat];
                }

                const container = document.createElement("div");

                mount(PopupCard, {
                    target: container,
                    props: {
                        headline: meta.headline,
                        subhead: meta.subhead,
                        heroImg: meta.heroImg,
                        heroImgAltText: meta.heroImgAltText,
                    },
                });

                map.flyTo({ center: coords, essential: true });

                currentPopup = new maplibregl.Popup({ className: 'route-popup', closeButton: true })
                    .setLngLat(coords)
                    .setDOMContent(container)
                    .addTo(map);
            });
        });

        // click outside any route: close popup and clear highlight
        map.on("click", (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: routes,
            });
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
            }
        });

        return () => {
            map.remove();
        }; // cleanup on destroy
    });
</script>

<div
    bind:this={mapContainer}
    class="map-container mx-auto h-[80vh] w-[90%] max-w-7xl mb-20 relative"
></div>

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
