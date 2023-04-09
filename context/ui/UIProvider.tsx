import { FC, useReducer, Children, ReactNode } from "react";
import { UIContext, uiReducer } from "./";

interface Props {
  children: ReactNode;
}

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };

  const closeSideMenu = () => dispatch({ type: "UI - Close Sidebar" });

  const setIsAddingEntry = (isAddingEntry: UIState["isAddingEntry"]) =>
    dispatch({ type: "UI - Set isAddingEntry", payload: isAddingEntry });

  const startDragging = () => dispatch({ type: "UI - Start Dragging" });

  const endDragging = () => dispatch({ type: "UI - End Dragging" });

  return (
    <UIContext.Provider
      value={{
        ...state,

        // Methods
        closeSideMenu,
        openSideMenu,

        setIsAddingEntry,
        startDragging,
        endDragging
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
