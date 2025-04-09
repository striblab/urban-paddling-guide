<script>
    const { route } = $props();

    import UpperMississippi from "./route-maps/UpperMississippi.svelte";
    import MississippiRiverGorge from "./route-maps/MississippiRiverGorge.svelte";
</script>

{#if route === "Upper Mississippi River"}
    <UpperMississippi />
{/if}

{#if route === "Mississippi River Gorge"}
    <MississippiRiverGorge />
{/if}
