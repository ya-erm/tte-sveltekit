<script lang="ts">
  import '$lib/translate';
  import MenuBar from '$lib/MenuBar.svelte';
  import NavigationBar from '$lib/NavigationBar.svelte';
  import ThemeProvider from '$lib/ThemeProvider.svelte';
</script>

<main>
  <NavigationBar />
  <div class="page">
    <slot />
  </div>
  <MenuBar />
  <ThemeProvider />
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    display: flex;
    flex-direction: column;
    color: var(--primary-text-color);
    background-color: var(--background-color);
    padding: 0;
    height: 100vh;
    max-height: -webkit-fill-available;
  }

  .page {
    overflow-y: auto;
    flex-grow: 1;
  }
</style>
