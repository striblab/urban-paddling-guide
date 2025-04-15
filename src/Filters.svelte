<script>
    import FilterButton from "./FilterButton.svelte";

    const { filterByTag } = $props();
    let activeFilter = $state("");

    const activateFilter = (tag) => {
        activeFilter = tag;
        filterByTag(tag);
    }
</script>

<div class="filters-wrapper w-[90%] mx-auto max-w-2xl my-12 mb-20 text-center">
    <h4 class="font-publico-headline-black md:text-[26px] text-[20px]">
        Click a route to read its detailed paddle guide, or use our filters to
        narrow down the choice of routes.
    </h4>
    <div
        class="flex flex-wrap items-center justify-center mt-8"
    >
        <h5
            class="uppercase font-graphik-bold tracking-widest text-[12px] md:text-[14px] text-[#05442e] mr-3 w-full md:w-auto mb-2 md:mb-0"
        >
            Filter by
        </h5>
        <FilterButton
            tag={"rentals"}
            label={"Rentals available"}
            {activeFilter}
            doFilter={(tag)=>{activateFilter(tag)}}
        />
        <FilterButton
            tag={"paddleboards"}
            label={"Paddleboard-friendly"}
            {activeFilter}
            doFilter={(tag)=>{activateFilter(tag)}}
        />
        <FilterButton
            tag={"intermediate paddlers"}
            label={"Intermediate skill level"}
            {activeFilter}
            doFilter={(tag)=>{activateFilter(tag)}}
        />
        <FilterButton
            tag={""}
            label={"Show all"}
            activeFilter={false}
            doFilter={(tag)=>{activateFilter(tag)}}
        />
    </div>
</div>
