import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import { scanAlgo } from "../utils/algorithms";
import DSInput from "./DSInput";
import DSOutput from "./DSOutput";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Header.css";

function DiskScheduling({ onReturn }) {
    const [diskSchedData, setDiskSchedData] = useState({});
    const [current, setCurrent] = useState("DSInput");
    const transition = useTransition(current, {
        from: { opacity: 0, x: 150, position: "absolute" },
        enter: { opacity: 1, x: 0 },
        leave: { opacity: 0, x: -150 },
    });

    return (
        <div className="px-3">
            <div className="position-relative d-flex justify-content-start px-1">
                <p
                    className="position-absolute m-0 p-0 return-btn"
                    onClick={() => onReturn()}
                >
                    <i className="bi-caret-left-fill"></i>
                    <span className="return-btn-text">Return</span>
                </p>
                <h3 className="h3 text-center w-100">SCAN Disk Scheduling</h3>
            </div>
            <div className="position-relative row">
                {transition((style, item) => {
                    let component = null;
                    switch (item) {
                        case "DSOutput":
                            component = (
                                <DSOutput data={scanAlgo(diskSchedData)} />
                            );
                            break;
                        case "DSInput":
                        default:
                            component = (
                                <DSInput
                                    updateDiskSchedData={(data) =>
                                        setDiskSchedData(data)
                                    }
                                    onCompute={() => setCurrent("DSOutput")}
                                />
                            );
                            break;
                    }
                    return (
                        <animated.div style={style}>{component}</animated.div>
                    );
                })}
            </div>
        </div>
    );
}

export default DiskScheduling;
