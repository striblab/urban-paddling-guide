<script>
    const { tag, label, mobileLabel, activeFilter, doFilter } = $props();
    let w = $state(0);
    let clearing = $state(false);
</script>

<svelte:window bind:innerWidth={w} />
<div class="tag leading-[0.7]">
    <button
        class="inline-block p-2 mr-1 md:mr-2 mb-1 {activeFilter !== tag ||
        clearing
            ? 'text-[#05442e]'
            : 'text-[white]'} {!clearing
            ? 'hover:text-[#fffbf4]'
            : ''} {activeFilter !== tag || clearing
            ? 'bg-[white]'
            : 'bg-[#05442e]'} {!clearing
            ? 'hover:bg-[#05442e]'
            : ''} rounded-2xl border-[#05442e] border uppercase font-graphik-medium tracking-widest text-[12px] md:text-[12px] transition-all duration-500"
        onclick={() => {
            if (activeFilter == tag) clearing = true;
            doFilter(tag);
        }}
        onmouseleave={() => (clearing = false)}
    >
        {w < 640 ? mobileLabel : label}
    </button>
</div>
