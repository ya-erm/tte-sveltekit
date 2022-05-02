<script lang="ts">
  import { page } from '$app/stores';
  import { translate } from '$lib/translate';
  import { menu } from './store/menu';
</script>

<div class="menu-bar">
  {#each $menu as item}
    <a href={item.path} class="menu-item" class:active={$page.url.pathname === item.path}>
      {$translate(item.title)}
    </a>
  {/each}
</div>

<style>
  .menu-bar {
    display: flex;
    align-items: center;
    border-top: 1px solid var(--border-color);
    background-color: var(--header-background-color);
    height: 60px;
  }
  .menu-item {
    flex-grow: 1;
    text-decoration: none;
    color: var(--secondary-text-color);
    display: flex;
    justify-content: center;
    padding: 10px;
  }
  .menu-item:hover,
  .menu-item.active {
    color: var(--active-text-color);
  }
  .menu-item:active {
    opacity: 0.7;
  }
</style>
