<script>
    import { slugify, getBBox, getBBoxAspectRatio } from "../utilities";
    let { popupData, routeData, map, loadRoute } = $props();

    let routeIds = routeData.map((r) => r.routeID);
    let routeIdIndex = $derived(routeIds.indexOf(popupData?.routeID));
    let nextRouteId = $derived(
        routeIds[routeIdIndex === routeIds.length - 1 ? 0 : routeIdIndex + 1]
    );
    let prevRouteId = $derived(
        routeIds[routeIdIndex === 0 ? routeIds.length - 1 : routeIdIndex - 1]
    );

    onkeydown = (e) => {
        if (e.key === "ArrowLeft") loadRoute(prevRouteId);
        if (e.key === "ArrowRight") loadRoute(nextRouteId);
    };
</script>

{#if popupData.headline}
    <div
        class="absolute right-[2.5%] md:right-[0px] bottom-[20%] md:bottom-[0px] z-10 w-[95%] md:w-[49%] lg:w-[32%] transition-all duration-500"
    >
        <button
            class="absolute left-0 bg-white p-2"
            aria-label="previous route"
            onclick={() => {
                loadRoute(prevRouteId);
            }}><span class="strib-icon strib-arrow-left"></span></button
        >
        <button
            class="absolute right-0 bg-white p-2"
            aria-label="next route"
            onclick={() => {
                loadRoute(nextRouteId);
            }}>Next-&gt;</button
        >

        <div
            class="route-preview font-publico-headline-medium bg-white border rounded-xl border-[#05442e] overflow-hidden"
        >
            <img
                src={popupData.heroImg
                    ? `https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/${popupData.heroImg}.jpg?w=400&h=266&fit=crop`
                    : "https://placehold.co/400x266"}
                alt={popupData.heroImgAltText}
                class="w-full hidden md:block"
            />
            <div class="text-wrapper p-6 md:p-4">
                <h3 class="text-[24px] md:text-[28px] mb-2 leading-[1.2]">
                    {popupData.headline}
                </h3>
                <h5
                    class="text-[12px] uppercase font-graphik-regular tracking-widest leading-[1.1] mb-4"
                >
                    {popupData.subhead}
                </h5>
                <h3
                    class="text-[16px] my-4 font-graphik-regular leading-[1.3] md:block hidden"
                >
                    {popupData.summary}
                </h3>
                <a
                    class="mb-1 mx-auto text-[#05442e] hover:opacity-50 border-[#05442e] border-b uppercase font-graphik-medium tracking-widest text-[12px] transition duration-500"
                    href={"#/" + slugify(popupData.headline)}>View route</a
                >
            </div>
        </div>
    </div>
{/if}

<style type="text/css">
    @import url("https://static.startribune.com/assets/libs/strib-icons/1.0/strib-icons.min.css");
</style>
