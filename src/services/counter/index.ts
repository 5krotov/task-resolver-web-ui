import { create } from "zustand";

import * as T from "./types";

export const useCounter = create<T.CounterState>()((set) => ({
  count: 0,
  increase: (by: number) => set((state) => ({ count: state.count + by })),
}));
