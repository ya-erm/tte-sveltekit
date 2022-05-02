<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import SettingsGroupItem from './SettingsGroupItem.svelte';

  const dispatch = createEventDispatcher();

  export let value: string;
  export let checked: boolean = false;
  export let click = () => dispatch('click');
</script>

<SettingsGroupItem>
  <label class="container" on:click={click}>
    <span>{value}</span>
    <input type="radio" {checked} />
    {#if checked}
      <span class="indicator" />
    {/if}
  </label>
</SettingsGroupItem>

<style>
  .container {
    flex-grow: 1;
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 10px;
  }
  input {
    display: none;
  }
  .indicator {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: var(--active-color);
    mask: url('/icons/check.svg') no-repeat 50% 50%;
  }
</style>
