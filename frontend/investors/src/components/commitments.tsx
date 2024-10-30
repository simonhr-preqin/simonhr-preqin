import { formatCurrency } from "../utils/format"

type Commitment = {
  id: number,
  asset_class: string,
  currency: string,
  amount: number
}

type Props = {
  commitments: Commitment[]
}

export const Commitments: React.FC<Props> = ({ commitments }: Props) => {
  return (
    <table>
      <thead><tr><th>Id</th><th>Asset Class</th><th>Currency</th><th>Amount</th></tr></thead>
      <tbody>
        {commitments.map(commitment => (
          <tr key={commitment.id}>
            <td>{commitment.id}</td>
            <td>{commitment.asset_class}</td>
            <td>{commitment.currency}</td>
            <td>{formatCurrency(commitment.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}