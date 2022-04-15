<script lang="ts">
  import "carbon-components-svelte/css/all.css";

  import {
    Content,
    Header,
    HeaderUtilities,
    SkipToContent,
  } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import { Loading } from "carbon-components-svelte";

  import { query } from "svelte-pathfinder";

  // Icons
  import Connect from "carbon-icons-svelte/lib/Connect.svelte";
  import AddAlt from "carbon-icons-svelte/lib/AddAlt.svelte";

  // Local imports
  import { store } from "./Store";

  let tid: string;
  $: tid = ($query.params.tid ?? "svelte_todo_demo_696").toString();

  export let name: string;
</script>

<main>
  <Header company="Tableland" platformName={tid}>
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>
    <HeaderUtilities>
      <Button
        kind="primary"
        iconDescription="Connect"
        icon={Connect}
        on:click={() => {
          store.connect().then(() => store.fetch(tid));
        }}
      />
      <Button
        kind="primary"
        iconDescription="Create"
        icon={AddAlt}
        on:click={() => {
          store.create();
        }}
      />
    </HeaderUtilities>
  </Header>
  <Content>
    {#if $store.isConnected}
      <p>
        {JSON.stringify($store.data)}
      </p>
    {:else}
      <Loading />
    {/if}
  </Content>
</main>
