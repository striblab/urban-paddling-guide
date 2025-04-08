<script>
    import Route from "./Route.svelte";
    import Hero from "./Hero.svelte";
    import Credits from "./Credits.svelte";
    import Filters from "./Filters.svelte";

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



<main class="bg-[#fffbf4] pb-12">

    {#if selectedRoute}
        <Route routeData={routeData.filter(r => r.headline === selectedRoute)[0]}/>
    {:else}
        <Hero />
        <Filters />
        <div class="route-preview-wrapper md:flex flex-wrap w-[90%] justify-between mx-auto max-w-8xl">
            {#each routeData as route}
                <a href="#/{slugify(route.headline)}" class="block md:w-[49%] lg:w-[32%] mb-8">
                    <div class="route-preview font-publico-banner-black bg-white border rounded-xl  border-[#05442e]">
                        <img src="{route.heroImg}?w=600&h=400&fit=crop" class="w-full">
                        <div class="text-wrapper p-6">
                            <h3 class="text-[28px] md:text-[32px] mb-2">{route.headline}</h3>
                            <h5 class="text-[13px] uppercase font-graphik-regular tracking-widest">{route.subhead}</h5>
                            <!-- <div class="tag-wrapper flex flex-wrap mb-2">
                                {#each route.tags as tag}
                                    <p class="tag leading-[0.7]"><span class="inline-block p-2 mr-1 mb-1 text-[#05442e] rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px]">{@html tag}</span></p>
                                {/each}
                            </div> -->
                        </div>
                    </div>
                </a>
            {/each}
        </div>
        <Credits/>
    {/if}
</main>

<style global>
    :global(body) {
        padding: 0px !important;
        margin: 0px !important;
        background: #fffbf4;
    }

    div.route-preview {
        overflow: hidden;
    }
</style>