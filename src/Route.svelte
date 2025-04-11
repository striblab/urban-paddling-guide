<script>
    import { onMount } from "svelte";
    import RouteMap from "./RouteMap.svelte";

    let topElement;

    let { routeData } = $props();
    let {
        headline,
        heroImg,
        heroImgCredit,
        subhead,
        tags,
        authors,
        summary,
        timeToComplete,
        nearbyCities,
        recommendedConditions,
        mapUrl,
        mapWidth,
        mapCredit,
        mapSource,
        startAddress,
        endAddress,
        mileage,
        gmapsRouteLink,
        stravaRouteLink,
        gpxLink,
        narrative,
        knowBeforeYouGo,
        Photos,
        routeID,
    } = $derived(routeData);

    const grafify = (copy) => {
        return copy.split("\n\n");
    };

    const getAuthorMarkup = (authors) => {
        if (authors.length === 1)
            return `<span class="author">${authors[0]}</span>`;
        if (authors.length === 2)
            return `<span class="author">${authors.join('</span> and <span class="author">')}</span>`;
        return `<span class="author">${authors.slice(0, -1).join('</span>, <span class="author">')}</span> and <span class="author">${authors[authors.length - 1]}</span>`;
    };

    const getKnowMarkup = (text) => {};

    onMount(() => {
        topElement.scrollIntoView();
    });
</script>

<div class="route w-full" bind:this={topElement}>
    <div
        class="headline-wrapper text-center w-[90%] mx-auto max-w-2xl pt-[10vh]"
    >
        <h1
            class="font-publico-headline-black text-[35px] md:text-[50px] mb-4"
        >
            {headline}
        </h1>
        <h2 class="font-graphik-regular uppercase text-[18px] tracking-widest mb-6">{subhead}</h2>
    </div>

    <div
        class="w-[90%] flex-module mx-auto max-w-6xl md:flex border-[#05442e] py-6 my-12 mb-8 justify-start border-t-1 pt-8 text-center border-t flex-wrap"
    >
        <div
            class="completion-time item border-b md:border-b-0 md:border-r border-[#05442e] w-full md:w-1/3 mb-6 md:mb-0 pb-6 md:px-8 md:pl-0"
        >
            <h5
                class="font-graphik-bold uppercase tracking-widest text-[14px] mb-2"
            >
                Time to complete
            </h5>
            <p class="font-graphik-regular text-[18px]">{timeToComplete}</p>
        </div>
        <div
            class="nearbyCities item border-b md:border-b-0 md:border-r border-[#05442e] w-full md:w-1/3 mb-6 md:mb-0 pb-6 md:px-8"
        >
            <h5
                class="font-graphik-bold uppercase tracking-widest text-[14px] mb-2"
            >
                Nearby Cities
            </h5>
            <p class="tag font-graphik-regular text-[18px]">
                {#each nearbyCities as city}
                    <span class="inline-block mr-2">{@html city},</span>
                {/each}
            </p>
        </div>
        <div
            class="recommended-conditions item w-full md:w-1/3 md:px-6 md:pr-0 md:mb-0"
        >
            <h5
                class="font-graphik-bold uppercase tracking-widest text-[14px] mb-2"
            >
                Recommended conditions
            </h5>
            <p class="tag font-graphik-regular text-[18px] mb-0">
                <span>{@html recommendedConditions}</span>
            </p>

        </div>
        <div class="w-full border-[#05442e] border-t mt-8 pt-8">
            <p class="tags">
                <span class="font-graphik-bold uppercase tracking-widest text-[14px] md:inline-block hidden">Good for: </span>
                <span class="font-graphik-bold uppercase tracking-widest text-[14px] md:hidden block mb-2">Good for</span>
            {#each tags as tag}
                <span  class="font-graphik-regular text-[18px] inline-block mr-2" >
                    {@html tag},
                </span
                >
            {/each}
        </p>
        </div>
    </div>
     

    <div
        class="hero-photo w-full h-[60vh] mb-8 md:mb-12 md:max-w-full md:h-screen md:mx-auto relative"
        style="background: url({heroImg}); background-size: cover;background-position: 50% 100%;"
    ></div>
    <div class="headline-wrapper w-[90%] mx-auto max-w-2xl">
        <div class="byline font-graphik-regular text-[16px] mt-6 mb-6">
            <p class="byline block md:hidden">
                Guide by <span class="font-graphik-semibold">{@html getAuthorMarkup(authors)}</span><br>Photo by
                <span class="font-graphik-semibold">{heroImgCredit}</span><br>Map by <span class="font-graphik-semibold">{mapCredit}</span>
            </p>
            <p class="byline md:block hidden leading-[1.8]"><span class="inline-block">
                Guide by <span class="font-graphik-semibold">{@html getAuthorMarkup(authors)}</span></span> <span class="inline-block">• Photo by
                <span class="font-graphik-semibold">{heroImgCredit}</span> • </span><span class="inline-block">Map by <span class="font-graphik-semibold">{mapCredit}</span></span>
            </p>
            <!-- <p class="byline uppercase font-graphik-regular text-[13px] tracking-widest mb-8">The Minnesota Star Tribune</p> -->
        </div>

        <div class="subhead font-publico-text-roman text-[18px] md:text-[21px] leading-[1.8] mb-12">
            <h3>{summary}</h3>
        </div>
    </div>

    {#if mapUrl}
        <div class="map mt-8 mb-8 w-[95%] mx-auto max-w-2xl overflow-x-auto">
            <RouteMap route={headline} />
            <div
                class="font-utility-body-reg-05 flex flex-row flex-wrap justify-between"
            >
                <p>
                    Source: {mapSource}
                </p>
            </div>
        </div>
    {/if}

    <div class="narrative w-[90%] mx-auto max-w-2xl">
        {#each grafify(narrative) as graf}
            <p
                class="mb-5 font-publico-text-roman text-[16px] md:text-[18px] leading-[1.3]"
            >
                {@html graf}
            </p>
        {/each}
    </div>

    <div class="photos w-[90%] mx-auto max-w-2xl mt-12 mb-12">
        <img src="https://placehold.co/1200x800" alt="placeholder" />
        <p
            class="text-left caption mx-auto max-w-2xl font-graphik-regular text-[14px] mt-2 md:w-full w-[90%]"
        >
            This will be the caption for the image. It will be a couple
            sentences describing waht is in it.
        </p>
    </div>

    <div
        class="know-before flex-module w-[90%] mx-auto max-w-2xl md:flex border-[#05442e] py-6 my-4 flex-wrap"
    >
        <h5
            class="font-publico-headline-black text-[22px] md:text-[25px] mb-4 w-full"
        >
            Know before you go
        </h5>
        {#each grafify(knowBeforeYouGo) as know}
            <p
                class="font-publico-text-roman text-[16px] md:text-[18px] leading-[1.3] mb-4"
            >
                {@html know}
            </p>
        {/each}
    </div>
</div>

<style type="text/css">
    p a {
        border-bottom: 1px solid #05442e;
    }
</style>
