import "./App.css"
import { Routes, Route } from "react-router-dom"
import Auth from "./components/Auth"
import Nav from "./components/Nav"

export default function App() {
	return <div className="App">
		<Nav />

		<Routes>
			<Route path="/auth" element={<Auth />} />
		</Routes>
	</div>
}