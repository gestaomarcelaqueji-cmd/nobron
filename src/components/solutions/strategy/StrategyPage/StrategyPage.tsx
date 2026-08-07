import { BusinessSignals } from "../BusinessSignals/BusinessSignals";
import { DirectionProblem } from "../DirectionProblem/DirectionProblem";
import { ExecutionConnection } from "../ExecutionConnection/ExecutionConnection";
import { StrategicDiagnosis } from "../StrategicDiagnosis/StrategicDiagnosis";
import { StrategyFinalCta } from "../StrategyFinalCta/StrategyFinalCta";
import { StrategyHero } from "../StrategyHero/StrategyHero";
import { StrategyOutcome } from "../StrategyOutcome/StrategyOutcome";
import { StrategyServices } from "../StrategyServices/StrategyServices";

import { SectionRise } from "@/components/solutions/shared/SectionRise/SectionRise";

import styles from "./StrategyPage.module.css";

export function StrategyPage() {
  return (
    <div className={styles.page}>
      <StrategyHero />

      <SectionRise>
        <DirectionProblem />
      </SectionRise>

      <SectionRise>
        <BusinessSignals />
      </SectionRise>

      <SectionRise>
        <StrategicDiagnosis />
      </SectionRise>

      <SectionRise>
        <StrategyServices />
      </SectionRise>

      <SectionRise>
        <StrategyOutcome />
      </SectionRise>

      <SectionRise>
        <ExecutionConnection />
      </SectionRise>

      <SectionRise>
        <StrategyFinalCta />
      </SectionRise>
    </div>
  );
}
