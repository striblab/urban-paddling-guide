<script>
    import FilterButton from "./FilterButton.svelte";

    const { filterByTag, activeFilter } = $props();
</script>

<div
    class="filters-wrapper w-[100%] mx-auto max-w-7xl py-4 mb-0 text-center sticky top-0 bg-[#fffbf4] z-[100] border-[#05442e] border-b"
>
    <div class="flex flex-wrap items-center justify-center mt-8">
        <h5
            class="uppercase font-graphik-bold tracking-widest text-[12px] md:text-[12px] text-[#05442e] mr-3 w-full md:w-auto mb-2 md:mb-0"
        >
            Filter by
        </h5>
        <FilterButton
            tag={"paddleboards"}
            label={"Paddleboard-friendly"}
            mobileLabel={"Paddleboards"}
            {activeFilter}
            doFilter={(tag) => {
                filterByTag(tag);
            }}
        />
        <FilterButton
            tag={"rentals"}
            label={"Rentals available"}
            mobileLabel={"Rentals"}
            {activeFilter}
            doFilter={(tag) => {
                filterByTag(tag);
            }}
        />
    </div>
</div>
