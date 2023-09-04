import styles from "./page.module.css";
import logo from "../assets/logo.png";
import shape1 from "../assets/shape2.png";
import Image from "next/image";
import moment from "moment";
import { useMemo } from "react";

async function getData() {
  const res = await fetch("https://analytics.eu.amplitude.com/api/2/realtime", {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Basic ${process.env.BASIC_AUTH}`,
    },
    next: { revalidate: 5 * 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  const array = response.data.series[1];
  return array[array.length - 1];
}

export default async function Home() {
  const amplitude = await getData();
  const date = moment().format("DD/MM/Y");

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logo} className={styles.logo} alt='' />
      </div>
      <div className={styles.line1} />
      <div className={styles.title}>
        Temps
        <br />
        Réel sur Editeur
      </div>
      <div className={styles.date}>{date}</div>
      <div className={styles.line2} />
      <div className={styles.shape1}>
        <Image src={shape1} alt='' />
      </div>
      <div className={styles.countContainer}>
        <div className={styles.users}>Utilisateurs</div>
        <div className={styles.count}>{amplitude}</div>
      </div>
    </div>
  );
}
