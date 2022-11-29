import styles from '../styles/Home.module.css';
import Dashboard from '../src/components/dashboard'

export default function Home() {
  return (
    <div className={styles.container}>
      <Dashboard/>
     </div>
  )
}