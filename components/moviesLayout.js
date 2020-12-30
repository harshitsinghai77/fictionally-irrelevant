import SEO from "./seo";
import Alert from "./alert";
import styles from "../styles/layout.module.css";
import utilStyles from "../styles/utils.module.css";

export default function MoviesLayout({ children }) {
  return (
    <>
      <Alert />
      <div className="mt-16 lg:mx-36 md:mx-12 sm:mx-10 xs:mx-16">
        <SEO title="Movielogs | Harshit" />
        <div className={styles.header}>
          <h1 className={utilStyles.headingLg}>Movies Logs</h1>
        </div>
        {children}
      </div>
    </>
  );
}