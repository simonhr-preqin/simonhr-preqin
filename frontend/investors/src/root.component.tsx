import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/investors-api";
import { InvestorsList } from "./components/investors-list";

export default function Root(_props: any) {
  return <QueryClientProvider client={queryClient}><InvestorsList /></QueryClientProvider>;
}
