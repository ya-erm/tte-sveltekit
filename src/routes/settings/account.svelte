<script lang="ts">
  import { goto } from '$app/navigation';
  import type { V1Account } from '$lib/api';
  import NotConfiguredWrapper from '$lib/NotConfiguredWrapper.svelte';
  import SettingsGroup from '$lib/SettingsGroup.svelte';
  import SettingsSelectOption from '$lib/SettingsSelectOption.svelte';
  import { accounts, accountsState, selectedAccount, selectedAccountId } from '$lib/store/accounts';
  import { backLink } from '$lib/store/navigation';
  import { routes } from '$lib/store/routes';
  import { translate } from '$lib/translate';

  function onClick(account: V1Account) {
    selectedAccountId.set(account.id ?? null);
    goto(routes.settings.path);
  }

  backLink.set(routes.settings.path);
</script>

<NotConfiguredWrapper loading={$accountsState == 'loading'} checkSelectedAccount={false}>
  <SettingsGroup title={$translate('common.available_variants')}>
    {#each $accounts as account}
      <SettingsSelectOption
        value={account.name ?? ''}
        checked={$selectedAccount == account}
        on:click={() => onClick(account)}
      />
    {/each}
  </SettingsGroup>
</NotConfiguredWrapper>
