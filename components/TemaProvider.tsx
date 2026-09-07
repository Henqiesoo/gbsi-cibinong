"use client";

import { createContext, useContext } from "react";
import { TEMA, TEMA_BAWAAN, type NamaTema, type GayaOrnamen } from "@/lib/themes";

const TemaContext = createContext<NamaTema>(TEMA_BAWAAN);

export function TemaProvider({
  tema,
  children,
}: {
  tema: NamaTema;
  children: React.ReactNode;
}) {
  return <TemaContext.Provider value={tema}>{children}</TemaContext.Provider>;
}

export function useTema(): NamaTema {
  return useContext(TemaContext);
}

// Gaya ornamen yang dipakai tema aktif — menentukan bentuk hiasan pemisah
export function useOrnamen(): GayaOrnamen {
  return TEMA[useTema()].ornamen;
}
