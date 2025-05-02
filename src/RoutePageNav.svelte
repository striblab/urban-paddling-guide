<script>
    import { slugify } from "./utilities";
    let { routes } = $props();
</script>

<div class="w-[90%] max-w-2xl mx-auto">
    <h4
        class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2 text-center py-10 border-t border-[#05442e] max-w-2xl mx-auto"
    >
        Explore more routes
    </h4>

    <div class="route-page-nav">
        {#each routes as route}
            <a
                href="#/{slugify(route.headline)}"
                class="block mb-4 md:mb-6 relative"
            >
                <div
                    class="route-preview font-publico-headline-medium bg-white border rounded-xl border-[#05442e] overflow-hidden flex items-center relative w-full justify-between hover:bg-[#05442e] hover:text-[#fffbf4] transition-all duration-500"
                >
                    <div class="image block md:hidden w-[37.5%] min-h-[120px] md:min-h-[150px] h-full" style="background: url(https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/{route.heroImg}_vertical.jpg?w=400&h=400&fit=crop); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat;">
                    </div>
                    <div class="image hidden md:block w-[45%] min-h-[150px] h-full" style="background: url(https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/{route.heroImg}.jpg?w=600&h=400&fit=crop); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat;">
                    </div>
                    <!-- <img
                        src={route.heroImg
                            ? `https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/${route.heroImg}.jpg?w=400&h=266&fit=crop`
                            : "https://placehold.co/400x266"}
                        alt={route.heroImgAltText}
                        class="w-[50%] max-w-[250px]"
                    /> -->
                    <div class="text-wrapper p-2 md:p-4 w-[62.5%] pl-[5%] pr-[5%] md:w-[55%]">
                        <h3 class="text-[20px] md:text-[23px] mb-1 md:mb-2">
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
