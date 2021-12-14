import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import CSInput from "./CSInput";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CSOutput from "./CSOutput";

function CpuScheduling({ onReturn }) {
    const [current, setCurrent] = useState("CSInput");
    const [cpuSchedData, setCpuSchedData] = useState({});
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
                    onClick={() => {
                        onReturn();
                    }}
                >
                    <i className="bi-caret-left-fill"></i>
                    <span className="return-btn-text">Return</span>
                </p>
                <h3 className="h3 text-center w-100">CPU Scheduling</h3>
            </div>
            <div className="position-relative row">
                {transition((styles, item) => {
                    let component = null;
                    switch (item) {
                        case "CSOutput":
                            component = (
                                <CSOutput input={cpuSchedData} />
                            );
                            break;
                        case "CSInput":
                        default: 
                            component = (
                                <CSInput
                                    updateCpuSchedData={(data) =>
                                        setCpuSchedData(data)
                                    }
                                    onCompute={() =>
                                        setCurrent("CSOutput")
                                    }
                                />
                            );
                            break;

                    }
                    return (
                        <animated.div style={styles}>{component}</animated.div>
                    );
                })}
            </div>
        </div>
    );
}

export default CpuScheduling;
