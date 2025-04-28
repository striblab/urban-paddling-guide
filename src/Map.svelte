<script>
    let { routeData, clearFilter } = $props();

    import { onMount } from "svelte";
    import maplibregl from "maplibre-gl";
    import "maplibre-gl/dist/maplibre-gl.css";
    import { slugify } from "./utilities";
    import basemap from "./data/urban_paddling_basemap.json";
    import MapLine from "./map-components/MapLine.svelte";
    import Popup from "./map-components/Popup.svelte";

    let mapContainer;
    let map = $state();
    let mapLoaded = $state(false);
    let imageLoaded = $state(false);
    let lineWidth = 3;
    let popupData = $state({});
    let bboxAspectRatio = $state(0);
    let innerWidth = $state(0);

    const isMobile = $derived(innerWidth < 640);

    const initialView = {
        center: [-93.265, 44.98],
        zoom: 9.75,
    };
    const mobileZoom = 5;

    const getBBox = (geojsons) => {
        let lons = [];
        let lats = [];
        geojsons.forEach((geojson) => {
            const features = geojson.features;
            features.forEach((feature) => {
                const geom = feature.geometry;
                const allCoords =
                    geom.type === "LineString"
                        ? geom.coordinates
                        : geom.coordinates.flat();
                lons.push(...allCoords.map((c) => c[0]));
                lats.push(...allCoords.map((c) => c[1]));
            });
        });
        let bounds = [
            [0, 0],
            [0, 0],
        ];
        bounds = [
            [Math.min(...lons), Math.min(...lats)],
            [Math.max(...lons), Math.max(...lats)],
        ];
        return bounds;
    };

    const getBBoxAspectRatio = (bbox) => {
        const length = bbox[1][1] - bbox[0][1];
        const height = bbox[1][0] - bbox[0][0];
        return length / height;
    };

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
                [-93.8, 44.6], // Southwest coordinates
                [-92.7, 45.3], // Northeast coordinates
            ],
        });

        map.addControl(new maplibregl.NavigationControl(), "bottom-left");

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

        map.on("click", (e) => {
            const allLayers = map.getLayersOrder();
            let lineLayers = allLayers.filter((l) => l.includes("-line"));
            lineLayers.forEach((l) => {
                map.setPaintProperty(l, "line-width", lineWidth);
                map.setPaintProperty(l, "line-color", "#EA8B8B");
            });
            popupData = {};
        });

        map.on("drag", () => {
            popupData = {};
        });
        map.on("zoomstart", () => {
            popupData = {};
        });

        return () => {
            map.remove();
        }; // cleanup on destroy
    });

    $effect(() => {
        if (routeData.length && map) {
            map.fitBounds(
                getBBox(routeData.map((r) => JSON.parse(r.routeGeojson))),
                {
                    padding: 20,
                }
            );
        }
    });

    const resize = () => {
        if (map) {
            map.resize();
        }
    };
</script>

<svelte:window onresize={resize} bind:innerWidth />
<div
    bind:this={mapContainer}
    class="map-container mx-auto h-[80vh] w-[90%] max-w-7xl mb-20 relative"
>
    <button
        onclick={() => {
            clearFilter();
            map.flyTo({
                center: initialView.center,
                zoom: isMobile ? mobileZoom : initialView.zoom,
            });
        }}
        class="font-utility-button-02 text-[#434343] absolute bottom-2.5 left-12 bg-white/95 px-3 py-2 shadow-[0_1px_4px_rgba(0,0,0,0.3)] rounded-md z-50 text-sm hover:bg-gray-100"
        >Reset View</button
    >
    {#if popupData}<Popup {popupData} {bboxAspectRatio} />{/if}
</div>
{#key routeData}
    {#if mapLoaded}
        {#each routeData as route}
            <MapLine
                geojson={JSON.parse(route.routeGeojson)}
                id={slugify(route.headline)}
                {map}
                {imageLoaded}
                {lineWidth}
                routeClicked={() => {
                    let bbox = getBBox([JSON.parse(route.routeGeojson)]);
                    bboxAspectRatio = getBBoxAspectRatio(bbox);
                    map.fitBounds(bbox, {
                        padding: 50,
                        offset: [
                            bboxAspectRatio < 0.5 ? 0 : -20,
                            bboxAspectRatio < 0.5 ? -50 : 0,
                        ],
                    });
                    popupData = route;
                }}
            />
        {/each}
    {/if}
{/key}
