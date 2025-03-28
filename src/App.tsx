import { useState } from "hono/jsx";
import styles from "./App.module.css";

export function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.app}>
      <h1>Hello, world!</h1>
      <button type="button" onClick={handleClick}>
        Click me
      </button>
      <p>Count: {count}</p>
    </div>
  );
}
