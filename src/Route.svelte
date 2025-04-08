<script>
    let {routeData} = $props()
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
        narrative,
        knowBeforeYouGo,
        Photos,
        routeID
    } = $derived(routeData)

    const grafify = (copy) => {
        return copy.split("\n")
    }


</script>

<div class="route w-full">
    <div class="headline-wrapper w-[90%] mx-auto max-w-2xl pt-[10vh]">
        <h1 class="font-publico-headline-black text-[35px] md:text-[50px] md:mb-6 mb-4">{headline}</h1>
        <div class="tag-wrapper flex flex-wrap mb-12">
            {#each tags as tag}
                <p class="tag leading-[0.7]"><span class="inline-block p-2 mr-1 md:mr-2 mb-1 text-[#05442e] rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px] md:text-[14px] bg-white">{@html tag}</span></p>
            {/each}
        </div>
    </div>
    <div class="hero-photo w-full h-[60vh] mb-8 md:mb-12 md:max-w-full md:h-screen md:mx-auto relative"  style="background: url({heroImg}); background-size: cover;background-position: 50% 50%;"></div>
    <div class="headline-wrapper w-[90%] mx-auto max-w-2xl">
        <div class="byline font-graphik-semibold text-[15px] mt-6 mb-6">
            {#if authors.length > 1}
                <p class="byline">Guide by 
                    {#each authors as author}
                        <span class="author">{author}</span>
                    {/each} •  Photo by  <span class="author">{heroImgCredit}</span>
                </p>
            {:else}
                <p class="byline">Guide by <span class="author">{authors}</span> • Photo by 
                <span class="author">{heroImgCredit}</span></p>
            {/if}
        </div>
        
        <div class="subhead">
            <h2 class="font-publico-headline-light text-2xl">{subhead} but weren't we thinking this would be longer? did I miss it when i transfered the arc body? This is just to fill it out and Anna needs to look into it</h2>
        </div>
    </div>

    <div class="flex-module w-[90%] mx-auto max-w-6xl md:flex border-t-2 border-[#05442e] border-b-2
    py-6 my-12 justify-start">
        <div class="completion-time item border-b md:border-b-0 md:border-r border-[#05442e] w-full md:w-1/3 mb-6 md:mb-0 pb-6 md:px-8 md:pl-0">
            <h5 class="font-graphik-bold uppercase tracking-widest text-[14px] mb-2">Time to complete</h5>
            <p class="font-graphik-regular text-[18px]">{timeToComplete}</p>
        </div>
        <div class="nearbyCities item border-b md:border-b-0 md:border-r border-[#05442e] w-full md:w-1/3 mb-6 md:mb-0 pb-6 md:px-8">
            <h5 class="font-graphik-bold uppercase tracking-widest text-[14px] mb-2">Nearby Cities</h5>
            <p class="tag font-graphik-regular text-[18px]">
                {#each nearbyCities as city}
                    <span class="inline-block mr-2">{@html city},</span>
                {/each}
            </p>
        </div>
        <div class="recommended-conditions item w-full md:w-1/3 md:px-6 md:pr-0 md:mb-0">
            <h5 class="font-graphik-bold uppercase tracking-widest text-[14px] mb-2">Recommended conditions</h5>
            <p class="tag font-graphik-regular text-[18px] mb-0"><span>{@html recommendedConditions}</span></p>
        </div>
    </div>

    <div class="map mt-8 mb-8 w-[90%] mx-auto max-w-2xl ">
        {#if headline === "Upper Mississippi River"}
            <iframe src="//static.startribune.com/news/newsgraphics/ai2html-projects/051825-PADDLE/051825-PADDLE-upper_mississippi/051825-PADDLE-upper_mississippi.html" width="415" height="1150"></iframe>
        {/if}
    </div>
    <div class="narrative w-[90%] mx-auto max-w-2xl">
        {#each grafify(narrative) as graf}
            <p class="mb-5 font-publico-text-roman text-[16px] md:text-[18px] leading-[1.3]">{@html graf}</p>
        {/each}
    </div>

    <div class="photos w-full md:w-[90%] mx-auto max-w-6xl mt-12 mb-12">
        <img src="https://placehold.co/1200x800">
        <p class="caption w-[90%] mx-auto max-w-2xl font-graphik-regular text-[14px] mt-2">This will be the caption for the image. It will be a couple sentences describing waht is in it.</p>
    </div>

    <div class="know-before flex-module w-[90%] mx-auto max-w-2xl md:flex border-[#05442e] py-6 my-4 flex-wrap">
        <h5 class="font-publico-headline-black text-[22px] md:text-[25px] mb-4 w-full">Know before you go</h5>
        {#each grafify(knowBeforeYouGo) as know}
            <p class="font-publico-text-roman text-[16px] md:text-[18px] leading-[1.3] mb-4">{@html know}</p>
        {/each}
    </div>

</div>

<style type="text/css">
    p a {
        border-bottom: 1px solid #05442e;
    }

    iframe {
        width: 100%;
    }
</style>