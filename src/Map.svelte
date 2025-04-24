<script>
    import { onMount } from "svelte";
    import MapLine from "./map-components/MapLine.svelte";
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

    const routes = [
        { geojson: upperMississippi, id: "upper-mississippi" },
        { geojson: mississippiGorge, id: "mississippi-gorge" },
        { geojson: lowerMississippi, id: "lower-mississippi" },
        { geojson: upperMinnehaha, id: "upper-minnehaha" },
        { geojson: lowerMinnehaha, id: "lower-minnehaha" },
        { geojson: minnesota, id: "minnesota" },
        { geojson: lebanonHills, id: "lebanon-hills" },
        { geojson: mplsLakes, id: "mpls-lakes" },
        { geojson: eastLakes, id: "east-lakes" },
        { geojson: upperRice, id: "upper-rice" },
        { geojson: lowerRice, id: "lower-rice" },
    ];

    let mapContainer;
    let map;

    onMount(() => {
        map = new maplibregl.Map({
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
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
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
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
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
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
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
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
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
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
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
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
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
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
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
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
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
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
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
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
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
                        "line-color": "#EA8B8B",
                        "line-width": 3,
                    },
                },
                "road_footway-case"
            );
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
{#each routes as route}
    <MapLine geojson={route.geojson} id={route.id} {map} />
{/each}
