<script lang="ts">
  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import SettingsInputItem from '$lib/SettingsInputItem.svelte';
  import { token } from '$lib/store/token';
  import { translate } from '$lib/translate';

  import { onMount } from 'svelte';

  let input: SettingsInputItem;

  onMount(() => {
    input.focus();
  });
</script>

<SettingsGroup title={$translate('settings.token')}>
  <SettingsInputItem
    bind:this={input}
    bind:value={$token}
    placeholder={$translate('settings.enter_token')}
  />
  <span slot="description">
    {$translate('settings.token_description')}
    {' '}
    <a href="https://tinkoff.ru/invest/settings/api" target="_blank" rel="noreferrer">
      https://tinkoff.ru/invest/settings/api
    </a>
  </span>
</SettingsGroup>
