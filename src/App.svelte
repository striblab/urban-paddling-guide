<script>
    import Route from "./Route.svelte";
    import Hero from "./Hero.svelte";
    import Credits from "./Credits.svelte";
    import Filters from "./Filters.svelte";

    let selectedRoute = $state("");

    let routesLoaded = $state(false);
    let routeData = $state([]);

    const loadRoutes = async () => {
        const req = await fetch(
            "https://static.startribune.com/news/projects/all/urban-paddling-guide/data/routes.json"
        );
        if (req.ok) {
            routeData = await req.json();
            routesLoaded = true;
        }
    };

    const slugify = (routeTitle) => routeTitle.toLowerCase().replace(/ /g, "-");
    const slugs = $derived(routeData.map((r) => slugify(r.headline)));
    let hash = $state(window.location.hash);

    $effect(() => {
        if (routesLoaded) {
            if (hash) {
                if (slugs.includes(hash.replace("#/", ""))) {
                    selectedRoute = routeData.filter(
                        (r) => slugify(r.headline) === hash.replace("#/", "")
                    )[0]?.headline;
                } else {
                    window.location.hash = "";
                    window.location.href = window.location.href.replace("#", "");
                }
            } else {
                selectedRoute = "";
            }
        }
    });

    let difficultyFilter = $state("");
    let watercraftFilter = $state("");

    loadRoutes();
</script>

<svelte:window
    on:hashchange={() => {
        hash = window.location.hash;
    }}
/>

<main class="bg-[#fffbf4] pb-12">
    {#if selectedRoute}
        <Route
            routeData={routeData.filter((r) => r.headline === selectedRoute)[0]}
        />
    {:else if routesLoaded}
        <Hero />
        <Filters
            {routeData}
            filterByTag={(tag, type) => {
                if (type === "difficulty") {
                    difficultyFilter = tag;
                }
                if (type === "watercraft") {
                    watercraftFilter = tag;
                }
            }}
        />
        <div
            class="route-preview-wrapper md:flex flex-wrap w-[90%] justify-between mx-auto max-w-8xl"
        >
            {#each routeData
                .filter((r) => r.tags.includes(difficultyFilter) || !difficultyFilter)
                .filter((r) => r.tags.includes(watercraftFilter) || !watercraftFilter) as route}
                <a
                    href="#/{slugify(route.headline)}"
                    class="block md:w-[49%] lg:w-[32%] mb-8"
                >
                    <div
                        class="route-preview font-publico-banner-black bg-white border rounded-xl border-[#05442e]"
                    >
                        <img
                            src={route.heroImg
                                ? `${route.heroImg}?w=600&h=400&fit=crop`
                                : "https://placehold.co/600x400"}
                            alt={route.heroImgAltText}
                            class="w-full"
                        />
                        <div class="text-wrapper p-6">
                            <h3 class="text-[28px] md:text-[32px] mb-2">
                                {route.headline}
                            </h3>
                            <h5
                                class="text-[13px] uppercase font-graphik-regular tracking-widest"
                            >
                                {route.subhead}
                            </h5>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
        <Credits />
    {:else}
        <!--Todo: style loading thing-->
        Loading...
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
