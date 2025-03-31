<script>
    import Route from "./Route.svelte";
    let selectedRoute = $state("");
    import routeData from "./data/routes.json"

    const slugify = (routeTitle) => routeTitle.toLowerCase().replace(/ /g,"-")
    const slugs = routeData.map(r => slugify(r.headline))
    let hash = $state(window.location.hash)
    
    $effect(()=> {
        if (hash) {
            console.log(hash.replace("#/",""))
            if (slugs.includes(hash.replace("#/",""))) {
                selectedRoute = routeData.filter(r => slugify(r.headline) === hash.replace("#/",""))[0]?.headline
            }
            else {
                window.location.hash = ""
                window.location.href = window.location.href.replace("#","")
            }
        } else {
            selectedRoute = ""
        }
    })

</script>

<svelte:window on:hashchange={()=>{hash=window.location.hash}} />

<main class="">
    {#if selectedRoute}
        <Route routeData={routeData.filter(r => r.headline === selectedRoute)[0]}/>
    {:else}
        <ul>
            {#each routeData as route}
                <li class="font-publico-banner-black"><a href="#/{slugify(route.headline)}">{slugify(route.headline)}</a></li>
            {/each}
        </ul>
    {/if}
</main>

<style global>
    body {
        padding: 0px !important;
        margin: 0px !important;
        background: #fffbf4;
    }
</style>