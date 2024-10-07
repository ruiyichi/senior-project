import { Routes, Route } from "react-router-dom"
import "./App.scss"
import Layout from "./components/Layout"
import Register from "./routes/Register"
import Unauthorized from "./routes/Unauthorized"
import ServerConnection from "./routes/ServerConnection"
import PersistLogin from "./routes/PersistLogin"
import HomeRoute from "./routes/HomeRoute"
import Login from "./routes/Login"
import RequireAuth from "./routes/RequireAuth"
import SocketServerConnection from "./routes/SocketServerConnection"
import Missing from "./routes/Missing"

const App = () => {
	return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<ServerConnection />}>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<HomeRoute />} />
            <Route path="login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route element={<SocketServerConnection />}>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
	);
}

export default App;