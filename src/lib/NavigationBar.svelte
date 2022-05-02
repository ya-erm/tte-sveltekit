<script lang="ts">
  import { page } from '$app/stores';
  import { translate } from '$lib/translate';
  import { routes } from './store/routes';
</script>

<div class="navigation-bar">
  <div class="mabigation-back-button" />
  <div class="navigation-title">
    {$translate(
      Object.values(routes).find((x) => x.path == $page.url.pathname)?.title ?? 'settings.title',
    )}
  </div>
  <div />
</div>

<style>
  .navigation-bar {
    display: grid;
    grid-template-columns: 60px 1fr 60px;
    background-color: var(--header-background-color);
    border-bottom: 1px solid var(--border-color);
    align-items: center;
    height: 60px;
  }
  .navigation-title {
    text-align: center;
    font-size: 18px;
  }
</style>
