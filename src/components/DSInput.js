
import React, { useState, useEffect } from 'react'

function DiskSchedulingOutput({ updateDiskSchedData, onCompute }) {
    const [trackSize, setTrackSize] = useState(1);
    const [headPosition, setHeadPosition] = useState(0);
    const [seekRate, setSeekRate] = useState(1);
    const [requestLocations, setRequestLocations] = useState([]);
    const [direction, setDirection] = useState("descending");
    const [invalidTrackSize, setInvalidTrackSize] = useState(false);
    const [invalidHeadPosition, setInvalidHeadPosition] = useState(false);
    const [invalidSeekRate, setInvalidSeekRate] = useState(false);
    const [invalidLocations, setInvalidLocations] = useState(false);
    const [enabledButton, setEnabledButton] = useState(false);

    useEffect(() => {
        setInvalidHeadPosition(headPosition >= trackSize || headPosition < 0);
        setInvalidTrackSize(trackSize <= 0);
        setInvalidSeekRate(seekRate <= 0);
        updateDiskSchedData({
            trackSize,
            headPosition,
            seekRate,
            requestLocations: [... new Set(requestLocations)],
            direction,
        });
    }, [headPosition, trackSize, seekRate, requestLocations, direction]);

    useEffect(() => {
        setEnabledButton(
            [
                invalidTrackSize,
                invalidHeadPosition,
                invalidSeekRate,
                invalidLocations,
                requestLocations.length === 0,
            ].every((val) => !val)
        );
    }, [
        invalidTrackSize,
        invalidHeadPosition,
        invalidSeekRate,
        invalidLocations,
        requestLocations,
    ]);

    useEffect(() => {
        if (requestLocations.includes(NaN)) {
            setInvalidLocations(true);
        } else {
            if (requestLocations.some((val) => val < 0 || val >= trackSize)) {
                setInvalidLocations(true);
            } else {
                setInvalidLocations(false);
            }
        }
    }, [trackSize, requestLocations])

    function updateRequestLocations(target) {
        if (target.value === "") {
            setRequestLocations([]);
            setInvalidLocations(false);
            return;
        }
        let values = target.value
            .trim()
            .replace("  ", " ")
            .split(" ")
            .map((val) => parseInt(val));
        if (values.includes(NaN)) {
            setInvalidLocations(true);
        } else {
            if (values.some((val) => val < 0 || val >= trackSize)) {
                setInvalidLocations(true);
            } else {
                setInvalidLocations(false);
                setRequestLocations(values);
            }
        }
    }

    return (
        <div>
            <div className="form-group my-3">
                <h6 className="h6 text-center">TRACK SIZE</h6>
                <input
                    type="number"
                    className={`form-control ${
                        invalidTrackSize ? "is-invalid" : ""
                    }`}
                    onChange={(e) =>
                        setTrackSize(
                            e.target.value === "" ? 1 : parseInt(e.target.value)
                        )
                    }
                    placeholder="Default 1"
                />
            </div>
            <div className="form-group my-3">
                <h6 className="h6 text-center">CURRENT HEAD POSITION</h6>
                <input
                    type="number"
                    className={`form-control ${
                        invalidHeadPosition ? "is-invalid" : ""
                    }`}
                    onChange={(e) =>
                        setHeadPosition(
                            e.target.value === "" ? 0 : parseInt(e.target.value)
                        )
                    }
                    placeholder="Default 0"
                />
            </div>
            <div className="form-group my-3">
                <h6 className="h6 text-center">SEEK RATE</h6>
                <input
                    type="number"
                    className={`form-control ${
                        invalidSeekRate ? "is-invalid" : ""
                    }`}
                    onChange={(e) =>
                        setSeekRate(
                            e.target.value === "" ? 1 : parseInt(e.target.value)
                        )
                    }
                    placeholder="in milliseconds(ms), Default 1ms"
                />
            </div>
            <div className="form-group my-3">
                <h6 className="h6 text-center">REQUEST LOCATIONS</h6>
                <input
                    type="text"
                    className={`form-control ${
                        invalidLocations ? "is-invalid" : ""
                    }`}
                    placeholder="eg. 12 23 34 45 65 67"
                    onChange={(e) => updateRequestLocations(e.target)}
                />
            </div>
            <div className="form-group my-3 text-center">
                <h6 className="h6 text-center">DIRECTION</h6>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="direction"
                        value="descending"
                        checked={direction === "descending"}
                        onChange={(e) => setDirection(e.target.value)}
                    />
                    <label class="form-check-label">DESCENDING</label>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="direction"
                        value="ascending"
                        checked={direction === "ascending"}
                        onChange={(e) => setDirection(e.target.value)}
                    />
                    <label class="form-check-label">ASCENDING</label>
                </div>
            </div>
            <button
                className={`btn btn-primary w-100 ${
                    enabledButton ? "" : "disabled"
                }`}
                onClick={() => onCompute()}
            >
                COMPUTE
            </button>
        </div>
    )
}

export default DiskSchedulingOutput
