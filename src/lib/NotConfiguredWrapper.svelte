<script lang="ts">
  import Loading from './Loading.svelte';
  import { accountsState, selectedAccountId } from './store/accounts';
  import { routes } from './store/routes';
  import { token } from './store/token';
  import { translate } from './translate';

  export let loading: boolean;
  export let checkSelectedAccount = true;
</script>

{#if !$token || $accountsState === 'error'}
  <div class="not-configured">
    <a href={routes['settings.token'].path}>{$translate('settings.enter_token')}</a>
    {$translate('settings.for_data_access_in')}
    <a href={routes.settings.path}>{$translate('settings.in_settings')}</a>
  </div>
{:else if checkSelectedAccount && !$selectedAccountId}
  <div class="not-configured">
    <a href={routes['settings.account'].path}>{$translate('settings.select_account')}</a>
    {$translate('settings.for_data_access_in')}
    <a href={routes.settings.path}>{$translate('settings.in_settings')}</a>
  </div>
{:else if loading}
  <div class="not-configured">
    <Loading />
  </div>
{:else}
  <slot />
{/if}

<style>
  .not-configured {
    text-align: center;
    padding: 10px;
  }
</style>
