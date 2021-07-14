import { Link } from "react-router-dom";
import styles from './Navigation.module.scss';

export default function Navigation() {
  return (
    <div className={styles.wrapper}>
      <Link to="/">Home</Link>
      <Link to="/find">Find</Link>
      <Link to="/finished">Finished</Link>
    </div>
  )
}