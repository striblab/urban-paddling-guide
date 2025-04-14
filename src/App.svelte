<script>
    import Route from "./Route.svelte";
    import Hero from "./Hero.svelte";
    import Credits from "./Credits.svelte";
    import Filters from "./Filters.svelte";

    let selectedRoute = $state("");

    let routesLoaded = $state(false);
    let routeData = $state([]);
    let photoData = $state([]);

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
                    window.location.href = window.location.href.replace(
                        "#",
                        ""
                    );
                }
            } else {
                selectedRoute = "";
            }
            tagFilter = "";
        }
    });

    let tagFilter = $state("");

    loadRoutes();
    loadPhotos();
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
            secondaryPhotos={photoData.filter((p) =>
                p.route?.includes(
                    routeData.filter((r) => r.headline === selectedRoute)[0]
                        .routeID
                )
            )}
        />
        <div class="md:w-[90%] w-full mx-auto max-w-2xl">
            <Credits />
        </div>
    {:else if routesLoaded}
        <Hero />
        <Filters
            {routeData}
            filterByTag={(tag) => {
                tagFilter = tag;
            }}
        />
        <div
            class="route-preview-wrapper md:flex flex-wrap w-[90%] justify-between mx-auto max-w-8xl"
        >
            {#each routeData.filter( (r) => (tagFilter ? r.tags.includes(tagFilter) : true) ) as route}
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
        <div class="md:w-[90%] w-full mx-auto">
            <Credits />
        </div>
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

    div.route-preview-wrapper::after {
        content: "";
        flex: auto;
    }
    div.route-preview-wrapper a:last-child {
        margin-left: 2%;
    }
    @media only screen and (max-width: 1023px) {
        div.route-preview-wrapper a:last-child {
            margin-left: 0%;
        }
    }
</style>
