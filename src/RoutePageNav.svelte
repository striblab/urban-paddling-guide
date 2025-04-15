<script>
    let { routes } = $props();
    const slugify = (routeTitle) => routeTitle.toLowerCase().replace(/ /g, "-");
</script>

<div class="md:w-[80%] mx-auto">
    <h4 class="font-publico-headline-black text-[22px] md:text-[25px] mb-4 w-full mx-6">Explore more routes</h4>

    <div class="flex flex-row flex-wrap gap-6 justify-center">
        {#each routes as route}
            <a href="#/{slugify(route.headline)}" class="block w-[100%] max-w-[400px] md:max-w-[300px] md:mb-8">
                <div
                    class="route-preview font-publico-banner-black bg-white border rounded-xl border-[#05442e] overflow-hidden"
                >
                    <img
                        src={route.heroImg
                            ? `${route.heroImg}?w=400&h=266&fit=crop`
                            : "https://placehold.co/400x266"}
                        alt={route.heroImgAltText}
                        class="w-full"
                    />
                    <div class="text-wrapper p-6">
                        <h3 class="text-[13px] md:text-[18px] mb-2">
                            {route.headline}
                        </h3>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>
