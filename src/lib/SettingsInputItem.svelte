<script lang="ts">
  import SettingsGroupItem from './SettingsGroupItem.svelte';

  let input: HTMLInputElement;

  export let value: string | null;
  export let placeholder: string;
  export function focus() {
    input.focus();
  }
</script>

<SettingsGroupItem>
  <input bind:this={input} bind:value {placeholder} />
</SettingsGroupItem>

<style>
  input {
    display: flex;
    flex-grow: 1;
    border: none;
    outline: none;
    background-color: transparent;
    height: 100%;
    padding: 10px 14px;
    font-size: 14px;
  }
</style>
