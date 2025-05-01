<script>
    import Route from "./Route.svelte";
    import Hero from "./Hero.svelte";
    import Credits from "./Credits.svelte";
    import Filters from "./Filters.svelte";
    import RoutePageNav from "./RoutePageNav.svelte";
    import Map from "./Map.svelte";
    import { slugify } from "./utilities";

    let selectedRoute = $state("");
    let routesLoaded = $state(false);
    let routeData = $state([]);
    let photoData = $state([]);
    const slugs = $derived(routeData.map((r) => slugify(r.headline)));
    let topEl = $state(undefined);
    let hashCount = $state(0);
    let tagFilter = $state("");
    let hash = $state(window.location.hash);

    const loadRoutes = async () => {
        const req = await fetch(
            "https://static.startribune.com/news/projects/all/urban-paddling-guide/data/routes.json"
        );
        if (req.ok) {
            routeData = await req.json();
            routesLoaded = true;
        }
    };

    const loadPhotos = async () => {
        const req = await fetch(
            "https://static.startribune.com/news/projects/all/urban-paddling-guide/data/photos.json"
        );
        if (req.ok) {
            photoData = await req.json();
        }
    };

    $effect(() => {
        if (routesLoaded) {
            if (hash) {
                if (slugs.includes(hash.replace("#/", ""))) {
                    selectedRoute = routeData.filter(
                        (r) => slugify(r.headline) === hash.replace("#/", "")
                    )[0]?.headline;
                } else {
                    window.location.hash = "";
                    window.location.href = window.location.href.replace(
                        "#",
                        ""
                    );
                }
            } else {
                selectedRoute = "";
                if (hashCount > 1) {
                    setTimeout(() => topEl.scrollIntoView()), 0;
                }
            }
            tagFilter = "";
        }
    });

    loadRoutes();
    loadPhotos();
</script>

<svelte:window
    on:hashchange={() => {
        hash = window.location.hash;
        hashCount += 1;
    }}
/>

<main class="bg-[#fffbf4] pb-12">
    {#if selectedRoute}
        <Route
            routeData={routeData.filter((r) => r.headline === selectedRoute)[0]}
            secondaryPhotos={photoData.filter((p) =>
                p.route?.includes(
                    routeData.filter((r) => r.headline === selectedRoute)[0]
                        .routeID
                )
            )}
        />
        <RoutePageNav
            routes={routeData.filter((r) => r.headline !== selectedRoute)}
        />
        <Credits />
    {:else if routesLoaded}
        <Hero />
        <div bind:this={topEl}></div>

        <div class="filters-sticky-wrapper relative">
            <h4
                class="font-publico-headline-medium md:text-[24px] text-[20px] w-[90%] mx-auto max-w-2xl text-center"
            >
                Click a route to read its detailed paddle guide, or use our
                filters to narrow down the choice of routes.
            </h4>
            <Filters
                activeFilter={tagFilter}
                filterByTag={(tag) => {
                    tagFilter = tagFilter == tag ? "" : tag;
                }}
            />
            <Map
                routeData={routeData.filter((r) =>
                    tagFilter ? r.tags.includes(tagFilter) : true
                )}
                clearFilter={() => {
                    tagFilter = "";
                }}
            />
            <div
                class="route-preview-wrapper md:flex flex-wrap w-[90%] justify-center gap-x-6 mx-auto max-w-7xl"
            >
                {#each routeData.filter( (r) => (tagFilter ? r.tags.includes(tagFilter) : true) ) as route}
                    <a
                        href="#/{slugify(route.headline)}"
                        class="block md:w-[49%] lg:w-[32%] mb-8"
                    >
                        <div
                            class="route-preview font-publico-headline-medium bg-white border rounded-xl border-[#05442e]"
                        >
                            <img
                                src={route.heroImg
                                    ? `https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/${route.heroImg}.jpg?w=600&h=400&fit=crop`
                                    : "https://placehold.co/400x266"}
                                alt={route.heroImgAltText}
                                class="w-full"
                            />
                            <div class="text-wrapper p-6">
                                <h3 class="text-[24px] md:text-[28px] mb-2">
                                    {route.headline}
                                </h3>
                                <h5
                                    class="text-[12px] uppercase font-graphik-regular tracking-widest"
                                >
                                    {route.subhead}
                                </h5>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
        <Credits wide={true} />
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

    :global(#proj-container .maplibregl-cooperative-gesture-screen) {
        z-index: 20;
    }

    div.route-preview {
        overflow: hidden;
    }

    div.route-preview-wrapper::after {
        content: "";
        flex: auto;
    }
    /*div.route-preview-wrapper a:last-child {
        margin-left: 2%;
    }
    @media only screen and (max-width: 1023px) {
        div.route-preview-wrapper a:last-child {
            margin-left: 0%;
        }
    }*/
</style>
