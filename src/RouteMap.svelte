<script>
    let { route } = $props();

    import UpperMississippi from "./route-maps/UpperMississippi.svelte";
    import MississippiRiverGorge from "./route-maps/MississippiRiverGorge.svelte";
    import UpperMinnehahaCreek from "./route-maps/UpperMinnehahaCreek.svelte";
    import LowerMinnehahaCreek from "./route-maps/LowerMinnehahaCreek.svelte";
    import LowerMississippi from "./route-maps/LowerMississippi.svelte";
    import MinnesotaRiver from "./route-maps/MinnesotaRiver.svelte";
    import UpperRiceCreek from "./route-maps/UpperRiceCreek.svelte";
    import LowerRiceCreek from "./route-maps/LowerRiceCreek.svelte";
    import LebanonHills from "./route-maps/LebanonHills.svelte";
    import MinneapolisLakes from "./route-maps/MinneapolisLakes.svelte";
    import EastMetroLakes from "./route-maps/EastMetroLakes.svelte";
</script>

{#if route === "Upper Mississippi River"}
    <UpperMississippi />
{:else if route === "Mississippi River Gorge"}
    <MississippiRiverGorge />
{:else if route === "Upper Minnehaha Creek"}
    <UpperMinnehahaCreek />
{:else if route === "Lower Minnehaha Creek"}
    <LowerMinnehahaCreek />
{:else if route === "Lower Mississippi River"}
    <LowerMississippi />
{:else if route === "Minnesota River"}
    <MinnesotaRiver />
{:else if route === "Upper Rice Creek"}
    <UpperRiceCreek />
{:else if route === "Lower Rice Creek"}
    <LowerRiceCreek />
{:else if route === "Lebanon Hills"}
    <LebanonHills />
{:else if route === "Minneapolis Chain of Lakes"}
    <MinneapolisLakes />
{:else if route === "East Metro Chain of Lakes"}
    <EastMetroLakes />
{/if}
