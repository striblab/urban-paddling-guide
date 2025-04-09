<script>
    const { routeData, filterByTag } = $props();

    let selectedDifficultyTags = $state([]);
	let selectedWatercraftTags = $state([]);

    const difficultyTags = ["beginner", "easy", "intermediate"];
    const watercraftTags = ["canoes", "kayaks", "paddleboards"];

    let tags = new Set();
    routeData.forEach((r) => {
        r.tags.forEach((t) => {
            tags.add(t);
        });
    });
    const tagUniverse = Array.from(tags);
</script>

<div class="filters-wrapper w-[90%] mx-auto max-w-2xl my-12 mb-20 text-center">
    <h4 class="font-publico-headline-black md:text-[26px] text-[20px]">
        Click a route to read its detailed paddle guide, or use our filters to
        sort by difficulty and watercraft.
    </h4>
    <div
        class="filters-difficulty flex flex-wrap items-center justify-center mt-8"
    >
        <h5
            class="uppercase font-graphik-bold tracking-widest text-[12px] md:text-[14px] text-[#05442e] mr-3 w-full md:w-auto mb-2 md:mb-0"
        >
            Difficulty
        </h5>
        <div class="tag leading-[0.7]">
            <button
                class="inline-block p-2 mr-1 md:mr-2 mb-1 {selectedDifficultyTags.length !==
                0
                    ? 'text-[#05442e]'
                    : 'text-white'} hover:text-white {selectedDifficultyTags.length !== 0
                    ? 'bg-white'
                    : 'bg-[#05442e]'} hover:bg-[#05442e] rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px] md:text-[14px]"
                onclick={() => {
                    selectedDifficultyTags = [];
                    filterByTag("", "difficulty");
                }}
            >
                Any
            </button>
        </div>
        {#each tagUniverse.filter((t) => difficultyTags.includes(t)) as tag}
            <div class="tag leading-[0.7]">
                <button
                    class="inline-block p-2 mr-1 md:mr-2 mb-1 {!selectedDifficultyTags.includes(
                        tag
                    )
                        ? 'text-[#05442e]'
                        : 'text-white'} hover:text-white {!selectedDifficultyTags.includes(
                        tag
                    )
                        ? 'bg-white'
                        : 'bg-[#05442e]'} hover:bg-[#05442e] rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px] md:text-[14px]"
                    onclick={() => {
                        selectedDifficultyTags = [tag];
                        filterByTag(tag, "difficulty");
                    }}
                >
                    {tag}
                </button>
            </div>
        {/each}
    </div>
    <div
        class="filters-watercraft flex flex-wrap items-center justify-center mt-4 md:mt-2"
    >
        <h5
            class="uppercase font-graphik-bold tracking-widest text-[12px] md:text-[14px] text-[#05442e] mr-3 w-full md:w-auto mb-2 md:mb-0"
        >
            Watercraft
        </h5>
        <div class="tag leading-[0.7]">
            <button
                class="inline-block p-2 mr-1 md:mr-2 mb-1 {selectedWatercraftTags.length !==
                0
                    ? 'text-[#05442e]'
                    : 'text-white'} hover:text-white {selectedWatercraftTags.length !== 0
                    ? 'bg-white'
                    : 'bg-[#05442e]'} hover:bg-[#05442e] rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px] md:text-[14px]"
                onclick={() => {
                    selectedWatercraftTags = [];
                    filterByTag("", "watercraft");
                }}
            >
                Any
            </button>
        </div>
        {#each tagUniverse.filter((t) => watercraftTags.includes(t)) as tag}
            <div class="tag leading-[0.7]">
                <button
                    class="inline-block p-2 mr-1 md:mr-2 mb-1 {!selectedWatercraftTags.includes(
                        tag
                    )
                        ? 'text-[#05442e]'
                        : 'text-white'} hover:text-white {!selectedWatercraftTags.includes(
                        tag
                    )
                        ? 'bg-white'
                        : 'bg-[#05442e]'} hover:bg-[#05442e] rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px] md:text-[14px]"
                    onclick={() => {
                        selectedWatercraftTags = [tag];
                        filterByTag(tag, "watercraft");
                    }}
                >
                    {tag}
                </button>
            </div>
        {/each}
    </div>
</div>
