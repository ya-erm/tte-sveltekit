<script>
  import { goto } from '$app/navigation';
  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import SettingsSelectItem from '$lib/SettingsSelectItem.svelte';
  import SettingsSwitchItem from '$lib/SettingsSwitchItem.svelte';
  import { routes } from '$lib/store/routes';
  import { darkMode } from '$lib/store/theme';
  import { activeLocaleName, t } from '$lib/translate';
</script>

<SettingsGroup title={$t('settings.common')}>
  <SettingsSwitchItem title={$t('settings.darkMode')} checked={darkMode} />
  <SettingsSelectItem
    title={$t('settings.language')}
    value={$activeLocaleName}
    on:click={() => goto(routes['settings.language'].path)}
  />
</SettingsGroup>
