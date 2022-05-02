<script lang="ts">
  import { page } from '$app/stores';
  import { translate } from '$lib/translate';
  import { menu } from './store/menu';

  function isActive(path: string) {
    return $page.url.pathname === path;
  }
</script>

<div class="menu-bar">
  {#each $menu as item}
    <a href={item.path} class="menu-item" class:active={isActive(item.path)}>
      <div
        class="icon"
        class:active={isActive(item.path)}
        style={`mask-image:url('${item.icon}'); -webkit-mask-image:url('${item.icon}')`}
      />
      <span>{$translate(item.title)}</span>
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
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
  .menu-item:hover,
  .menu-item.active {
    color: var(--active-text-color);
  }
  .menu-item:active {
    opacity: 0.7;
  }
  .menu-item .icon {
    width: 30px;
    height: 30px;
    mask: no-repeat 50% 50%;
    background-color: var(--secondary-text-color);
  }
  .menu-item:hover .icon,
  .menu-item .icon.active {
    background-color: var(--active-color);
  }
</style>
