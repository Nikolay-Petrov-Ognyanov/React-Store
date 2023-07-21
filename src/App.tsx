import "./App.css"
import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./redux/redux hooks"
import * as localUser from "./utility/localUser"
import * as userActions from "./redux/features/user"
import Auth from "./components/Auth"
import Nav from "./components/Nav"
import Catalog from "./components/Catalog"
import Guard from "./components/Guard"

export default function App() {
	const dispatch = useAppDispatch()

	const user = useAppSelector(state => state.user.value)

	useEffect(() => {
		if (!user && localUser.get()) dispatch(userActions.setUser(localUser.get()))
	}, [dispatch, user])

	return <div className="App">
		<Nav />

		<Routes>
			<Route path="/auth" element={<Auth />} />

			<Route element={<Guard />}>
				<Route path="/" element={<Catalog />} />
			</Route>
		</Routes>
	</div>
}