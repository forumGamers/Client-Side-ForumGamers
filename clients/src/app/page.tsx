import BasePage from "@/components/views/basePage";
import styles from "./page.module.css";

export default async function Home(): Promise<JSX.Element> {
  return (
    <>
      <BasePage>
        <main className={styles.main}>
          <h1>home</h1>
        </main>
      </BasePage>
    </>
  );
}
