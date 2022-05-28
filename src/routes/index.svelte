<script lang="ts">
  import { goto } from '$app/navigation';
  import { routes } from '$lib/store/routes';
  import { onMount } from 'svelte';

  onMount(() => {
    goto(routes.portfolio.path);
  });
</script>
