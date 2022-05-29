<script lang="ts">
  import Spinner from './Spinner.svelte';
  import { translate } from './translate';
</script>

<div class="center">
  <div class="flex">
    <Spinner />
    {$translate('common.loading')}
  </div>
</div>

<style>
  .center {
    display: flex;
    justify-content: center;
    padding: 30px;
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
