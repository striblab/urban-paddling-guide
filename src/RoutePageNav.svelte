<script>
    import { slugify } from "./utilities";
    let { routes } = $props();
</script>

<div class="w-[90%] mx-auto">
    <h4
        class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2 text-center py-10 border-t border-[#05442e] max-w-2xl mx-auto"
    >
        Explore more routes
    </h4>

    <div class="flex flex-wrap justify-between">
        {#each routes as route}
            <a
                href="#/{slugify(route.headline)}"
                class="grid-item w-[48%] lg:w-[32%] hover:scale-[1.02] duration-500 block mb-4"
            >
                <div
                    class="route-preview font-publico-headline-medium bg-white border rounded-xl border-[#05442e] overflow-hidden"
                >
                    <img
                        src={route.heroImg
                            ? `https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/${route.heroImg}.jpg?w=400&h=266&fit=crop`
                            : "https://placehold.co/400x266"}
                        alt={route.heroImgAltText}
                        class="w-full"
                    />
                    <div class="text-wrapper p-2 md:p-4">
                        <h3 class="text-[18px] md:text-[20px]">
                            {route.headline}
                        </h3>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>
