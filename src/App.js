import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainScreen from "./components/MainScreen";
import DiskScheduling from "./components/DiskScheduling";
import { useTransition, animated } from "react-spring";
import CpuScheduling from "./components/CpuScheduling";

function App() {
    const [current, setCurrent] = useState("MainScreen");
    const [returning, setReturning] = useState(false);

    const transitions = useTransition(current, {
        from: { opacity: 0, x: returning ? -150 : 150, position: "absolute" },
        enter: { opacity: 1, x: 0, pointerEvents: 'auto' },
        leave: { opacity: 0, x: returning ? 150 : -150, pointerEvents: 'none' },
    });
    return (
        <div className="container d-flex justify-content-center align-items-center fill-height py-3">
            <div className="card col-12 col-md-6 h-100 card-bg overflow-hidden">
                <h1 className="text-center py-4 h2">OS Final Project</h1>
                <div className="position-relative row">
                    {transitions((styles, item) => {
                        let component = null;
                        switch (item) {
                            case "MainScreen":
                                component = (
                                    <MainScreen
                                        onCpuSelect={() => {
                                            setCurrent("CpuScheduling");
                                            setReturning(false);
                                        }}
                                        onDiskSelect={() => {
                                            setCurrent("DiskScheduling");
                                            setReturning(false);
                                        }}
                                    />
                                );
                                break;
                            case "DiskScheduling":
                                component = (
                                    <DiskScheduling
                                        onReturn={() => {
                                            setCurrent("MainScreen");
                                            setReturning(true);
                                        }}
                                    />
                                );
                                break;
                            case "CpuScheduling":
                                component = (
                                    <CpuScheduling
                                        onReturn={() => {
                                            setCurrent("MainScreen");
                                            setReturning(true);
                                        }}
                                    />
                                );
                                break;
                            default:
                                break;
                        }
                        return (
                            <animated.div style={styles}>
                                {component}
                            </animated.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
