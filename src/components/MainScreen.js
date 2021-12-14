import React from "react";
import './MainScreen.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

function MainScreen({onCpuSelect, onDiskSelect}) {
    return (
        <div>
            <h6 className="h6 text-center text-secondary my-3">
                CHOOSE BETWEEN:
            </h6>
            <div className="border p-3 d-flex justify-content-between align-items-center next-link" onClick={() => onCpuSelect()}>
                <h3 className="h3 text-start m-0">CPU Scheduling</h3>
                <i className="bi-caret-right-fill"></i>
            </div>
            <h6 className="h6 text-center text-secondary my-3">OR</h6>
            <div className="border p-3 d-flex justify-content-between align-items-center next-link" onClick={() => onDiskSelect()}>
                <h3 className="h3 text-start m-0">Disk Scheduling</h3>
                <i className="bi-caret-right-fill"></i>
            </div>
        </div>
    );
}

export default MainScreen;
