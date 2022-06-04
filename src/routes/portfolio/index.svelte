<script lang="ts">
  import NotConfiguredWrapper from '$lib/NotConfiguredWrapper.svelte';
  import PositionAvatar from '$lib/PositionAvatar.svelte';
  import PositionTitle from '$lib/PositionTitle.svelte';
  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import SettingsGroupItem from '$lib/SettingsGroupItem.svelte';
  import { backLink } from '$lib/store/navigation';
  import { positions } from '$lib/store/positions';
  import { printCurrency, printGroupName, printMoney } from '$lib/utils';
  import { derived } from 'svelte/store';

  const groups = derived(positions, (positions) =>
    positions
      .filter(({ quantity }) => quantity > 0)
      .map(({ instrumentType }) => ({ id: instrumentType }))
      .filter((value, index, arr) => arr.findIndex((x) => x.id == value.id) === index),
  );

  backLink.set(null);
</script>

<NotConfiguredWrapper loading={!$positions.length}>
  {#each $groups as group}
    <SettingsGroup title={$printGroupName(group.id)}>
      {#each $positions.filter((p) => p.instrumentType == group.id && p.quantity > 0) as position}
        <SettingsGroupItem>
          <div class="item-container">
            <PositionAvatar {position} />
            <div class="info">
              <div class="row">
                <PositionTitle {position} />
                <div class="bold">
                  {printMoney(position.quantity * (position.currentPrice ?? 0), position.currency)}
                </div>
              </div>
              <div class="row">
                <div class="change">
                  <span>{position.quantity}</span>
                  <span>•</span>
                  <span>{printMoney(position.average)}</span>
                  <span>→</span>
                  <span>{printMoney(position.currentPrice)}</span>
                  <span>{printCurrency(position.currency)}</span>
                </div>
                <div
                  class="expected"
                  class:loss={(position.expectedYield ?? 0) < 0}
                  class:profit={(position.expectedYield ?? 0) > 0}
                >
                  <span>{printMoney(position.expectedYield, position.currency, true)}</span>
                  <span>
                    ({printMoney(
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
</NotConfiguredWrapper>

<style>
  .item-container {
    font-size: 13px;
    height: 40px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-grow: 1;
    max-width: calc(100% - 20px);
  }
  .info {
    flex-grow: 1;
    max-width: 100%;
    overflow: hidden;
  }
  .row {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .bold {
    font-weight: 600;
  }
  .change {
    display: flex;
    gap: 2px;
  }
  .expected {
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
