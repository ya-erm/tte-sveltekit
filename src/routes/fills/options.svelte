<script>
  import { goto } from '$app/navigation';
  import { sortDirectionVariants } from '$lib/utils/sorting';

  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import SettingsSelectItem from '$lib/SettingsSelectItem.svelte';
  import SettingsSwitchItem from '$lib/SettingsSwitchItem.svelte';
  import {
    fillsGroupByType,
    fillsSortBy,
    fillsSortDirection,
    fillsSortByVariants,
  } from '$lib/store/fills';
  import { backLink } from '$lib/store/navigation';
  import { routes } from '$lib/store/routes';
  import { translate } from '$lib/translate';

  backLink.set(routes.fills.path);

  const changeSortDirection = () =>
    fillsSortDirection.update((prev) => (prev == 'ascending' ? 'descending' : 'ascending'));
</script>

<SettingsGroup title={$translate('common.grouping')}>
  <SettingsSwitchItem
    title={$translate('fills.group_by_instrument_type')}
    checked={fillsGroupByType}
  />
</SettingsGroup>

<SettingsGroup title={$translate('common.sorting')}>
  <SettingsSelectItem
    title={$translate('common.sort_by')}
    value={$translate(fillsSortByVariants[$fillsSortBy] || 'common.select')}
    on:click={() => goto(routes['fills.sorting'].path)}
  />
  <SettingsSelectItem
    title={$translate('common.sort_direction')}
    value={$translate(sortDirectionVariants[$fillsSortDirection] || 'common.select')}
    on:click={changeSortDirection}
  />
</SettingsGroup>
