import type { Metadata } from "next";

import { HeroImmersive } from "@/components/HeroImmersive";

export const metadata: Metadata = {
  title: "noBRon | Tecnologia e soluções digitais",
  description:
    "Tecnologia, design, marketing e desenvolvimento conectados para criar soluções digitais ágeis, personalizadas e prontas para funcionar.",
};

export default function Home() {
  return (
    <main>
      <HeroImmersive />
    </main>
  );
}
