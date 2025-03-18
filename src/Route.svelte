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

    $inspect(routeData)
</script>

<h1 class="font-utility-heading-01">{headline}</h1>