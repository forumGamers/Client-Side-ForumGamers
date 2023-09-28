import styles from "../page.module.css";

export default async function Home(): Promise<JSX.Element> {
  return (
    <>
      <main className={styles.main}>
        <h1>home</h1>
      </main>
    </>
  );
}
