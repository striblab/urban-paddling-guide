<script>
    export let headline;
    export let subhead;
    export let heroImg;
    export let heroImgAltText;

    // Slugify function for hash routing
    const slugify = (text) =>
      text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
</script>
  
<div class="block">
  <div class="route-preview bg-white border rounded-xl border-[#05442e] overflow-hidden">
    <img
      src={heroImg
        ? `https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/${heroImg}.jpg?w=400&h=266&fit=crop`
        : 'https://placehold.co/400x266'}
      alt={heroImgAltText}
      class="w-full"
    />
    <div class="text-wrapper p-4">
      <h3 class="text-[18px] font-publico-headline-medium mb-1">
        {headline}
      </h3>
      <h5 class="text-[10px] uppercase font-graphik-regular tracking-widest">
        {subhead}
      </h5>
      <a
        href={"#/" + slugify(headline)}
        class="block mt-2 text-[12px] uppercase font-graphik-regular tracking-widest underline"
      >
        View route
      </a>
    </div>
  </div>
</div>