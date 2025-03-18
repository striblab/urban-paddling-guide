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

<h1 class="font-utility-heading-01">{headline}</h1>

{#each grafify(narrative) as graf}
    <p class="mb-5">{@html graf}</p>
{/each}