<script>
    let { routes } = $props();
    const slugify = (routeTitle) => routeTitle.toLowerCase().replace(/ /g, "-");
</script>

<div class="md:w-[60%] mx-auto">
    <h4 class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2 text-center py-10 border-t border-[#05442e] max-w-2xl mx-auto">Explore more routes</h4>

    <div class="flex flex-row flex-wrap gap-3 md:gap-6 justify-center">
        {#each routes as route}
            <a href="#/{slugify(route.headline)}" class="grid-item max-w-[200px] md:max-w-[250px] hover:scale-[1.02] duration-500">
                <div
                    class="route-preview font-publico-headline-medium bg-white border rounded-xl border-[#05442e] overflow-hidden"
                >
                    <img
                        src={route.heroImg
                            ? `${route.heroImg}?w=400&h=266&fit=crop`
                            : "https://placehold.co/400x266"}
                        alt={route.heroImgAltText}
                        class="w-full"
                    />
                    <div class="text-wrapper p-2 md:p-4">
                        <h3 class="text-[16px] md:text-[20px]">
                            {route.headline}
                        </h3>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>
