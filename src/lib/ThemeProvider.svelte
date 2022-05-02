<script lang="ts">
  import { onMount } from 'svelte';
  import { darkMode } from './store/theme';

  onMount(() => {
    darkMode.subscribe((value) => {
      if (value) {
        window.document.body.classList.add('dark-mode');
      } else {
        window.document.body.classList.remove('dark-mode');
      }
    });
  });
</script>

<style>
  :global(body) {
    --primary-text-color: black;
    --secondary-text-color: rgb(127, 127, 127);
    --active-text-color: rgb(47, 149, 220);

    --background-color: rgb(242, 242, 242);
    --header-background-color: white;

    --white-color: white;
    --active-color: rgb(47, 149, 220);

    --border-color: rgb(216, 216, 216);
  }

  :global(body.dark-mode) {
    --primary-text-color: white;
    --secondary-text-color: rgb(127, 127, 127);
    --active-text-color: white;

    --background-color: black;
    --header-background-color: rgb(18, 18, 18);

    --white-color: white;
    --active-color: rgb(47, 149, 220);

    --border-color: rgb(39, 39, 41);
  }

  :global(a) {
    color: var(--active-color);
  }
</style>
