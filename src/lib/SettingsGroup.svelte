<script lang="ts">
  export let title: string = '';
</script>

<div class="settings-group">
  <div class="settings-group-title">{title}</div>
  <div class="settings-group-container">
    <slot />
  </div>
</div>

<style>
  .settings-group {
    padding: 20px;
    padding-bottom: 0;
  }
  .settings-group-title {
    color: var(--secondary-text-color);
    text-transform: uppercase;
    margin-bottom: 10px;
    margin-left: 10px;
    font-size: 12px;
  }
  .settings-group-container {
    background-color: var(--header-background-color);
  }
  .settings-group-container {
    border-radius: 10px;
  }
</style>
