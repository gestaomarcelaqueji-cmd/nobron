import type { Metadata } from "next";

import { StrategyPage } from "@/components/solutions/strategy/StrategyPage/StrategyPage";

export const metadata: Metadata = {
  title: "Estratégia e Direção | noBRon",
  description:
    "Organizamos objetivos, posicionamento, oferta e comunicação antes de definir o que precisa ser criado.",
};

export default function StrategyRoute() {
  return <StrategyPage />;
}
