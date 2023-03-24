import React, { DragEvent, useContext } from "react";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from "@mui/material";

import { Entry } from "../../interfaces/entry";
import { UIContext } from "../../context/ui";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", entry._id);
    startDragging();
  };

  const onDragEnd = () => {
    endDragging();
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions>
          <Typography>Hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
