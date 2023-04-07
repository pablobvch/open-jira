import { GetServerSideProps } from "next";
import { Layout } from "@/components/layouts";
import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton
} from "@mui/material";
import React, { ChangeEvent, useContext, useMemo, useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Entry, EntryStatus } from "@/interfaces";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { stat } from "fs";
import { entriesApi } from "@/apis";
import { isValidObjectId } from "mongoose";
import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { dateFunctions } from "@/utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: IEntry;
}

const EntryPage: FC = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState(entry.status);
  const [touch, setTouch] = useState(false);

  const { updateEntry } = useContext(EntriesContext);

  // No es necesario memorizar los valores del state, porque son manejados por useState
  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touch,
    [inputValue.length, touch]
  );

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSaved = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    };

    updateEntry(updatedEntry, true);
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        {/* Material es mobile first */}
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )} `}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onInputValueChanged}
                onBlur={() => setTouch(true)}
                helperText={isNotValid && "Ingrese un valor"}
                error={isNotValid}
                maxRows={1000}
              ></TextField>
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((vs) => (
                    <FormControlLabel
                      key={vs}
                      value={vs}
                      control={<Radio></Radio>}
                      label={capitalize(vs)}
                    >
                      {vs}
                    </FormControlLabel>
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSaved}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark"
        }}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }; //con el as evito tipar todo

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false //la pagina existe en realidad
      }
    };
  }

  return {
    props: {
      entry
    }
  };
};

export default EntryPage;
