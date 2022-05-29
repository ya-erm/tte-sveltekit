<script lang="ts">
  import type { Position } from '$lib/model';

  export let position: Position;
</script>

<div class="avatar" title={position.figi}>
  {position.ticker.substring(0, 1)}
</div>

<style>
  .avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: var(--active-color);
    color: var(--white-color);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
