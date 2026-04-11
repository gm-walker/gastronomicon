<script lang="ts">
  import SearchBar from '$lib/SearchBar.svelte';
  import Graph from '$lib/Graph.svelte';
  let data;
</script>
<SearchBar />
<Graph {data} />

