<script>
  import { goto } from '$app/navigation';
  import OptionsButton from './OptionsButton.svelte';
  import { routes } from './store/routes';
</script>

<OptionsButton on:click={() => goto(routes['fills.options'].path)} />
