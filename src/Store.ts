import { writable } from "svelte/store";
import { connect, Connection, TableMetadata } from "@tableland/sdk";
import { redirect } from "svelte-pathfinder";

export type Store = {
  isConnected: boolean
  data: any[]
}


export function createStore() {
  const { subscribe, update, set } = writable<Store>({ data: [], isConnected: false})

  let _api: Connection;
  console.log(_api)

  return {
    subscribe,
    async connect() {
      _api = await connect({ network: "testnet"});
      update(store => ({ ...store, isConnected: true}))
    },
    async fetch(tid: string) {
      const { data } = await _api.query(`select * from ${tid};`) as any
      console.log(data)
      set({ data: data.rows, isConnected: true })
    },
    async create() {
      const { name } = await _api.create(`create table svelte_todo_demo (
        id serial,
        status text,
        name text,
        description text
      );`, {})
      redirect(`/?tid=${name}`)
    }
  }
}

export const store = createStore();