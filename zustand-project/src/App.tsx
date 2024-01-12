import { useStore } from "./store";

export function App() {
  const number = useStore((state) => state.number);
  const increaseNumber = useStore((state) => state.increaseNumber);

  return <button onClick={increaseNumber}>{number}</button>;
}
