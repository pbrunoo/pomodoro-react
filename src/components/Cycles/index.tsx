import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { GetNextCycle } from '../../utils/getNextCycle';
import { GetNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();
  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo'
  }
  const cycleStep = Array.from({ length: state.currentCycle });
  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {
          cycleStep.map((_, index) => {
            const nextCycle = GetNextCycle(index);
            const nextCycleType = GetNextCycleType(nextCycle);
            return <span key={`${nextCycle}_${nextCycleType}`} className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label={`Indicador de ciclo de foco ${cycleDescriptionMap[nextCycleType]}`}
              title={`Indicador de ciclo de foco ${cycleDescriptionMap[nextCycleType]}`}></span>

          })
        }
      </div>
    </div>
  );
}