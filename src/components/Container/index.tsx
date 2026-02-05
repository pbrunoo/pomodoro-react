import styles from './styles.module.css';
import type { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>
          {children}
        </section>
      </div>
    </div>
  );
}