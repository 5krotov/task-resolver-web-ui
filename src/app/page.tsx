"use client";

import { Button } from "@heroui/button";

import { useCounter } from "@/services/counter";

import S from "./page.module.css";

export default function Home() {
  const count = useCounter((state) => state.count);
  const increase = useCounter((state) => state.increase);

  return (
    <div className={S.page}>
      <main className={S.main}>
        <div>{count}</div>
        <Button color="primary" size="sm" onPress={() => increase(1)}>
          New
        </Button>
      </main>
    </div>
  );
}
