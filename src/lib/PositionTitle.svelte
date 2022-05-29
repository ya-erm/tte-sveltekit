<script lang="ts">
  import { InstrumentType, type Position } from '$lib/model';

  export let position: Position;

  function printPositionTitle(position: Position) {
    switch (position.instrumentType) {
      case InstrumentType.Bond:
      case InstrumentType.Currency:
      case InstrumentType.Futures:
        return '';
      default:
        return position.ticker;
    }
  }

  const ticker = printPositionTitle(position);
</script>

<div class="position-name">
  <span class="name">
    {ticker}
  </span>
  {#if ticker}
    {' - '}
  {/if}
  <span class:name={!ticker}>
    {position.name}
  </span>
</div>

<style>
  .position-name {
    flex-shrink: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .name {
    font-weight: 600;
  }
</style>
