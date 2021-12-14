import React from "react";
import { cpuAlgo } from "../utils/algorithms";

function CSOutput({ input }) {
    const data = cpuAlgo(input)
    const { algorithm, container, aveWaiting, aveTurnaround, arrivalTime, burstTime, waitingTime, turnaroundTime } = data;
    return (
        <div>
            {algorithm === "SJF" ? (
                <table className="table">
                    <thead>
                        <tr>
                            <td colSpan={5}>
                                <h4 className="text-center">Output</h4>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <h5 className="text-center">{algorithm}</h5>
                            </td>
                        </tr>
                        <tr>
                            <td>Process ID</td>
                            <td>Arrival Time</td>
                            <td>Burst Time</td>
                            <td>Waiting Time</td>
                            <td>Turnaround Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {container.map((row) => (
                            <tr>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td>{row[2]}</td>
                                <td>{row[4]}</td>
                                <td>{row[5]}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}>Average Waiting Time</td>
                            <td colSpan={2} className="text-end">
                                {aveWaiting}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>Average Turnaround Time</td>
                            <td colSpan={2} className="text-end">
                                {aveTurnaround}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <td colSpan={5}>
                                <h4 className="text-center">Output</h4>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <h5 className="text-center">{algorithm}</h5>
                            </td>
                        </tr>
                        <tr>
                            <td>Process ID</td>
                            <td>Arrival Time</td>
                            <td>Burst Time</td>
                            <td>Waiting Time</td>
                            <td>Turnaround Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arrivalTime.map((_, i) => 
                                <tr>
                                    <td>P{i + 1}</td>
                                    <td>{arrivalTime[i]}</td>
                                    <td>{burstTime[i]}</td>
                                    <td>{waitingTime[i]}</td>
                                    <td>{turnaroundTime[i]}</td>
                                </tr>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}>Average Waiting Time</td>
                            <td colSpan={2} className="text-end">
                                {aveWaiting.toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>Average Turnaround Time</td>
                            <td colSpan={2} className="text-end">
                                {aveTurnaround.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}

export default CSOutput;
