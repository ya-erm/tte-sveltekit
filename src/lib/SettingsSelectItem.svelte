<script lang="ts">
  import { translate } from '$lib/translate';
  import { createEventDispatcher } from 'svelte';
  import SettingsGroupItem from './SettingsGroupItem.svelte';

  const dispatch = createEventDispatcher();

  export let title: string;
  export let value: string | undefined;
  export let click = () => dispatch('click');
</script>

<SettingsGroupItem>
  <div class="container" on:click={click}>
    <span>{title}</span>
    <span class="value-container">
      <span>{value == undefined ? $translate('common.select') : value}</span>
      <span class="indicator" />
    </span>
  </div>
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
  .value-container {
    color: var(--secondary-text-color);
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .indicator {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: var(--secondary-text-color);
    mask: url('/icons/chevron-right.svg') no-repeat 50% 50%;
  }
</style>
