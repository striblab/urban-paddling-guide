<script>
    import { onMount } from 'svelte';
    import maplibregl from 'maplibre-gl';
    import 'maplibre-gl/dist/maplibre-gl.css';
    import basemap from "./data/urban_paddling_basemap.json";
    import upperMississippi from './routes/upper_mississippi.json'; 
    import mississippiGorge from './routes/mississippi_gorge.json';
    import lowerMississippi from './routes/lower_mississippi.json';
    import upperMinnehaha from './routes/upper_minnehaha.json';
    import lowerMinnehaha from './routes/lower_minnehaha.json';
    import minnesota from './routes/minnesota.json';
    import lebanonHills from './routes/lebanon_hills.json';
    import mplsLakes from './routes/mpls_lakes.json';
    import eastLakes from './routes/east_lakes.json';
    
    let mapContainer;

    onMount(() => {
        const map = new maplibregl.Map({
            container: mapContainer,
            // @ts-ignore
            style: basemap,
            center: [-93.2650, 44.98], // Minneapolis
            zoom: 9.75,
            minZoom: 9.75,
            maxZoom: 14.75,
            maxBounds: [
                [-93.8, 44.6], // Southwest coordinates
                [-92.7, 45.3]  // Northeast coordinates
            ],
        });

        map.addControl(new maplibregl.NavigationControl(), 'top-right');

        map.on('load', () => {
          map.addSource('upper-mississippi', {
                type: 'geojson',
                // @ts-ignore
                data: upperMississippi
            });
            map.addLayer({
                id: 'upper-mississippi-line',
                type: 'line',
                source: 'upper-mississippi',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#EA8B8B',
                    'line-width': 3
                }
            }, 'road_footway-case');
            map.addSource('mississippi-gorge', {
                type: 'geojson',
                // @ts-ignore
                data: mississippiGorge
            });
            map.addLayer({
                id: 'mississippi-gorge-line',
                type: 'line',
                source: 'mississippi-gorge',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#EA8B8B',
                    'line-width': 3
                }
            }, 'road_footway-case');
            map.addSource('lower-mississippi', {
                type: 'geojson',
                // @ts-ignore
                data: lowerMississippi
            });
            map.addLayer({
                id: 'lower-mississippi-line',
                type: 'line',
                source: 'lower-mississippi',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#EA8B8B',
                    'line-width': 3
                }
            }, 'road_footway-case');
            map.addSource('upper-minnehaha', {
                type: 'geojson',
                // @ts-ignore
                data: upperMinnehaha
            });
            map.addLayer({
                id: 'upper-minnehaha-line',
                type: 'line',
                source: 'upper-minnehaha',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#EA8B8B',
                    'line-width': 3
                }
            }, 'road_footway-case');
            map.addSource('lower-minnehaha', {
                type: 'geojson',
                // @ts-ignore
                data: lowerMinnehaha
            });
            map.addLayer({
                id: 'lower-minnehaha-line',
                type: 'line',
                source: 'lower-minnehaha',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#EA8B8B',
                    'line-width': 3
                }
            }, 'road_footway-case');
            map.addSource('minnesota', {
                type: 'geojson',
                // @ts-ignore
                data: minnesota
            });
            map.addLayer({
                id: 'minnesota-line',
                type: 'line',
                source: 'minnesota',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#EA8B8B',
                    'line-width': 3
                }
            }, 'road_footway-case');
            map.addSource('lebanon-hills', {
                type: 'geojson',
                // @ts-ignore
                data: lebanonHills
            });
            map.addLayer({
                id: 'lebanon-hills-line',
                type: 'line',
                source: 'lebanon-hills',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#EA8B8B',
                    'line-width': 3
                }
            }, 'road_footway-case');
            map.addSource('mpls-lakes', {
                type: 'geojson',
                // @ts-ignore
                data: mplsLakes
            });
            map.addLayer({
                id: 'mpls-lakes-line',
                type: 'line',
                source: 'mpls-lakes',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#EA8B8B',
                    'line-width': 3
                }
            }, 'road_footway-case');
            map.addSource('east-lakes', {
                type: 'geojson',
                // @ts-ignore
                data: eastLakes
            });
            map.addLayer({
                id: 'east-lakes-line',
                type: 'line',
                source: 'east-lakes',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#EA8B8B',
                    'line-width': 3
                }
            }, 'road_footway-case');
        });

        // disable scroll zoom by default
        map.scrollZoom.disable();

        // detect Mac vs Windows for modifier key
        const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

        // control scroll zoom per wheel event instead of toggle handlers
        const canvas = map.getCanvas();
        const wheelHandler = (event) => {
          const isModifierPressed = isMac ? event.metaKey : event.ctrlKey;
          if (isModifierPressed) {
            map.scrollZoom.enable();
          } else {
            map.scrollZoom.disable();
          }
        }

        canvas.addEventListener('wheel', wheelHandler, { passive: false });

        return () => {
            map.remove();
            canvas.removeEventListener('wheel', wheelHandler);
        }; // cleanup on destroy

    });
    
</script>

<div bind:this={mapContainer} class="map-container mx-auto h-[80vh] w-[90%] max-w-7xl mb-20 relative"></div>