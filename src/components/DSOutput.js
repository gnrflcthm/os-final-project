
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

function DSOutput({data}) {
    const { seekSequence, totalHeadMovement, seekTime } = data;
    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <td colSpan={3}><h4 className='text-center'>Output</h4></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Seek Sequence</td>
                        <td className='text-end'>{seekSequence.join(", ")}</td>
                    </tr>
                    <tr>
                        <td>Total Head Movement</td>
                        <td className='text-end'>{totalHeadMovement}</td>
                    </tr>
                    <tr>
                        <td>Seek Time</td>
                        <td className='text-end'>{seekTime} ms</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DSOutput
