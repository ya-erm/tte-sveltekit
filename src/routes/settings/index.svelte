<script lang="ts">
  import { goto } from '$app/navigation';
  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import SettingsSelectItem from '$lib/SettingsSelectItem.svelte';
  import SettingsSwitchItem from '$lib/SettingsSwitchItem.svelte';
  import { selectedAccount } from '$lib/store/accounts';
  import { backLink } from '$lib/store/navigation';
  import { routes } from '$lib/store/routes';
  import { darkMode } from '$lib/store/theme';
  import { token } from '$lib/store/token';
  import { activeLocaleName, translate } from '$lib/translate';

  backLink.set(null);
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

<SettingsGroup title={$translate('settings.portfolio')}>
  <SettingsSelectItem
    title={$translate('settings.account')}
    value={$selectedAccount?.name || $translate('settings.select_account')}
    on:click={() => goto(routes['settings.account'].path)}
  />
</SettingsGroup>
