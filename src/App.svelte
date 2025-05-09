<script>
    import Route from "./Route.svelte";
    import Hero from "./Hero.svelte";
    import Credits from "./Credits.svelte";
    import Filters from "./Filters.svelte";
    import RoutePageNav from "./RoutePageNav.svelte";
    import Map from "./Map.svelte";
    import { slugify, navBarOffset } from "./utilities";

    let selectedRoute = $state("");
    let routesLoaded = $state(false);
    let routeData = $state([]);
    let photoData = $state([]);
    const slugs = $derived(routeData.map((r) => slugify(r.headline)));
    let topEl = $state(undefined);
    let hashCount = $state(0);
    let tagFilter = $state("");
    let hash = $state(window.location.hash);
    let hovered = $state("");

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

    const navBar = document.querySelector(
        "[data-testid='global-navigation-header']"
    );
    const updateOffset = () => {
        if (navBar) {
            $navBarOffset = navBar.getBoundingClientRect().bottom;
        }
    };
</script>

<svelte:window
    on:hashchange={() => {
        hash = window.location.hash;
        hashCount += 1;
    }}
    onscroll={updateOffset}
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

        <div class="filters-sticky-wrapper relative pt-12">
            <h4
                class="font-graphik-medium md:text-[20px] text-[17px] w-[90%] mx-auto max-w-xl text-center"
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
            <div class="map-wrapper w-full h-full">
                <Map
                    routeData={routeData.filter((r) =>
                        tagFilter ? r.tags.includes(tagFilter) : true
                    )}
                    clearFilter={() => {
                        tagFilter = "";
                    }}
                />
            </div>
            <div
                class="route-preview-wrapper sm:flex flex-wrap w-[90%] justify-start gap-6 mx-auto max-w-7xl"
            >
                {#each routeData.filter( (r) => (tagFilter ? r.tags.includes(tagFilter) : true) ) as route}
                    <a
                        href="#/{slugify(route.headline)}"
                        class="block w-full md:w-[48%] lg:w-[31.5%] md:mb-0 mb-6"
                        onmouseenter={() => {
                            hovered = route.routeID;
                        }}
                        onmouseleave={() => {
                            hovered = "";
                        }}
                    >
                        <div
                            class="route-preview font-publico-headline-medium bg-white border rounded-xl border-[#05442e] transition-all duration-1000 {hovered &&
                            hovered !== route.routeID
                                ? 'opacity-60 saturate-0'
                                : 'opacity-100'}"
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
        transition: 0.5s all;
    }

    div.route-preview {
        transition: 0.5s all;
    }
</style>
