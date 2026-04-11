<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const darkMatcher = window.matchMedia("(prefers-color-scheme: dark)");

const colors = {
  light: {
    ocean: "#b8cfe0",
    land: "#f0ebe0",
    coastline: "#8a7a60",
    rivers: "#b8cfe0",
  },
  dark: {
    ocean: "#0d1520",
    land: "#1e1a12",
    coastline: "#C5A059",
    rivers: "#3E4A59",
  },
};

function getColors() {
  return darkMatcher.matches ? colors.dark : colors.light;
}

const mapContainer = ref<HTMLDivElement>();
let map: maplibregl.Map | null = null;

function buildStyle() {
  const c = getColors();
  return {
    version: 8 as const,
    sources: {
      land: { type: "geojson" as const, data: "/ne_110m_land.geojson" },
      coastline: {
        type: "geojson" as const,
        data: "/ne_110m_coastline.geojson",
      },
      rivers: {
        type: "geojson" as const,
        data: "/ne_110m_rivers_lake_centerlines.geojson",
      },
    },
    layers: [
      {
        id: "background",
        type: "background" as const,
        paint: { "background-color": c.ocean },
      },
      {
        id: "land",
        type: "fill" as const,
        source: "land",
        paint: { "fill-color": c.land },
      },
      {
        id: "coastline",
        type: "line" as const,
        source: "coastline",
        paint: { "line-color": c.coastline, "line-width": 0.8 },
      },
      {
        id: "rivers",
        type: "line" as const,
        source: "rivers",
        paint: { "line-color": c.rivers, "line-width": 0.5 },
      },
    ],
  };
}

onMounted(() => {
  map = new maplibregl.Map({
    container: mapContainer.value!,
    style: buildStyle(),
    center: [20, 30],
    zoom: 2,
  });
});

onUnmounted(() => {
  map?.remove();
  map = null;
});
</script>

<template>
  <div ref="mapContainer" class="map-container" />
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
