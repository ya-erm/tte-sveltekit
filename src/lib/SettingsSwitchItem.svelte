<script lang="ts">
  import type { Writable } from 'svelte/store';
  import Switch from './Switch.svelte';

  export let checked: Writable<boolean>;
  export let title: string;
</script>

<label class="theme-switch">
  <input type="checkbox" bind:checked={$checked} />
  <span>{title}</span>
  <Switch {checked} />
</label>

<style>
  .theme-switch {
    flex-grow: 1;
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 10px;
  }
  .theme-switch:hover {
    opacity: 0.9;
  }
  .theme-switch:active {
    opacity: 0.8;
  }
  .theme-switch input {
    display: none;
  }
</style>
