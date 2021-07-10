import React from "react";
import { createFluxContext, useStore } from "../../utils";
import { AuthActions } from "./auth.actions";
import { authEffects } from "./auth.effects";
import { authReducer, AuthStore, initialState, storeName } from "./auth.reducer";

export const AuthContext = createFluxContext<AuthStore, AuthActions>(initialState, storeName);

export function AuthContextProvider({ children }: React.PropsWithChildren<{}>) {
  const value = useStore(storeName, authReducer, initialState, authEffects)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}