<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let click = () => dispatch('click');
</script>

<div class="icon" on:click={click} />

<style>
  .icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: var(--secondary-text-color);
    mask: url('/icons/dots-vertical.svg') no-repeat 50% 50%;
    cursor: pointer;
    padding: 10px;
  }
  .icon:hover {
    background-color: var(--active-color);
  }
  .icon:active {
    opacity: 0.7;
  }
</style>
