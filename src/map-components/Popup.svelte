<script>
    import { fade } from "svelte/transition";
    import { slugify } from "../utilities";
    let { popupData, routeData, loadRoute, closeRoute } = $props();

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

    const getFirstSentence = (string) => {
        let parts = string.split(".");
        let out = parts[0];
        if (out.slice(-2) == "St") out += parts[1];
        return out + ".";
    };
</script>

<div
    in:fade={{ duration: 500 }}
    class="absolute right-[5%] xl:right-[0px] bottom-[0%] md:bottom-[0px] z-10 w-[90%] md:w-[44%] lg:w-[32%] transition-all duration-500"
>
    <button
        aria-label="close"
        class="absolute right-0 top-0 md:hover:opacity-50 transition-all duration-500 p-4 rounded-tr-xl md:p-4"
        onclick={closeRoute}
    >
        <svg
            id="strib-close"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="#05442e"
            class="strib-icon strib-close"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m8 7.037-5.5-5.5-.963.963 5.5 5.5-5.5 5.5.963.963 5.5-5.5 5.5 5.5.963-.963-5.5-5.5 5.5-5.5-.963-.963z"
            />
        </svg>
    </button>
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
        <div class="text-wrapper p-6 pt-6 pb-14 md:pt-6">
            <h3 class="text-[24px] md:text-[28px] mb-2 leading-[1.2] w-[95%]">
                {popupData.headline}
            </h3>
            <h5
                class="text-[12px] uppercase font-graphik-regular tracking-widest leading-[1.1] mb-4"
            >
                {popupData.subhead}
            </h5>
            <h3
                class="text-[14px] md:text-[16px] mt-4 font-graphik-regular leading-[1.3]"
            >
                {getFirstSentence(popupData.summary)}
            </h3>
        </div>
    </div>
    <a
        class="mb-1 mx-auto text-[#05442e] hover:opacity-50 border-[#05442e] border-b uppercase font-graphik-medium tracking-widest text-[12px] transition duration-500 block absolute left-[50%] bottom-[10px] translate-x-[-50%]"
        href={"#/" + slugify(popupData.headline)}>View route</a
    >
    <button
        class="absolute left-0 bottom-0 bg-[#05442e] md:hover:bg-[#fffbf4] transition-all duration-500 p-2 px-4 md:p-4 rounded-bl-xl border-[#05442e] border"
        aria-label="previous route"
        onclick={() => {
            loadRoute(prevRouteId);
        }}
    >
        <svg
            id="strib-arrow-left"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="#fffbf4"
            class="strib-icon strib-arrow-left hover:opacity-50"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15 7.314v1.372H3.627l4.221 4.226-.968.968L1 8l5.88-5.88.968.968-4.221 4.226z"
            />
        </svg>
    </button>
    <button
        class="absolute right-0 bottom-0 bg-[#05442e] md:hover:bg-[#fffbf4] transition-all duration-500 p-2 px-4 md:p-4 rounded-br-xl border-[#05442e] border"
        aria-label="next route"
        onclick={() => {
            loadRoute(nextRouteId);
        }}
    >
        <svg
            id="strib-arrow-right"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="#fffbf4"
            class="strib-icon strib-arrow-right"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 7.314v1.372h11.373l-4.221 4.226.968.968L15 8 9.12 2.12l-.968.968 4.221 4.226z"
            />
        </svg>
    </button>
</div>

<style type="text/css">
    button:hover svg path {
        fill: #05442e;
        transition: 0.5s all;
    }
    #strib-close path {
        fill: white;
    }
    @media only screen and (max-width: 767px) {
        #strib-close path {
            fill: #05442e;
        }
        button:hover svg path {
            fill: #fffbf4;
            transition: 0s all;
        }
    }
</style>
