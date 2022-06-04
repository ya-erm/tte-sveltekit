<script lang="ts">
  import { goto } from '$app/navigation';
  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import SettingsSelectOption from '$lib/SettingsSelectOption.svelte';
  import { backLink } from '$lib/store/navigation';
  import { routes } from '$lib/store/routes';
  import { activeLocale, languages, translate, type Locales } from '$lib/translate';

  function onClick(locale: Locales | string) {
    activeLocale.set(locale as Locales);
    goto(routes.settings.path);
  }

  backLink.set(routes.settings.path);
</script>

<SettingsGroup title={$translate('common.available_variants')}>
  {#each Object.entries(languages) as [key, title]}
    <SettingsSelectOption
      value={title}
      checked={$activeLocale == key}
      on:click={() => onClick(key)}
    />
  {/each}
</SettingsGroup>
