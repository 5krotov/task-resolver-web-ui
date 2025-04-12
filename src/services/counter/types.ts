export interface CounterData {
  count: number;
}

export interface CounterState extends CounterData {
  increase: (by: number) => void;
}
