<script lang="ts">
  import { goto } from '$app/navigation';
  import PositionAvatar from '$lib/PositionAvatar.svelte';
  import PositionTitle from '$lib/PositionTitle.svelte';
  import SettingsGroupItem from '$lib/SettingsGroupItem.svelte';
  import { fills } from '$lib/store/fills';
  import { backLink } from '$lib/store/navigation';
  import { routes } from '$lib/store/routes';
  import { translate } from '$lib/translate';
  import { printMoney } from '$lib/utils';
  import type { Position } from './model';

  export let position: Position;
</script>

<SettingsGroupItem>
  <div
    class="item-container"
    on:click={() => {
      backLink.set(routes.fills.path);
      goto(`${routes.fills.path}/${position.ticker}`);
    }}
  >
    <PositionAvatar {position} />
    <div class="info">
      <div class="row">
        <div class="left">
          <PositionTitle {position} />
          <div class="subtitle" style="margin-top: 2px;">
            {$translate('fills.position.fills_count', {
              values: { count: position.fillsCount },
            })}
          </div>
        </div>
        <div class="right">
          <span
            class:loss={(position.fixedPnL ?? 0) < 0}
            class:profit={(position.fixedPnL ?? 0) > 0}
          >
            {printMoney(position.fixedPnL, position.currency, true)}
          </span>
        </div>
      </div>
    </div>
  </div>
</SettingsGroupItem>

<style>
  .item-container {
    font-size: 13px;
    height: 40px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-grow: 1;
    max-width: calc(100% - 20px);
    cursor: pointer;
  }
  .item-container:hover {
    background-color: var(--hover-background-color);
  }
  .info {
    flex-grow: 1;
    max-width: 100%;
    overflow: hidden;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }
  .subtitle {
    opacity: 0.7;
    font-size: 0.9em;
  }
  .left {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .right {
    text-align: right;
  }
  .profit {
    color: var(--green-color);
  }
  .loss {
    color: var(--red-color);
  }
</style>
