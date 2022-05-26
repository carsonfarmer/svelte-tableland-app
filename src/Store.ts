import { writable } from "svelte/store";
import { connect, Connection, CreateTableReceipt, ReadQueryResult } from "@tableland/sdk";
import { redirect } from "svelte-pathfinder";

export type Store = {
  isConnected: boolean
  data: any[]
}

type QueryResponse = {
  data: ReadQueryResult
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
      const { data: { rows, columns} } = await _api.query(`select * from ${tid};`) as unknown as QueryResponse
      console.log(tid, rows, columns)
      set({ data: rows, isConnected: true })
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