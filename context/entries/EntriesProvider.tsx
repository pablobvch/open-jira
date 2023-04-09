import { FC, ReactNode, useEffect, useReducer } from "react";

import { Entry } from "../../interfaces";

import { EntriesContext, entriesReducer } from "./";
import entriesApi from "../../apis/entriesApi";
import { useSnackbar } from "notistack";

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: ReactNode; //React.ReactChild | React.ReactChildren | ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: []
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>("/entries", {
        description
      });
      dispatch({ type: "[Entry] Add-Entry", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar: boolean = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status
      });

      if (showSnackbar) {
        enqueueSnackbar("Entrada actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
      }

      dispatch({
        type: "[Entry] Entry-Updated",
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeEntry = async (
    { _id, description, status }: Entry,
    showSnackbar: boolean = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status
      });

      if (showSnackbar) {
        enqueueSnackbar("Entrada removida", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
      }

      dispatch({
        type: "[Entry] Entry-Removed",
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        removeEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
