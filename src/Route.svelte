<script>
    import { fade } from "svelte/transition";
    import RouteMap from "./RouteMap.svelte";

    let topElement = $state();
    let newPage = $state("");

    let { routeData, secondaryPhotos } = $props();
    let {
        headline,
        paddlerAlert,
        heroImg,
        heroImgCredit,
        heroImgAltText,
        subhead,
        tags,
        authors,
        summary,
        timeToComplete,
        nearbyCities,
        recommendedConditions,
        mapUrl,
        mapCredit,
        mapSource,
        startAddress,
        startAddressLinkOverride,
        endAddress,
        endAddressLinkOverride,
        mileage,
        gmapsRouteLink,
        stravaRouteLink,
        gpxLink,
        narrative,
        knowBeforeYouGo,
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

    $effect(() => {
        if (headline) {
            newPage = headline;
            topElement.scrollIntoView();
        }
    });
</script>

{#key newPage}
    <div class="pt-[10vh] md:pt-[10vh] mb-12" bind:this={topElement}>
        <button
            class="block mb-1 ml-[5%] md:mx-auto md:text-center text-[#05442e] hover:opacity-50 border-[#05442e] border-b uppercase font-graphik-medium tracking-widest text-[12px] md:text-[14px] transition duration-500"
            onclick={() => {
                window.location.hash = "#";
            }}
        >
            Back to all routes
        </button>
    </div>

    <div class="route w-full" in:fade>
        <div
            class="headline-wrapper text-left md:text-center w-[90%] mx-auto max-w-2xl"
        >
            <h1
                class="font-publico-headline-medium text-[35px] md:text-[50px] mb-4"
            >
                {headline}
            </h1>
            <h2
                class="font-graphik-regular uppercase text-[14px] md:text-[16px] tracking-widest mb-6"
            >
                {subhead}
            </h2>
        </div>

        <div
            class="w-[90%] flex-module mx-auto max-w-4xl flex border-[#b4c7c0] py-4 my-4 md:py-8 md:my-8 mb-4 justify-start pt-4 border-t flex-wrap md:text-center text-left"
        >
            <div
                class="completion-time item border-b md:border-b-0 md:border-r border-[#b4c7c0] w-full md:w-1/3 mb-4 md:mb-0 pb-4 md:px-8 md:pl-0"
            >
                <h5
                    class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2"
                >
                    Time to complete
                </h5>
                <p class="font-graphik-regular text-[16px] md:text-[18px]">
                    {timeToComplete}
                </p>
            </div>
            <div
                class="nearbyCities item border-r border-[#b4c7c0] w-1/2 md:w-1/3 md:mb-0 md:px-8 pr-6"
            >
                <h5
                    class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2"
                >
                    Nearby Cities
                </h5>
                <p class="tag font-graphik-regular text-[16px] md:text-[18px]">
                    {nearbyCities.join(", ")}
                </p>
            </div>
            <div
                class="recommended-conditions item w-1/2 md:w-1/3 md:px-6 md:pr-0 md:mb-0 pl-6"
            >
                <h5
                    class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2"
                >
                    Good for
                </h5>
                <p
                    class="tag font-graphik-regular text-[16px] md:text-[18px] mb-0"
                >
                    {tags.join(", ")}
                </p>
            </div>
        </div>
        <picture
            class="hero-photo w-full mb-10 md:mb-12 md:max-w-full md:mx-auto relative"
        >
            <source
                media="(min-width:901px)"
                srcset="https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/{heroImg}.jpg?w=1500"
            />
            <source
                media="(max-width:900px)"
                srcset="https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/{heroImg}_vertical.jpg?w=900"
            />
            <img
                src="https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/{heroImg}.jpg?fit=crop&crop=edges&w=1400&h=1000"
                class="w-full"
                alt={heroImgAltText}
            />
        </picture>
        <div class="headline-wrapper w-[90%] mx-auto max-w-2xl">
            <div class="byline font-graphik-regular text-[16px] mt-12 mb-6">
                <p class="byline block md:hidden">
                    Guide by <span class="font-graphik-semibold"
                        >{@html getAuthorMarkup(authors)}</span
                    ><br />Photo by
                    <span class="font-graphik-semibold">{heroImgCredit}</span
                    ><br />
                </p>
                <p class="byline md:block hidden leading-[1.8]">
                    <span class="inline-block">
                        Guide by <span class="font-graphik-semibold"
                            >{@html getAuthorMarkup(authors)}</span
                        ></span
                    >
                    <span class="inline-block"
                        >• Photo by
                        <span class="font-graphik-semibold"
                            >{heroImgCredit}</span
                        >
                    </span>
                </p>
            </div>

            <div
                class="subhead font-publico-headline-roman text-[20px] md:text-[23px] leading-[1.8] mb-0"
            >
                <h3>{summary}</h3>
            </div>

            {#if paddlerAlert}
                <div
                    class="max-w-2xl m-auto pt-8 mt-8 border-t border-[#b4c7c0] font-graphik-regular leading-[1.6] text-[18px]"
                >
                    <div class="flex items-start">
                        <svg id="strib-error-filled" viewBox="0 0 16 16" width="16" height="16" fill="rgb(214, 83, 83)" class="strib-icon strib-error-filled w-[25px] h-[25px] mt-[-2px] mr-2" xmlns="http://www.w3.org/2000/svg">
                          <!-- <path d="M8 12a.74.74 0 0 0 .416-.127.74.74 0 0 0 .319-.77.746.746 0 0 0-1.358-.269.75.75 0 0 0 .093.946c.141.141.331.22.53.22m-.666-8h1.334v5H7.334z"/>
                            <path d="M8 15a7.005 7.005 0 0 1-6.467-4.321A7 7 0 1 1 15 8a7 7 0 0 1-2.051 4.949A7 7 0 0 1 8 15M8 2a6 6 0 1 0-.001 12.002A6 6 0 0 0 8 2"/> -->
                            <path d="M8 1C4.15 1 1 4.15 1 8s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7m-.55 3h1.1v5.5h-1.1zM8 12.5c-.4 0-.75-.35-.75-.75S7.6 11 8 11s.75.35.75.75-.35.75-.75.75"/>

                        </svg>
                        <h5 class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2 text-[#d65353]">Paddler&rsquo;s alert</h5>
                    </div>
                    <p>{@html grafify(paddlerAlert)}</p>
                </div>
            {/if}
        </div>

        {#if mapUrl}
            <div
                class="map mt-0 mb-4 w-[100%] mx-auto max-w-2xl overflow-x-auto font-graphik-regular text-[18px] border-[#b4c7c0] py-10 my-12"
            >
                <div
                    class="md:w-full w-[90%] mx-auto max-w-2xl flex-module mx-auto flex justify-start py-8 mb-8 flex-wrap text-left border-t border-b border-[#b4c7c0]"
                >
                    <div
                        class="put-in item border-r border-[#b4c7c0] {endAddress
                            ? 'w-1/2'
                            : 'w-full'} {endAddress
                            ? 'md:w-2/5'
                            : 'md:w-1/2'} mb-0 md:px-6 px-4 pl-0 md:pl-0"
                    >
                        <h5
                            class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2"
                        >
                            {endAddress ? "Put in" : "Boat launch"}
                        </h5>
                        <p
                            class="font-graphik-regular text-[16px] md:text-[18px]"
                        >
                            <a
                                href="https://www.google.com/maps?q={startAddressLinkOverride
                                    ? startAddressLinkOverride
                                    : startAddress.replace('\n', ',')}"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                {@html startAddress.replace("\n", "<br/>")}
                            </a>
                        </p>
                    </div>
                    {#if endAddress}
                        <div
                            class="take-out item border-b-0 md:border-r border-[#b4c7c0] w-1/2 md:w-2/5 mb-0 pl-6"
                        >
                            <h5
                                class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2"
                            >
                                Take out
                            </h5>
                            <p
                                class="tag font-graphik-regular text-[16px] md:text-[18px]"
                            >
                                <a
                                    href="https://www.google.com/maps?q={endAddressLinkOverride
                                        ? endAddressLinkOverride
                                        : endAddress.replace('\n', ',')}"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {@html endAddress.replace("\n", "<br/>")}
                                </a>
                            </p>
                        </div>
                    {/if}
                    <div
                        class="distance item w-full md:w-1/5 pl-0 md:px-6 pr-0 mb-0 border-t md:border-t-0 border-[#b4c7c0] pt-6 mt-6 md:pl-6 md:pt-0 md:mt-0 pb-0"
                    >
                        <h5
                            class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2"
                        >
                            Distance
                        </h5>
                        <p
                            class="tag font-graphik-regular text-[16px] md:text-[18px] mb-0"
                        >
                            <span>{mileage} miles</span>
                        </p>
                    </div>
                    <div
                        class="w-full border-[#b4c7c0] border-t mt-4 pt-4 md:pt-8 md:mt-8"
                    >
                        <h5
                            class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-2"
                        >
                            Recommended conditions
                        </h5>
                        <p
                            class="max-w-3xl mx-auto font-graphik-regular text-[16px] md:text-[18px] mb-0"
                        >
                            {@html recommendedConditions}
                        </p>
                    </div>
                </div>

                <RouteMap route={headline} />
                <div class="md:w-full w-[90%] mx-auto max-w-2xl ">
                    <div
                        class="font-utility-body-reg-05 flex flex-row flex-wrap justify-between mt-2"
                    >
                        <p>
                            <strong>Source</strong>
                            {mapSource}
                        </p>
                    </div>

                    <div
                        class="flex font-graphik-regular uppercase tracking-widest text-[12px] mt-8"
                    >
                        <p class="mr-4 leading-[1.5]">
                            <a
                                href={gmapsRouteLink}
                                class="border-b border-[#05442e]"
                                >Show in Google Maps</a
                            >
                            •
                            <a
                                href={stravaRouteLink}
                                class="border-b border-[#05442e]"
                                >Show route in Strava</a
                            >
                            •
                            <a href={gpxLink} class="border-b border-[#05442e]"
                                >Download GPX</a
                            >
                        </p>
                    </div>
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

        {#if secondaryPhotos.length > 0}
            <div class="photos w-[90%] mx-auto max-w-2xl mt-12 mb-12">
                <img
                    src={secondaryPhotos[0].url}
                    alt={secondaryPhotos[0].altText}
                />
                <p
                    class="text-left caption mx-auto max-w-2xl font-graphik-regular text-[14px] mt-2 md:w-full"
                >
                    {secondaryPhotos[0].caption}. Photo by {secondaryPhotos[0]
                        .credit}, {secondaryPhotos[0].Publication}.
                </p>
            </div>
        {/if}

        <div
            class="know-before flex-module w-[90%] mx-auto max-w-2xl md:flex border-[#05442e] py-6 my-4 flex-wrap"
        >
            <h5
                class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] mb-4"
            >
                Know before you go  
            </h5>
            {#each grafify(knowBeforeYouGo) as know}
                <ul>
                    <li
                        class="font-graphik-regular text-[16px] md:text-[16px] leading-[1.3] mb-4 relative"
                    >
                        {@html know}
                    </li>
                </ul>
            {/each}
        </div>
    </div>
{/key}

<style>
    :global(.route a) {
        border-bottom: 1px solid #05442e;
    }

    :global(.route li strong) {
        font-family: "graphik-bold";
        display: inline;
    }

    li:before {
        position: absolute;
        top: 0px;
        content: "•";
        left: -12.5px;
    }

    @media only screen and (max-width: 400px) {
         li:before {
            left: -10px;
        }
    }

</style>
