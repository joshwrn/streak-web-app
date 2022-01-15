import React, { useContext, useState, useEffect, createContext } from 'react';
import { progressToNextLevel } from '../utils/levelSystem';

import { TaskProps } from '../components/Tasks/types';

import { exampleTasks } from '../components/Tasks/exampleTasks';

type ContextProps = {
  totalXP: number;
  setTotalXP: (arg: number | ((prev: number) => number)) => void;
  allTasks: TaskProps[];
  setAllTasks: (
    arg: TaskProps[] | ((prev: TaskProps[]) => TaskProps[])
  ) => void;
};

// Create context
//if error add type to context
const AuthContext = createContext({} as ContextProps);

// Function allows you to use the context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [allTasks, setAllTasks] = useState<TaskProps[]>(exampleTasks);
  const [totalXP, setTotalXP] = useState<number>(300);

  const value = {
    allTasks,
    setAllTasks,
    setTotalXP,
    totalXP,
  };

  // Takes all value props
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
