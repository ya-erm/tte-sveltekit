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
    <span class="title">{title}</span>
    <div class="value-container">
      <span class="value-text">{value == undefined ? $translate('common.select') : value}</span>
      <span class="indicator" />
    </div>
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
    gap: 10px;
    overflow: auto;
  }
  .title {
    white-space: nowrap;
  }
  .value-container {
    color: var(--secondary-text-color);
    display: flex;
    align-items: center;
    gap: 5px;
    overflow: auto;
  }
  .value-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    max-width: calc(100% - 25px);
    overflow: auto;
  }
  .indicator {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: var(--secondary-text-color);
    mask: url('/icons/chevron-right.svg') no-repeat 50% 50%;
  }
</style>
