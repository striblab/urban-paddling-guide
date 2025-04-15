<script>
    const { routeData, filterByTag } = $props();
    let activeFilter = $state("");
</script>

<div class="filters-wrapper w-[90%] mx-auto max-w-2xl my-12 mb-20 text-center">
    <h4 class="font-publico-headline-black md:text-[26px] text-[20px]">
        Click a route to read its detailed paddle guide, or use our filters to
        sort by difficulty and watercraft.
    </h4>
    <div
        class="flex flex-wrap items-center justify-center mt-8"
    >
        <h5
            class="uppercase font-graphik-bold tracking-widest text-[12px] md:text-[14px] text-[#05442e] mr-3 w-full md:w-auto mb-2 md:mb-0"
        >
            Filter by
        </h5>
        <div class="tag leading-[0.7]">
            <button
                class="inline-block p-2 mr-1 md:mr-2 mb-1 {activeFilter !== "rentals"
                    ? 'text-[#05442e]'
                    : 'text-white'} hover:text-white {activeFilter !== "rentals"
                    ? 'bg-white'
                    : 'bg-[#05442e]'} hover:bg-[#05442e] rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px] md:text-[14px]"
                onclick={() => {
                    activeFilter = "rentals";
                    filterByTag("rentals");
                }}
            >
                Rentals available
            </button>
        </div>
        <div class="tag leading-[0.7]">
            <button
                class="inline-block p-2 mr-1 md:mr-2 mb-1 {activeFilter !== "paddleboards"
                    ? 'text-[#05442e]'
                    : 'text-white'} hover:text-white {activeFilter !== "paddleboards"
                    ? 'bg-white'
                    : 'bg-[#05442e]'} hover:bg-[#05442e] rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px] md:text-[14px]"
                onclick={() => {
                    activeFilter = "paddleboards";
                    filterByTag("paddleboards");
                }}
            >
                Paddleboard-friendly
            </button>
        </div>
        <div class="tag leading-[0.7]">
            <button
                class="inline-block p-2 mr-1 md:mr-2 mb-1 {activeFilter !== "intermediate paddlers"
                    ? 'text-[#05442e]'
                    : 'text-white'} hover:text-white {activeFilter !== "intermediate paddlers"
                    ? 'bg-white'
                    : 'bg-[#05442e]'} hover:bg-[#05442e] rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px] md:text-[14px]"
                onclick={() => {
                    activeFilter ="intermediate paddlers";
                    filterByTag("intermediate paddlers");
                }}
            >
                Intermediate skill level
            </button>
        </div>
        <div class="tag leading-[0.7]">
            <button
                class="inline-block p-2 mr-1 md:mr-2 mb-1 text-[#05442e] hover:text-white bg-white
                    hover:bg-[#05442e] rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px] md:text-[14px]"
                onclick={() => {
                    activeFilter = "";
                    filterByTag("");
                }}
            >
                Show all
            </button>
        </div>
    </div>
</div>
