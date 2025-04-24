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
