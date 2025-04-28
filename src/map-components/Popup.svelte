<script>
    import { slugify } from "../utilities";
    let { popupData } = $props();
</script>

{#if popupData.headline}
    <div class="absolute left-[60%] top-[25%] z-10 max-w-[300px]">
        <div
            class="route-preview font-publico-headline-medium bg-white border rounded-xl border-[#05442e] overflow-hidden"
        >
            <img
                src={popupData.heroImg
                    ? `https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/${popupData.heroImg}.jpg?w=400&h=266&fit=crop`
                    : "https://placehold.co/400x266"}
                alt={popupData.heroImgAltText}
                class="w-full"
            />
            <div class="text-wrapper p-2 md:p-4">
                <h3 class="text-[16px] md:text-[20px] pb-4">
                    {popupData.headline}
                </h3>
                <a
                    class="mb-1 mx-auto text-[#05442e] hover:opacity-50 border-[#05442e] border-b uppercase font-graphik-medium tracking-widest text-[12px] md:text-[14px] transition duration-500"
                    href={"#/" + slugify(popupData.headline)}>View route</a
                >
            </div>
        </div>
    </div>
{/if}
