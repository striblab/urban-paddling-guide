<script>
    const { tag, label, mobileLabel, activeFilter, doFilter } = $props();
    let w = $state(0);
</script>

<svelte:window bind:innerWidth={w} />
<div class="tag leading-[0.7]">
    <button
        class="inline-block p-2 mr-1 md:mr-2 mb-1 {activeFilter !== tag
            ? 'text-[#05442e]'
            : 'text-[white]'} hover:text-[#fffbf4] {activeFilter !== tag
            ? 'bg-[white]'
            : 'bg-[#05442e]'} hover:bg-[#05442e] rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px] md:text-[12px] transition-all duration-500"
        onclick={() => {
            doFilter(tag);
        }}
    >
        {w < 640 ? mobileLabel : label}
    </button>
</div>
