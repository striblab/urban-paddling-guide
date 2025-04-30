<script>
    import FilterButton from "./FilterButton.svelte";

    const { filterByTag } = $props();
    let activeFilter = $state("");

    const activateFilter = (tag) => {
        activeFilter = tag;
        filterByTag(tag);
    }
</script>

<div class="filters-wrapper w-[90%] mx-auto max-w-7xl py-4 mb-0 text-center sticky top-0 bg-[#fffbf4] z-[100] border-[#05442e] border-b">
    <div
        class="flex flex-wrap items-center justify-center mt-8"
    >
        <h5
            class="uppercase font-graphik-bold tracking-widest text-[12px] md:text-[12px] text-[#05442e] mr-3 w-full md:w-auto mb-2 md:mb-0"
        >
            Filter by
        </h5>
        <FilterButton
            tag={"paddleboards"}
            label={"Paddleboards"}
            {activeFilter}
            doFilter={(tag)=>{activateFilter(tag)}}
        /> 
        <FilterButton
            tag={"intermediate paddlers"}
            label={"Intermediate"}
            {activeFilter}
            doFilter={(tag)=>{activateFilter(tag)}}
        />
        <FilterButton
            tag={"rentals"}
            label={"Rentals"}
            {activeFilter}
            doFilter={(tag)=>{activateFilter(tag)}}
        />
        <!-- <FilterButton
            tag={"show-all"}
            label={"Show all"}
            activeFilter={false}
            doFilter={(tag)=>{activateFilter(tag)}}
        /> -->
    </div>
</div>
