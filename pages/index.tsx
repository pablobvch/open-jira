import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Layout } from "@/components/layouts";
import { EntryList } from "../components/ui";
import { NewEntry } from "../components/ui/NewEntry";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout title={"Home - Open Jura"}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes"></CardHeader>
            <NewEntry />
            <EntryList status="pending"></EntryList>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En progreso"></CardHeader>
            <EntryList status="in-progress"></EntryList>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completadas"></CardHeader>
            <EntryList status="finished"></EntryList>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
