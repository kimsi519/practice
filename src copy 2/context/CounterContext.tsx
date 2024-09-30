import React, { createContext, useState, useContext, ReactNode } from "react";

interface CounterContextType {
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("컨텍스트 반환 오류 에러");
  }
  return context;
};

export const CounterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [count, setCount] = useState(0);

  const increaseCount = () => setCount((prevCount) => prevCount + 1);
  const decreaseCount = () => setCount((prevCount) => prevCount - 1);

  return (
    <CounterContext.Provider value={{ count, increaseCount, decreaseCount }}>
      {children}
    </CounterContext.Provider>
  );
};
