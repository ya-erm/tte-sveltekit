<script lang="ts">
  import { InstrumentType, type Position } from '$lib/model';
  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import SettingsGroupItem from '$lib/SettingsGroupItem.svelte';

  import { positions } from '$lib/store/positions';
  import { translate } from '$lib/translate';
  import { formatCurrency, formatMoney } from '$lib/utils';
  import { derived } from 'svelte/store';

  function translateGroup(instrumentType: InstrumentType) {
    switch (instrumentType) {
      case InstrumentType.Share:
        return $translate('instrument.groups.share');
      case InstrumentType.Bond:
        return $translate('instrument.groups.bond');
      case InstrumentType.Currency:
        return $translate('instrument.groups.currency');
      case InstrumentType.Etf:
        return $translate('instrument.groups.etf');
      case InstrumentType.Futures:
        return $translate('instrument.groups.futures');
      default:
        return $translate('instrument.groups.other');
    }
  }

  const groups = derived(positions, (positions) =>
    positions
      .filter(({ quantity }) => quantity > 0)
      .map(({ instrumentType }) => ({
        id: instrumentType,
        title: translateGroup(instrumentType),
      }))
      .filter((value, index, arr) => arr.findIndex((x) => x.id == value.id) === index),
  );

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
</script>

<div>
  {#each $groups as group}
    <SettingsGroup title={group.title}>
      {#each $positions.filter((p) => p.instrumentType == group.id && p.quantity > 0) as position}
        <SettingsGroupItem>
          <div class="portfolio-item">
            <div class="portfolio-item-avatar" title={position.figi}>
              {position.ticker.substring(0, 1)}
            </div>
            <div class="portfolio-item-info">
              <div class="portfolio-item-row">
                <div class="portfolio-item-name">
                  {printPositionTitle(position)}
                  {#if printPositionTitle(position)}
                    {' - '}
                  {/if}
                  {position.name}
                </div>
                <div>
                  {formatMoney(position.quantity * (position.currentPrice ?? 0), position.currency)}
                </div>
              </div>

              <div class="portfolio-item-row">
                <div class="portfolio-item-position">
                  <span>{position.quantity}</span>
                  <span>•</span>
                  <span>{formatMoney(position.average)}</span>
                  <span>→</span>
                  <span>{formatMoney(position.currentPrice)}</span>
                  <span>{formatCurrency(position.currency)}</span>
                </div>
                <div
                  class="portfolio-item-expected"
                  class:loss={(position.expectedYield ?? 0) < 0}
                  class:profit={(position.expectedYield ?? 0) > 0}
                >
                  <span>{formatMoney(position.expectedYield, position.currency, true)}</span>
                  <span>
                    ({formatMoney(
                      (100 * (position.expectedYield ?? 0)) /
                        (position.quantity * (position.average ?? 1)),
                      '%',
                      true,
                    )})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SettingsGroupItem>
      {/each}
    </SettingsGroup>
  {/each}
</div>

<style>
  .portfolio-item {
    font-size: 0.9em;
    height: 40px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-grow: 1;
    max-width: calc(100% - 20px);
  }
  .portfolio-item-avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: var(--active-color);
    color: var(--white-color);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .portfolio-item-info {
    flex-grow: 1;
    max-width: 100%;
    overflow: hidden;
  }
  .portfolio-item-row {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .portfolio-item-name {
    flex-shrink: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .portfolio-item-title {
    font-size: 1em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .portfolio-item-subtitle {
    opacity: 0.7;
  }
  .portfolio-item-position {
    display: flex;
    gap: 2px;
  }
  .portfolio-item-expected {
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .profit {
    color: var(--green-color);
  }
  .loss {
    color: var(--red-color);
  }
</style>
