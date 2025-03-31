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
    <div class="hero-photo w-full h-[60vh] mb-8 md:mb-12 md:max-w-full md:h-[80vh] md:mx-auto relative"  style="background: url({heroImg}); background-size: cover;background-position: 50% 50%;">

    </div>
    <div class="headline-wrapper w-[90%] mx-auto max-w-2xl">
        <h1 class="font-publico-headline-black text-[35px] md:text-[50px] mb-3">{headline}</h1>
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
        <div class="tag-wrapper flex flex-wrap mb-4">    
            {#each tags as tag}
                <p class="tag leading-[0.7]"><span class="inline-block p-2 mr-1 mb-1 text-[#05442e] rounded-2xl border-[#05442e] border-2 uppercase font-graphik-semibold tracking-widest text-[11px]">{@html tag}</span></p>
            {/each}
        </div>
        
        <div class="subhead">
            <h2 class="font-publico-headline-light text-xl">{subhead} but weren't we thinking this would be longer? did I miss it when i transfered the arc body? This is just to fill it out and Anna needs to look into it</h2>
        </div>
    </div>

    <div class="flex-module w-[90%] mx-auto max-w-2xl md:flex border-t-2 border-[#05442e] border-b-2
    py-6 my-6">
        <div class="completion-time item border-b border-[#05442e] w-full md:w-1/3 mb-4 pb-4">
            <h5 class="font-graphik-bold uppercase tracking-widest text-[14px] mb-2">Time to complete</h5>
            <p class="font-graphik-regular text-[17px]">{timeToComplete}</p>
        </div>
        <div class="nearbyCities item border-b border-[#05442e] w-full md:w-1/3 mb-4 pb-4">
            <h5 class="font-graphik-bold uppercase tracking-widest text-[14px] mb-2">Nearby Cities</h5>
            {#each nearbyCities as city}
                <p class="tag font-graphik-regular text-[17px]"><span>{@html city}, </span></p>
            {/each}
        </div>
        <div class="recommended-conditions item w-full md:w-1/3">
            <h5 class="font-graphik-bold uppercase tracking-widest text-[14px] mb-2">Recommended conditions</h5>
            <p class="tag font-graphik-regular text-[17px] mb-0"><span>{@html recommendedConditions}</span></p>
        </div>
    </div>

    <div class="map mt-8 mb-8 w-[90%] mx-auto max-w-2xl ">
        {#if headline === "Upper Mississippi River"}
            <iframe src="//static.startribune.com/news/newsgraphics/ai2html-projects/051825-PADDLE/051825-PADDLE-upper_mississippi/051825-PADDLE-upper_mississippi.html" width="415" height="1150"></iframe>
        {/if}
    </div>
    <div class="narrative w-[90%] mx-auto max-w-2xl">
        {#each grafify(narrative) as graf}
            <p class="mb-5 font-publico-text-roman text-[17px] leading-[1.3]">{@html graf}</p>
        {/each}
    </div>

    <div class="photos w-full md:w-[90%] mx-auto max-w-6xl mt-12 mb-12">
        <img src="https://placehold.co/1200x800">
        <p class="caption w-[90%] mx-auto max-w-2xl font-graphik-regular text-[14px] mt-2">This will be the caption for the image. It will be a couple sentences describing waht is in it.</p>
    </div>

    <div class="know-before flex-module w-[90%] mx-auto max-w-2xl md:flex border-t-2 border-[#05442e] border-b-2 py-6 my-6">
        <h5 class="font-graphik-bold uppercase tracking-widest text-[14px] mb-2">Know before you go</h5>
        {#each grafify(knowBeforeYouGo) as know}
            <p class="mb-5">{@html know}</p>
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