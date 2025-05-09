import { writable } from "svelte/store";

export const slugify = (routeTitle) =>
    routeTitle.toLowerCase().replace(/ /g, "-");

export const getBBox = (geojsons) => {
    let lons = [];
    let lats = [];
    geojsons.forEach((geojson) => {
        const features = geojson.features;
        features.forEach((feature) => {
            const geom = feature.geometry;
            const allCoords =
                geom.type === "LineString"
                    ? geom.coordinates
                    : geom.coordinates.flat();
            lons.push(...allCoords.map((c) => c[0]));
            lats.push(...allCoords.map((c) => c[1]));
        });
    });
    let bounds = [
        [0, 0],
        [0, 0],
    ];
    bounds = [
        [Math.min(...lons), Math.min(...lats)],
        [Math.max(...lons), Math.max(...lats)],
    ];
    return bounds;
};

export const getBBoxAspectRatio = (bbox) => {
    const length = bbox[1][1] - bbox[0][1];
    const height = bbox[1][0] - bbox[0][0];
    return length / height;
};

export const navBarOffset = writable(0);
export const stickyFiltersOffset = writable(0);

export const scrollToTargetAdjusted = (node, offset) => {
    var elementPosition = node.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
    });
};
