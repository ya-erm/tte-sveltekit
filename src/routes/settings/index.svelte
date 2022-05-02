<script>
  import { goto } from '$app/navigation';
  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import SettingsSelectItem from '$lib/SettingsSelectItem.svelte';
  import SettingsSwitchItem from '$lib/SettingsSwitchItem.svelte';
  import { routes } from '$lib/store/routes';
  import { darkMode } from '$lib/store/theme';
  import { token } from '$lib/store/token';
  import { activeLocaleName, translate } from '$lib/translate';
</script>

<SettingsGroup title={$translate('settings.common')}>
  <SettingsSwitchItem title={$translate('settings.darkMode')} checked={darkMode} />
  <SettingsSelectItem
    title={$translate('settings.language')}
    value={$activeLocaleName}
    on:click={() => goto(routes['settings.language'].path)}
  />
</SettingsGroup>

<SettingsGroup title={$translate('settings.security')}>
  <SettingsSelectItem
    title={$translate('settings.token')}
    value={$token || $translate('settings.enter_token')}
    on:click={() => goto(routes['settings.token'].path)}
  />
</SettingsGroup>
