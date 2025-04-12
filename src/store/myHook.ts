import {useDispatch, useSelector} from "react-redux";
import type {RootState, dispatch} from "./store.ts";

export const useAppDispatch = useDispatch.withTypes<dispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()