<script>
  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import SettingsGroupItem from '$lib/SettingsGroupItem.svelte';
  import SettingsSwitchItem from '$lib/SettingsSwitchItem.svelte';
  import { darkMode } from '$lib/store/theme';
  import { t } from '$lib/translate';
</script>

<SettingsGroup title={$t('settings.common')}>
  <SettingsGroupItem>
    <SettingsSwitchItem title={$t('settings.darkMode')} checked={darkMode} />
  </SettingsGroupItem>
</SettingsGroup>
