<script lang="ts">
  import { goto } from '$app/navigation';
  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import SettingsSelectOption from '$lib/SettingsSelectOption.svelte';
  import { fillsSortBy, fillsSortByVariants, type FillsSortBy } from '$lib/store/fills';
  import { backLink } from '$lib/store/navigation';
  import { routes } from '$lib/store/routes';
  import { translate } from '$lib/translate';

  backLink.set(routes['fills.options'].path);

  const onClick = (key: string) => {
    fillsSortBy.set(key as FillsSortBy);
    goto(routes['fills.options'].path);
  };
</script>

<SettingsGroup title={$translate('common.available_variants')}>
  {#each Object.entries(fillsSortByVariants) as [key, title]}
    <SettingsSelectOption
      value={$translate(title)}
      checked={$fillsSortBy == key}
      on:click={() => onClick(key)}
    />
  {/each}
</SettingsGroup>
