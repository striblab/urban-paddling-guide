<script>
    import { onMount } from 'svelte';
    import maplibregl from 'maplibre-gl';    

    let mapContainer;

    onMount(() => {
        const map = new maplibregl.Map({
            container: mapContainer,
            style: 'https://api.maptiler.com/maps/streets/style.json?key=YOUR_MAPTILER_KEY',
            center: [-93.2650, 44.9778], // Minneapolis
            zoom: 11
        });

        // Optional: Add zoom and rotation controls
        map.addControl(new maplibregl.NavigationControl(), 'top-right');

        return () => map.remove(); // cleanup on destroy
    });
</script>

<div bind:this={mapContainer} class="map-container"></div>

<style>
    .map-container {
        width: 100%;
        height: 600px; /* adjust as needed */
    }

    /* Required by MapLibre for proper rendering */
    .maplibregl-map {
        font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
    }
</style>