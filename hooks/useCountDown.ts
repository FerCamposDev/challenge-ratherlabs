import { useEffect, useState } from "react";

export default function useCountDown(initCount = 0) {
  const [count, setCount] = useState<number>(initCount);

  useEffect(() => {
    setCount(initCount);

    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount - 1;
        console.log('newCount', newCount);

        if (newCount <= 0) {
          clearInterval(intervalId);
        }
        return newCount;
      });

    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [initCount]);

  return {
    count
  };
};
