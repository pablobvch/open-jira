import { List, Paper } from "@mui/material";
import React, { DragEvent, useMemo, useContext, FC } from "react";
import { EntryCard } from "./";
import { Padding } from "@mui/icons-material";
import { EntryStatus } from "../../interfaces/entry";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { stat } from "fs";
import { UIContext } from "@/context/ui";
import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    debugger;
    const id = event.dataTransfer.getData("text");
    const entry = entries.find((x) => x._id === id)!; //! le indica a typescript q siempre va a existir entrada
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          backgroundColor: "transparent",
          padding: "3px 5px",
          overflow: "auto"
        }}
      >
        {
          <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
            {entriesByStatus.map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))}
          </List>
        }
      </Paper>
    </div>
  );
};
