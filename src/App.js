import { BrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"

import { Link, Route, Routes, Redirect } from "react-router-dom"
import "antd/dist/antd.less"
import "./App.less"
import "./Custom.less"
import Document_quanly_tao from "./Pages/Document_quanly_tao"
import Document_quanly_gui from "./Pages/Document_quanly_gui"
import Document_quanly_den from "./Pages/Document_quanly_den"
import Document_tao from "./Pages/Document_tao"
import Document_dagui from "./Pages/Document_dagui"
import Document_xuly from "./Pages/Document_xuly"
import Template_quanly from "./Pages/Template_quanly"
import Template_flow_quanly from "./Pages/Template_flow_quanly"
import Template from "./Pages/Template"
import Template_flow from "./Pages/Template_flow"
import Sidebar from "./components/SideBar/index"
import { getToken, parseJwt } from "../utils/helper"
import { motion } from "framer-motion"

const PageLayout = ({ children }) => children

const pageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    },
}

const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: 0.6,
}

const AnimationLayout = () => {
    const { pathname } = useLocation()
    return (
        <PageLayout>
            <motion.div
                key={pathname}
                initial="initial"
                animate="in"
                variants={pageVariants}
                transition={pageTransition}
            >
                <Outlet />
            </motion.div>
        </PageLayout>
    )
}

function App() {
    const userData = parseJwt(getToken("_ttoauth"))

    const handleRouter = () => {
        return (
            <Routes>
                <Route element={<AnimationLayout />}>
                    <Route path="/u" element={<Document_quanly_tao />} />
                    <Route path="/dagui" element={<Document_quanly_gui />} />
                    <Route path="/guiden" element={<Document_quanly_den />} />
                    <Route path="/ud" element={<Document_dagui />} />
                    <Route path="/ut" element={<Document_tao />} />
                    <Route path="/ue" element={<Document_xuly />} />

                    {/* <Route path="/" element={<Navigate to="/guiden" replace />} /> */}

                    {/* Check if admin */}
                    {userData.user_id == 1 && (
                        <>
                            <Route
                                exact
                                path="/dscc"
                                element={<Template_flow_quanly />}
                            />
                            <Route
                                exact
                                path="/quanly_template"
                                element={<Template_quanly />}
                            />
                            <Route path="/vbct" element={<Template />} />
                            <Route
                                path="/edit_template"
                                element={<Template />}
                            />
                            <Route path="/taoqt" element={<Template_flow />} />
                        </>
                    )}
                </Route>
            </Routes>
        )
    }
    return (
        <div className="workflow-service">
            <Provider store={store}>
                {console.log(window.location.href.includes("workflowfe"))}
                {window.location.href.includes("workflowfe") === false ? (
                    handleRouter()
                ) : (
                    <div style={{ display: "flex" }}>
                        <BrowserRouter>
                            <Sidebar style={{ flex: 1 }} />
                            {handleRouter()}
                        </BrowserRouter>
                    </div>
                )}
            </Provider>
        </div>
    )
}

export default App

// const App = () => {
//     return (
//         <div>
//             App
//         </div>
//     );
// }

// export default App;
