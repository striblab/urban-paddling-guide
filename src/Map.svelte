<script>
    let { routeData } = $props();
    import { onMount } from "svelte";
    import MapLine from "./map-components/MapLine.svelte";
    import maplibregl from "maplibre-gl";
    import "maplibre-gl/dist/maplibre-gl.css";
    import basemap from "./data/urban_paddling_basemap.json";
    let mapLoaded = $state(false);

    const slugify = (routeTitle) => routeTitle.toLowerCase().replace(/ /g, "-");

    let mapContainer;
    let map = $state();
    let imageLoaded = $state(false);

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
            mapLoaded = true;
            const squareImage = new Image();
            squareImage.src =
                'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><rect width="12" height="12" fill="%23282828"/></svg>';
            squareImage.onload = () => {
                map.addImage("square", squareImage, { sdf: false });
                imageLoaded = true;
            };
            map.resize();
        });

        return () => {
            map.remove();
        }; // cleanup on destroy
    });

    const resize = () => {
        if (map) {
            map.resize();
        }
    };
</script>

<svelte:window onresize={resize} />
<div
    bind:this={mapContainer}
    class="map-container mx-auto h-[80vh] w-[90%] max-w-7xl mb-20 relative"
></div>
{#key routeData}
    {#if mapLoaded}
        {#each routeData as route}
            <MapLine
                geojson={JSON.parse(route.routeGeojson)}
                id={slugify(route.headline)}
                {map}
                {imageLoaded}
                lineWidth={3}
            />
        {/each}
    {/if}
{/key}
