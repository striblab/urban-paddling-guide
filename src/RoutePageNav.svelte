<script>
    import { slugify } from "./utilities";
    let { routes } = $props();
    let hovered = $state("");
    let innerWidth = $state(0);
</script>

<svelte:window bind:innerWidth />
<div class="w-[90%] max-w-2xl mx-auto">
    <h4
        class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2 text-center py-10 pb-6 border-t border-[#05442e] max-w-2xl mx-auto"
    >
        Explore more routes
    </h4>

    <div class="route-page-nav">
        {#each routes as route}
            <a
                href="#/{slugify(route.headline)}"
                class="block mb-4 md:mb-6 relative"
                onmouseenter={() => {
                    if (innerWidth > 500) {
                        hovered = route.routeID;
                    }
                }}
                onmouseleave={() => {
                    if (innerWidth > 500) {
                        hovered = "";
                    }
                }}
            >
                <div
                    class="route-preview font-publico-headline-medium bg-white border rounded-xl border-[#05442e] overflow-hidden flex items-center relative w-full justify-between transition-all duration-500 {hovered &&
                    hovered !== route.routeID
                        ? 'opacity-60 saturate-0'
                        : 'opacity-100'}"
                >
                    <div
                        class="image block md:hidden w-[45%] min-h-[175px] md:min-h-[150px] h-full"
                        style="background: url(https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/{route.heroImg}_vertical.jpg?w=400&h=400&fit=crop&crop=bottom); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat;"
                    ></div>
                    <div
                        class="image hidden md:block w-[45%] min-h-[175px] h-full"
                        style="background: url(https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/{route.heroImg}.jpg?w=600&h=400&fit=crop&crop=bottom); background-size: cover; background-position: 50% 100%; background-repeat: no-repeat;"
                    ></div>
                    <div
                        class="text-wrapper p-2 md:p-4 w-[55%] pl-[5%] pr-[5%] md:w-[55%]"
                    >
                        <h3
                            class="text-[21px] md:text-[23px] mb-2 leading-[1.2]"
                        >
                            {route.headline}
                        </h3>
                        <h5
                            class="text-[12px] md:text-[14px] uppercase font-graphik-regular tracking-widest"
                        >
                            {route.subhead}
                        </h5>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>

<style type="text/css">
    /* div.route-preview:hover {
        transition: 1s all;
        transform: scale(104%);
    } */
</style>
