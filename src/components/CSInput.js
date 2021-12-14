import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";

function CSInput({ updateCpuSchedData, onCompute }) {
    const [algorithm, setAlgorithm] = useState("SJF");
    const [arrivalTime, setArrivaTime] = useState([]);
    const [burstTime, setBurstTime] = useState([]);
    const [quantumTime, setQuantumTime] = useState(1);
    const [invalidArrivalTime, setInvalidArrivalTime] = useState(false);
    const [invalidBurstTime, setInvalidBurstTime] = useState(false);
    const [invalidQuantumTime, setInvalidQuantumTime] = useState(false);
    const [enabledButton, setEnabledButton] = useState(false);

    const qTimeTransition = useTransition(algorithm, {
        from: { opacity: 0, marginTop: -80 },
        enter: { opacity: 1, marginTop: 0 },
        leave: { opacity: 0, marginTop: -80 },
    });

    useEffect(() => {
        setInvalidQuantumTime(quantumTime <= 0);
        updateCpuSchedData({
            algorithm,
            arrivalTime,
            burstTime,
            quantumTime,
        });
    }, [arrivalTime, burstTime, quantumTime]);

    useEffect(() => {
        updateBurstTime(burstTime.join(" "));
    }, [arrivalTime])

    useEffect(() => {
        setEnabledButton(
            [
                invalidArrivalTime,
                invalidBurstTime,
                invalidQuantumTime,
                burstTime.length <= 1,
            ].every((val) => !val)
        );
    }, [invalidArrivalTime, invalidBurstTime, invalidQuantumTime, burstTime]);

    function updateArrivalTime(value) {
        let values = value
            .trim()
            .replace("  ", " ")
            .split(" ")
            .map((val) => parseInt(val));
        if (value.trim() === "") {
            setInvalidArrivalTime(false);
        } else {
            if (values.includes(NaN)) {
                setInvalidArrivalTime(true);
            } else {
                if (values.some((val) => val < 0)) {
                    setInvalidArrivalTime(true);
                } else {
                    setInvalidArrivalTime(false);
                    setArrivaTime(values);
                }
            }
        }
    }

    function updateBurstTime(value) {
        let values = value
            .trim()
            .replace("  ", " ")
            .split(" ")
            .map((val) => parseInt(val));
        if (value.trim() === "") {
            setInvalidBurstTime(false);
        } else {
            if (values.includes(NaN)) {
                setInvalidBurstTime(true);
            } else {
                if (values.some((val) => val <= 0) || (arrivalTime.length > 0 && arrivalTime.length !== values.length) || values.length <= 1) {
                    setInvalidBurstTime(true);
                } else {
                    setInvalidBurstTime(false);
                }
                setBurstTime(values);
            }
        }
    }

    return (
        <div>
            <div className="form-group my-3">
                <h6 className="text-center">ALGORITHM</h6>
                <select
                    className="form-control"
                    onChange={(e) => {
                        setAlgorithm(e.target.value);
                        setQuantumTime(1);
                    }}
                >
                    <option value="SJF" selected={algorithm === "SJF"}>
                        SJF
                    </option>
                    <option value="RR" selected={algorithm === "RR"}>
                        Round Robin
                    </option>
                </select>
            </div>
            <div className="form-group my-3">
                <h6 className="text-center">ARRIVAL TIMES</h6>
                <input
                    type="text"
                    className={`form-control ${
                        invalidArrivalTime ? "is-invalid" : ""
                    }`}
                    onChange={(e) => updateArrivalTime(e.target.value)}
                    placeholder="eg. 12 23 34 45 56"
                />
            </div>
            <div className="form-group my-3">
                <h6 className="text-center">BURST TIMES</h6>
                <input
                    type="text"
                    className={`form-control ${
                        invalidBurstTime ? "is-invalid" : ""
                    }`}
                    onChange={(e) => updateBurstTime(e.target.value)}
                    placeholder="eg. 12 23 34 45 56"
                />
            </div>
            {qTimeTransition(
                (styles, item) =>
                    item === "RR" && (
                        <animated.div style={styles}>
                            <div className="form-group my-3">
                                <h6 className="text-center">TIME QUANTUM</h6>
                                <input
                                    type="number"
                                    className={`form-control ${
                                        invalidQuantumTime ? "is-invalid" : ""
                                    }`}
                                    onChange={(e) =>
                                        setQuantumTime(parseInt(e.target.value))
                                    }
                                    placeholder="in Milliseconds(ms). Default 1ms"
                                />
                            </div>
                        </animated.div>
                    )
            )}
            <button
                className={`btn btn-primary w-100 ${
                    enabledButton ? "" : "disabled"
                }`}
                onClick={() => onCompute()}
            >
                COMPUTE
            </button>
        </div>
    );
}

export default CSInput;
