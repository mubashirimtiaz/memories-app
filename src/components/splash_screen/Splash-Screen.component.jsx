import styles from "./splash-screen.module.css";

function SplashScreen() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className={styles.loader}></div>;
    </div>
  );
}

export default SplashScreen;
