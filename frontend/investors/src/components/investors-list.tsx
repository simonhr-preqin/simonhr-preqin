import { useQuery } from "@tanstack/react-query";
import { formatDate, formatCurrency, toDate } from "../utils/format"
import { useState } from "react";
import { InvestorCommitments } from "./investor-commitments";

type Investor = {
  id: number,
  name: string,
  date_added: string,
  country: string,
  total_amount: number
}

export const InvestorsList: React.FC = () => {
  const [active, setActive] = useState(0);

  const { isLoading, isError, data, error } = useQuery<[Investor]>({ queryKey: [''] });

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError && error instanceof Error) {
    return <span>Error: {error.message}</span>
  }

  const selectInvestor = (event) => setActive(+event.currentTarget.id);

  return (
    <>
    <h1>Investors</h1>
    <table>
      <thead><tr><th>Id</th><th>Name</th><th>Type</th><th>Date Added</th><th>Address</th><th>Total Commitment</th></tr></thead>
      <tbody>
        {data.map(investor => (
          <tr key={investor.id} id={`${investor.id}`} onClick={selectInvestor}>
            <td>{investor.id}</td>
            <td>{investor.name}</td>
            <td>{formatDate(toDate(investor.date_added))}</td>
            <td>{investor.country}</td>
            <td>{formatCurrency(investor.total_amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <br/>
    {active > 0 && <InvestorCommitments investor_id={active} />}
    </>
  )
}