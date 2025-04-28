export const slugify = (routeTitle) =>
    routeTitle.toLowerCase().replace(/ /g, "-");
