import type { TaskModel } from "../models/TaskModel";
import type { TaskStateModel } from "../models/TaskStateModel";

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
  CHANGE_SETTING: 'CHANGE_SETTING',
} as const;

export type TaskActionType =
  (typeof TaskActionTypes)[keyof typeof TaskActionTypes];

export type TaskActionsModel =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
    }
  | {
      type: typeof TaskActionTypes.RESET_STATE;
    }
  | {
      type: typeof TaskActionTypes.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: typeof TaskActionTypes.CHANGE_SETTING;
      payload: TaskStateModel['config'];
    }
  | {
      type: typeof TaskActionTypes.COMPLETE_TASK;
    };
