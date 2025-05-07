<script>
    import FilterButton from "./FilterButton.svelte";
    let offset = $state(0);

    const { filterByTag, activeFilter } = $props();

    const navBar = document.querySelector(
        "[data-testid='global-navigation-header']"
    );
    const updateOffset = () => {
        if (navBar) {
            offset = navBar.getBoundingClientRect().bottom;
        }
    };
</script>

<svelte:window onscroll={updateOffset} />

<div
    class="filters-wrapper w-[100%] mx-auto max-w-7xl py-4 mb-0 text-center sticky bg-[#fffbf4] z-[100] border-[#05442e] border-b"
    style="top: {offset}px;"
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
