<script lang="ts">
  import { page } from '$app/stores';
  import { OperationType, type Fill } from '$lib/model';
  import { fills as fillsByFigi } from '$lib/store/fills';
  import { backLink, title } from '$lib/store/navigation';
  import { positions } from '$lib/store/positions';
  import { routes } from '$lib/store/routes';
  import { translate } from '$lib/translate';
  import { printMoney } from '$lib/utils';
  import { date } from 'svelte-i18n';
  import { derived } from 'svelte/store';

  const ticker = $page.params['id'];
  title.set(ticker);

  const figi = derived(positions, (positions) => positions.find((p) => p.ticker == ticker)?.figi);

  const fills = derived([fillsByFigi, figi], ([fills, figi]) => {
    if (!fills || !figi) return [];
    return fills[figi].filter((x) => x.quantityExecuted > 0).reverse();
  });

  const groups = derived(fills, (fills) => {
    return fills
      .map(({ date }) => new Date(date).toLocaleDateString())
      .filter((value, index, arr) => arr.findIndex((x) => x == value) === index);
  });
</script>

<div class="container">
  {#if !$positions.length || !$fillsByFigi}
    <div class="center">
      <!-- TODO: Replace by component -->
      {$translate('common.loading')}
    </div>
  {:else if !$figi || $fills.length === 0}
    <div class="center">
      <div>{$translate('fills.instrument_not_found')}</div>
      <a href={routes.fills.path} on:click={() => backLink.set(null)}>
        {$translate('fills.return_to_fills')}
      </a>
    </div>
  {:else}
    <table>
      <tbody>
        {#each $groups as date}
          <tr class="table-group-title">
            <td>{date}</td>
          </tr>
          {#each $fills.filter((x) => new Date(x.date).toLocaleDateString() == date) as fill, index}
            <tr
              class:first-row-in-group={index == 0}
              class:last-row-in-group={index ==
                $fills.filter((x) => new Date(x.date).toLocaleDateString() == date).length - 1}
            >
              <td>
                <div class="secondary">
                  {new Date(fill.date).toLocaleTimeString()}
                </div>
                <div class="description">
                  {(fill.operationType === OperationType.Buy ? '+' : '-') + fill.quantityExecuted} •
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
                <span class:loss={(fill.fixedPnL ?? 0) < 0} class:profit={(fill.fixedPnL ?? 0) > 0}>
                  {printMoney(fill.fixedPnL, fill.currency, true)}
                </span>
              </td>
            </tr>
          {/each}
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .container {
    padding: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  tr:not(.table-group-title) {
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
  tr:not(.table-group-title):not(.last-row-in-group) {
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
  .center {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
</style>
