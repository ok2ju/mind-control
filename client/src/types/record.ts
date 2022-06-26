export type Record = {
  id: number,
  mood: number,
  energy: number,
  date: string
}

export type RecordsListResponse = {
  count: number,
  entities: Array<Record>
}
