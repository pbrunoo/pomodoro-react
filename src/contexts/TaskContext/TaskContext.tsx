import { createContext } from "react"
import type { TaskStateModel } from "../../models/TaskStateModel"
import { initialTaskState } from "./initialTaskState"
import type { TaskActionsModel } from "../TaskActions"

export type TaskContextProps = {
  state: TaskStateModel,
  dispatch: React.Dispatch<TaskActionsModel>
}

const intialContextValue = {
  state: initialTaskState,
  dispatch: () => { }
}

export const TaskContext = createContext<TaskContextProps>(intialContextValue);
