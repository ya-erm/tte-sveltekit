<script lang="ts">
  import { page } from '$app/stores';
  import { OperationType } from '$lib/model';
  import NotConfiguredWrapper from '$lib/NotConfiguredWrapper.svelte';
  import { fills as fillsByFigi } from '$lib/store/fills';
  import { title } from '$lib/store/navigation';
  import { positions } from '$lib/store/positions';
  import { routes } from '$lib/store/routes';
  import { translate } from '$lib/translate';
  import { printMoney } from '$lib/utils';
  import { groupBy } from '$lib/utils/groupBy';
  import { derived, writable } from 'svelte/store';

  const ticker = $page.params['id'];
  title.set(ticker);

  const figi = derived(positions, (positions) => positions.find((p) => p.ticker == ticker)?.figi);
  const executedFills = derived([fillsByFigi, figi], ([fills, figi]) => {
    if (!fills || !figi) return [];
    return fills[figi].filter((x) => x.quantityExecuted > 0);
  });

  const limit = writable(50);
  const showMore = () => limit.update((prev) => prev + 50);
  const hasMore = derived([executedFills, limit], ([fills, limit]) => fills.length > limit);

  const fills = derived([executedFills, limit], ([fills, limit]) =>
    fills.reverse().slice(0, limit),
  );

  const groups = derived(fills, (fills) =>
    groupBy(fills, ({ date }) => new Date(date).toLocaleDateString()),
  );
</script>

<NotConfiguredWrapper loading={!$positions.length || !$fillsByFigi}>
  <div class="container">
    {#if !$figi || $fills.length === 0}
      <div class="center">
        <div>{$translate('fills.instrument_not_found')}</div>
        <a href={routes.fills.path}>{$translate('fills.return_to_fills')} </a>
      </div>
    {:else}
      <table>
        <tbody>
          {#each Object.keys($groups) as date}
            <tr class="table-group-title">
              <td>{date}</td>
            </tr>
            {#each $groups[date] as fill, index}
              <tr
                class="fill-row"
                class:first-row-in-group={index == 0}
                class:last-row-in-group={index == $groups[date].length - 1}
              >
                <td>
                  <div class="secondary">
                    {new Date(fill.date).toLocaleTimeString()}
                  </div>
                  <div class="description">
                    {(fill.operationType === OperationType.Buy ? '+' : '-') + fill.quantityExecuted}
                    •
                    {printMoney(fill.price, fill.currency)}
                  </div>
                </td>
                <td>
                  <div class="secondary">
                    {printMoney((fill.averagePrice ?? 0) * fill.currentQuantity, fill.currency)}
                  </div>
                  <div>
                    {fill.currentQuantity}
                    {#if fill.averagePrice}
                      ~{printMoney(fill.averagePrice, fill.currency)}
                    {/if}
                  </div>
                </td>
                <td class="right">
                  <span
                    class:loss={(fill.fixedPnL ?? 0) < 0}
                    class:profit={(fill.fixedPnL ?? 0) > 0}
                  >
                    {printMoney(fill.fixedPnL, fill.currency, true)}
                  </span>
                </td>
              </tr>
            {/each}
          {/each}
          <tr>
            <td colspan="3" class="shown-count">
              <div style="margin-bottom: 5px;">
                {$translate('fills.shown_count', {
                  values: {
                    count: $fills.length,
                    total: $executedFills.length,
                  },
                })}
              </div>
              {#if $hasMore}
                <div class="show-more" on:click={showMore}>
                  {$translate('common.show_more')}
                </div>
              {/if}
            </td>
          </tr>
        </tbody>
      </table>
    {/if}
  </div>
</NotConfiguredWrapper>

<style>
  .container {
    padding: 10px;
    font-size: 13px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  tr.fill-row {
    background-color: var(--header-background-color);
  }
  .table-group-title {
    color: var(--secondary-text-color);
    text-transform: uppercase;
    margin-bottom: 10px;
    margin-left: 10px;
    font-size: 12px;
  }
  .first-row-in-group td:first-child {
    border-top-left-radius: 10px;
  }
  .first-row-in-group td:last-child {
    border-top-right-radius: 10px;
  }
  .last-row-in-group td:first-child {
    border-bottom-left-radius: 10px;
  }
  .last-row-in-group td:last-child {
    border-bottom-right-radius: 10px;
  }
  tr.fill-row:not(.last-row-in-group) {
    border-bottom: 1px solid var(--border-color);
  }
  td {
    padding: 10px;
  }
  .right {
    text-align: right;
  }
  .secondary {
    color: var(--secondary-text-color);
    font-size: 12px;
    margin-bottom: 2px;
  }
  .profit {
    color: var(--green-color);
  }
  .loss {
    color: var(--red-color);
  }
  .shown-count {
    text-align: center;
    color: var(--secondary-text-color);
  }
  .show-more {
    text-align: center;
    color: var(--active-color);
    cursor: pointer;
  }
  .show-more:hover {
    opacity: 0.9;
  }
  .show-more:active {
    opacity: 0.75;
  }
  .center {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
</style>
