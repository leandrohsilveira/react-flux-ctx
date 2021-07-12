import React from "react";
import { createFluxContext, makeStoreContext, useStoreContext } from "../../utils";
import { AuthAction } from "./auth.actions";
import { authEffects } from "./auth.effects";
import { authReducer, AuthStore, initialState, storeName } from "./auth.reducer";

export const AuthContext = createFluxContext<AuthStore, AuthAction>(initialState, storeName);

export const { useActionCreator, useStoreSelector } = makeStoreContext(AuthContext)

export function AuthContextProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <AuthContext.Provider value={useStoreContext(storeName, authReducer, initialState, authEffects)}>
      {children}
    </AuthContext.Provider>
  )
}