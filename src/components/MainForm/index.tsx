import { PlayCircle, StopCircle } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { GetNextCycle } from "../../utils/getNextCycle";
import { GetNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskActions";
import { Tips } from "../tips";
import { showMessage } from "../../adapters/showMessage";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskLastName = state.tasks[state.tasks.length - 1]?.name;

  const nextCycle = GetNextCycle(state.currentCycle);
  const nextCycleType = GetNextCycleType(nextCycle);

  const taskNameInput = useRef<HTMLInputElement>(null);
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    showMessage.dismiss();

    if (!taskNameInput.current) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    }

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage.error('Tarefa interrompida');
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK })
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form'>
      <div className="formRow">
        <DefaultInput id='inputForm'
          type='text'
          placeholder='Digite sua task'
          labelText='Task'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={taskLastName}
        />
      </div>

      <div className="formRow">
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {!state.activeTask && (
          <DefaultButton type="submit" icon={< PlayCircle />} key={'button_1'} />
        )} {!!state.activeTask && (
          <DefaultButton type="button" icon={< StopCircle />} color="red"
            onClick={handleInterruptTask} key={'button_2'} />
        )
        }
      </div>
    </form>
  );
}