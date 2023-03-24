import { EntriesState } from "./";
import { EntryStatus } from "../../interfaces/entry";

type EntriesActionType =
  | { type: "[Entry] Add-Entry"; payload: Entry }
  | { type: "[Entry] Entry-Updated"; payload: Entry };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry] Add-Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };
    case "[Entry] Entry-Updated":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            //solo modifico estas entradas, el resto las dejo como esta
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          console.log({ entry });
          return entry;
        })
      };
    default:
      return state;
  }
};
