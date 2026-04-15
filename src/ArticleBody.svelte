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
    let hovered = $state("");

    const loadRoutes = async () => {
        const req = await fetch(
            "https://static.startribune.com/news/projects/all/urban-paddling-guide/data/routes.json",
        );
        if (req.ok) {
            routeData = await req.json();
            routesLoaded = true;
        }
    };

    const loadPhotos = async () => {
        const req = await fetch(
            "https://static.startribune.com/news/projects/all/urban-paddling-guide/data/photos.json",
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
                        (r) => slugify(r.headline) === hash.replace("#/", ""),
                    )[0]?.headline;
                } else {
                    window.location.hash = "";
                    window.location.href = window.location.href.replace(
                        "#",
                        "",
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
    <div
        class="w-[90%] font-publico-text-roman text-18 md:text-20 leading-[1.6] max-w-2xl mx-auto pt-0 intro"
    >
        <p class="mb-4">
            You don’t have to go to the Boundary Waters to have fun paddling a
            canoe.
        </p>
        <p class="mb-4">
            In Minnesota, we pride ourselves on being connected to water. But
            getting out there is easier said than done. Where do I put in my
            boat? How fast is too fast for moving water? How long will this
            take? Are there rentals? The information you need is all over the
            place, if you can find it at all.
        </p>
        <p class="mb-4">
            We thought it could be easier, so some water-loving Minnesota Star
            Tribune staff members set out to create an urban paddling guide. We
            researched, paddled and mapped our favorite routes within the metro
            area.
        </p>
        <p class="mb-6">
            We hope this guide helps you see the Twin Cities in new ways: take a
            lazy river ride toward the Minneapolis skyline; explore a
            little-seen part of St. Paul; practice portaging at Lebanon Hills in
            the southern suburbs. Please tag <a
                href="http://instagram.com/startribune"
                target="_blank">@startribune</a
            >
            in your urban paddling photos, and submit any questions about urban paddling
            to us
            <a
                href="https://star-tribune.forms.fm/urban-paddling/forms/9999"
                target="_blank">using this form.</a
            > See you on the water.
        </p>
        <div class="pt-2 pb-0">
            <h5
                class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] my-4 text-left md:text-center"
            >
                While you’re out there, don’t forget to
            </h5>
            <ul
                class="mb-6 font-graphik-regular text-[16px] md:text-[18px] leading-[1.3] relative"
            >
                <li class="mb-2 md:mb-4">
                    <span class="font-publico-headline-bold"
                        >Bring a life jacket.</span
                    > State law requires one for each person on board your watercraft.
                </li>
                <li class="mb-2 md:mb-4">
                    <span class="font-publico-headline-bold">Think twice</span>
                    before paddling in winds over 10 mph.
                </li>
                <li class="mb-2 md:mb-4">
                    <span class="font-publico-headline-bold"
                        >Watch water levels</span
                    > on rivers and creeks.
                </li>
                <li class="mb-2 md:mb-4">
                    <span class="font-publico-headline-bold"
                        >Swim with care.</span
                    >
                </li>
                <li class="mb-2 md:mb-4">
                    <span class="font-publico-headline-bold">Be mindful</span> of
                    private property.
                </li>
            </ul>
        </div>
    </div>
    {#if selectedRoute}
        <Route
            routeData={routeData.filter((r) => r.headline === selectedRoute)[0]}
            secondaryPhotos={photoData.filter((p) =>
                p.route?.includes(
                    routeData.filter((r) => r.headline === selectedRoute)[0]
                        .routeID,
                ),
            )}
        />
        <RoutePageNav
            routes={routeData.filter((r) => r.headline !== selectedRoute)}
        />
        <Credits />
    {:else if routesLoaded}
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
                        tagFilter ? r.tags.includes(tagFilter) : true,
                    )}
                    clearFilter={() => {
                        tagFilter = "";
                    }}
                />
            </div>
            <div
                class="route-preview-wrapper mt-6 sm:flex flex-wrap w-[90%] justify-start gap-6 mx-auto max-w-7xl"
            >
                {#each routeData.filter( (r) => (tagFilter ? r.tags.includes(tagFilter) : true), ) as route}
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

    :global(#proj-body .maplibregl-cooperative-gesture-screen) {
        z-index: 20;
    }

    div.route-preview {
        overflow: hidden;
        transition: 0.5s all;
    }

    div.route-preview {
        transition: 0.5s all;
    }

    :global(.intro p a) {
        border-bottom: 1px solid #05442e;
        transition: 0.5s opacity;
    }
    :global(.intro p a:hover) {
        opacity: 0.5;
        transition: 0.5s opacity;
    }
    li {
        position: relative;
    }
    li:before {
        content: "•";
        position: absolute;
        left: -15px;
        height: 10px;
    }

    ul {
        column-count: 2;
        column-gap: 60px;
    }

    @media only screen and (max-width: 400px) {
        li:before {
            left: -10px;
        }
        ul {
            column-count: 1;
        }
    }
</style>
