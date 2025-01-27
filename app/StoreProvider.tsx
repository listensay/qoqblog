"use client";

import React, { memo } from 'react'
import { Provider } from 'react-redux';
import { AppStore, makeStore } from "./lib/store";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { setupListeners } from "@reduxjs/toolkit/query";

interface Props {
  readonly children: ReactNode;
}

const page = memo(({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);


  return <Provider store={ storeRef.current }>{ children }</Provider>
})

export default page