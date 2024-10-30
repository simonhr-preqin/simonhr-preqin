import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "../utils/format"
import { INVESTORS_API_URL } from "../utils/config";
import { Commitments } from "./commitments";
import { useState } from "react";

type Commitment = {
  id: number,
  asset_class: string,
  currency: string,
  amount: number
}

type Props = {
  investor_id: number
}

type Active = {
  filter: (fn: Commitment) => boolean
  name: string
}

export const InvestorCommitments: React.FC<Props> = ({ investor_id }: Props) => {
  const [active, setActive] = useState<Active>({filter: _ => true, name: 'All'});

  const { isLoading, isError, data, error } = useQuery<[Commitment]>({ queryKey: ['', investor_id], queryFn:async ({ queryKey }) => {
    const response = await fetch(
      `${INVESTORS_API_URL}${queryKey[0]}${queryKey[1]}`,
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } });

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError && error instanceof Error) {
    return <span>Error: {error.message}</span>
  }

  const setFilter = (event) => {
    const name = event.currentTarget.id;
    const filter: (fn: Commitment) => boolean =
      name === 'All'
        ? _ => true
        : v => v.asset_class === name;
    setActive({ filter, name });
  }

  const totals = data.reduce<Record<string, number>>((prev, curr) => {
    prev['All'] = (prev['All'] ?? 0) + curr.amount;
    prev[curr.asset_class] = (prev[curr.asset_class] ?? 0) + curr.amount;
    return prev;
  }, {});

  return (
    <>
    <h1>Commitments</h1>
    <div style={{display: 'flex'}}>
      {Object.entries(totals).map(([k, v]) => (
        <button key={k} id={k} onClick={setFilter}><div>{k}</div><div>{formatCurrency(v)}</div></button>
      ))}
    </div>
    <Commitments commitments={data.filter(active.filter)} />
    </>
  )
}