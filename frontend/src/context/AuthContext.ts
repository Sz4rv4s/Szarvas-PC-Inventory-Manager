import {createContext} from "react";
import {AuthContextTypes} from "../types/types.ts";

export const AuthContext = createContext<AuthContextTypes | undefined>(undefined);
