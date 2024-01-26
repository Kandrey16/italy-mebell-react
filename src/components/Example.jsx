import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function Example() {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}>{count}</Button>;
}
