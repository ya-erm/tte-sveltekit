<script lang="ts">
  import FillsListItem from '$lib/FillsListItem.svelte';
  import FillsOptionsButton from '$lib/FillsOptionsButton.svelte';
  import { getFillDate, isFillOperation } from '$lib/model';
  import NotConfiguredWrapper from '$lib/NotConfiguredWrapper.svelte';
  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import { fillsGroupByType, fillsSortBy, fillsSortDirection } from '$lib/store/fills';
  import { backLink, rightButton } from '$lib/store/navigation';
  import { positions } from '$lib/store/positions';
  import { printGroupName } from '$lib/utils';
  import { groupBy, toArray } from '$lib/utils/groupBy';
  import { withSortDirection } from '$lib/utils/sorting';
  import { onDestroy } from 'svelte';
  import { derived } from 'svelte/store';

  const sortedPositions = derived(
    [positions, fillsSortBy, fillsSortDirection],
    ([positions, sortBy, sortDir]) =>
      positions.sort(
        withSortDirection(sortDir, (a, b) => {
          switch (sortBy) {
            case 'PnL':
              return (a.fixedPnL ?? 0) - (b.fixedPnL ?? 0);
            case 'quantity':
              return (a.fillsCount ?? 0) - (b.fillsCount ?? 0);
            case 'date':
            default:
              return (
                new Date(a.lastFillDate ?? 0).getTime() - new Date(b.lastFillDate ?? 0).getTime()
              );
          }
        }),
      ),
  );

  const groups = derived(positions, (positions) =>
    toArray(groupBy(positions, (p) => p.instrumentType)),
  );

  backLink.set(null);
  rightButton.set(FillsOptionsButton);
  onDestroy(() => rightButton.set(null));
</script>

<NotConfiguredWrapper loading={!$positions.length}>
  {#if $fillsGroupByType}
    {#each $groups as group}
      <SettingsGroup title={$printGroupName(group.key)}>
        {#each group.items as position}
          <FillsListItem {position} />
        {/each}
      </SettingsGroup>
    {/each}
  {:else}
    <SettingsGroup>
      {#each $sortedPositions as position}
        <FillsListItem {position} />
      {/each}
    </SettingsGroup>
  {/if}
</NotConfiguredWrapper>
