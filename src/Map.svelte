<script>
    let { routeData, clearFilter } = $props();

    import { onMount } from "svelte";
    import maplibregl from "maplibre-gl";
    import "maplibre-gl/dist/maplibre-gl.css";
    import {
        getBBox,
        getBBoxAspectRatio,
        navBarOffset,
        stickyFiltersOffset,
        scrollToTargetAdjusted,
    } from "./utilities";
    import basemap from "./data/urban_paddling_basemap.json";
    import MapLine from "./map-components/MapLine.svelte";
    import Popup from "./map-components/Popup.svelte";

    let mapContainer;

    let lineWidth = 3;
    let lineColor = "#EA8B8B";
    let lineHighlightColor = "#E36363";

    let map = $state();
    let mapLoaded = $state(false);
    let imageLoaded = $state(false);
    let popupData = $state({ headline: false });
    let innerWidth = $state(0);
    let selectedRoute = $state("");

    const isMobile = $derived(innerWidth < 640);

    const initialView = {
        center: [-93.265, 44.98],
        zoom: 9,
    };
    const mobileZoom = 5;

    onMount(() => {
        map = new maplibregl.Map({
            container: mapContainer,
            // @ts-ignore
            style: basemap,
            // @ts-ignore
            center: initialView.center,
            zoom: isMobile ? mobileZoom : initialView.zoom,
            cooperativeGestures: true,
            maxZoom: 14.75,
            maxBounds: [
                [-94, 44], // Southwest coordinates
                [-92, 46], // Northeast coordinates
            ],
        });

        map.addControl(new maplibregl.NavigationControl(), "top-left");

        map.on("load", () => {
            mapLoaded = true;
            const squareImage = new Image();
            squareImage.src =
                'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><rect width="12" height="12" fill="%23282828"/></svg>';
            squareImage.onload = () => {
                map.addImage("square", squareImage, { sdf: false });
                imageLoaded = true;
            };
            map.fitBounds(
                getBBox(routeData.map((r) => JSON.parse(r.routeGeojson))),
                {
                    padding: 30,
                }
            );
        });

        map.on("click", clearMap);

        return () => {
            if (map) map.remove();
        }; // cleanup on destroy
    });

    $effect(() => {
        if (routeData.length && map) {
            map.fitBounds(
                getBBox(routeData.map((r) => JSON.parse(r.routeGeojson))),
                {
                    padding: 30,
                }
            );
            clearMap();
        }
    });

    const selectRoute = (routeID) => {
        clearMap();
        selectedRoute = routeID;
        const route = routeData.filter((r) => r.routeID === routeID)[0];
        map.setPaintProperty(`${routeID}-rtline`, "line-width", lineWidth + 1);
        map.setPaintProperty(
            `${routeID}-rtline`,
            "line-color",
            lineHighlightColor
        );
        popupData = route;
        scrollToTargetAdjusted(
            mapContainer,
            $navBarOffset + $stickyFiltersOffset
        );
        let bbox = getBBox([JSON.parse(route.routeGeojson)]);
        let bboxAspectRatio = getBBoxAspectRatio(bbox);
        map.fitBounds(bbox, {
            padding: 100,
            offset: [
                bboxAspectRatio < 0.5 ? 0 : -20,
                bboxAspectRatio < 0.5 ? -50 : 0,
            ],
        });
    };

    const clearMap = () => {
        const allLayers = map.getLayersOrder();
        let lineLayers = allLayers.filter((l) => l.includes("-rtline"));
        lineLayers.forEach((l) => {
            map.setPaintProperty(l, "line-width", lineWidth);
            map.setPaintProperty(l, "line-color", lineColor);
        });
        popupData = { headline: false };
    };

    const resize = () => {
        if (map) {
            map.resize();
        }
    };
</script>

<svelte:window onresize={resize} bind:innerWidth />
<div
    bind:this={mapContainer}
    class="map-container mx-auto h-[80vh] w-full max-w-7xl mb-20 relative"
>
    <button
        onclick={() => {
            clearFilter();
            clearMap();
            map.fitBounds(
                getBBox(routeData.map((r) => JSON.parse(r.routeGeojson))),
                {
                    padding: 30,
                }
            );
        }}
        class="font-utility-button-02 text-[#434343] absolute top-2.5 left-12 bg-white/95 px-3 py-2 shadow-[0_1px_4px_rgba(0,0,0,0.3)] rounded-md z-50 text-sm hover:bg-gray-100"
        >Reset View</button
    >
    {#if popupData.headline}<Popup
            {popupData}
            {routeData}
            loadRoute={(routeID) => {
                selectRoute(routeID);
            }}
            closeRoute={clearMap}
        />{/if}
</div>
{#key routeData}
    {#if mapLoaded}
        {#each routeData as route}
            <MapLine
                {route}
                {map}
                {imageLoaded}
                {lineWidth}
                {lineColor}
                {lineHighlightColor}
                routeSelected={selectedRoute === route.routeID}
                routeClicked={(routeID) => {
                    selectRoute(routeID);
                }}
            />
        {/each}
    {/if}
{/key}

<style>
    :global(.maplibregl-cooperative-gesture-screen) {
        z-index: 60;
    }
</style>
