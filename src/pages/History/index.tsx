import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from './style.module.css'
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type sortTasksOption } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { TaskActionTypes } from "../../contexts/TaskActions";
import { showMessage } from "../../adapters/showMessage";


export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;
  const [sortTasksOption, setSortTaskOptions] = useState<sortTasksOption>(() => {
    return {
      tasks: sortTasks({ tasks: state.tasks }),
      field: 'startDate',
      direction: 'desc'
    }
  });

  function handleSortTask({ field }: Pick<sortTasksOption, 'field'>) {
    const newDirection = sortTasksOption.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({ tasks: sortTasksOption.tasks, field, direction: newDirection }),
      field,
      direction: newDirection
    });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        field: sortTasksOption.field,
        direction: sortTasksOption.direction,
      })
    }))
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearHistory) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfirmClearHistory(false);
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    showMessage.dismiss();
  }, []);

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';
  }, []);

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm('Tem certeza', confirmation => {
      setConfirmClearHistory(confirmation);
    });
  }

  return (
    <MainTemplate>

      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton onClick={handleResetHistory} icon={<TrashIcon />} color="red" aria-label="Apagar todo histórico" />
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSortTask({ field: 'name' })} className={styles.thSort}>Tarefa</th>
                  <th onClick={() => handleSortTask({ field: 'duration' })} className={styles.thSort}>Duração</th>
                  <th onClick={() => handleSortTask({ field: 'startDate' })} className={styles.thSort}>Data</th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOption.tasks.map(task => {
                  const taskTypeDicionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo'
                  }
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration} min</td>
                      <td>{formatDate(task.startDate)} </td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDicionary[task.type]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (
          <p style={{ textAlign: 'center', fontSize: '2rem', margin: '5rem' }}>Nenhuma tarefa registrada.</p>
        )}
      </Container>
    </MainTemplate>
  )
}