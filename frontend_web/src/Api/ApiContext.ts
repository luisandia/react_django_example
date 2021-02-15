import { createContext } from 'react'
import { useCookies } from 'react-cookie'
import { OpenAPI } from '../ApiGenerated'

OpenAPI.BASE = 'http://localhost:8000'

export interface ContextState {
  [name: string]: any;
}

export const initialState: ContextState = {
  token: undefined,
}
export type ApiContextType = {
  state: ContextState
}

const ApiContext = () => {

  // return 
}
export default createContext<ApiContextType>({
  state: initialState,
})
