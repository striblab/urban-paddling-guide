<script>
    import { slugify } from "../utilities";
    let { popupData, bboxAspectRatio, isMobile } = $props();
</script>

{#if popupData.headline}
   <!--  <div
        class="absolute {bboxAspectRatio < 0.5
            ? 'left-[45%]'
            : 'right-[2.5%]'} {bboxAspectRatio < 0.5
            ? 'top-[45%]'
            : 'bottom-[2.5%]'} z-10 w-[90%] max-w-[400px] transition-all duration-500"
    > -->
    <div
        class="absolute right-[2.5%] md:right-[5px] bottom-[20%] md:bottom-[5px] z-10 w-[95%] md:w-[49%] lg:w-[32%] transition-all duration-500"
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
                 <h3 class="text-[16px] my-4 font-graphik-regular leading-[1.3] md:block hidden">
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
