import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
const Home = () => {
  return (
    <div className={cx("container")}>
      <h1 className={cx("text")}>Home</h1>
    </div>
  );
};

export default Home;
