import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= state.order.length - 1) {
          return state;
        }

        // swap elements in array with destructuring
        [state.order[index], state.order[targetIndex]] = [
          state.order[targetIndex],
          state.order[index],
        ];

        return state;
      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          id: randomId(),
          content: "",
          type: action.payload.type,
        };

        state.data[cell.id] = cell;

        const indexToInsertAt = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (indexToInsertAt < 0) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(indexToInsertAt + 1, 0, cell.id);
        }
        return state;
      default:
        return state;
    }
  },
  initialState
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;
