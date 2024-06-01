import { useDispatch, useSelector } from "react-redux" // Importing hooks from react-redux library

import type { TypedUseSelectorHook } from "react-redux" // Importing type definitions for useSelector hook
import type { RootState, AppDispatch } from "./store" // Importing type definitions for RootState and AppDispatch

// Custom hook to get access to the dispatch function from Redux store
export const useAppDispatch = useDispatch

// Custom hook with TypeScript support for type-safe usage of useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector