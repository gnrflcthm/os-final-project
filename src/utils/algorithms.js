

function scanAlgo({requestLocations, headPosition, direction, seekRate, trackSize}) {
    let locations = requestLocations;
    let seekSequence = [];
    let movement = 0;
    let position = headPosition;
    let i = 1;
    switch(direction) {
        case "ascending":
            i = 1;
            while (seekSequence.length < locations.length) {
                if (locations.includes(position) && !seekSequence.includes(position)) {
                    seekSequence.push(position);
                    if (seekSequence.length === requestLocations.length) break;
                }
                    movement += 1;
                if (position + i > trackSize - 1) {
                    i = -1;
                }
                position += i;
            }
            break;
        case "descending":
            i = -1;
            while (seekSequence.length < requestLocations.length) {
                if (locations.includes(position) && !seekSequence.includes(position)) {
                    seekSequence.push(position);
                    if (seekSequence.length === requestLocations.length) break;
                }
                movement += 1;
                if (position + i < 0) {
                    i = 1;
                }
                position += i;
            }
            break;
    }
    return {
        seekSequence,
        totalHeadMovement: movement,
        seekTime: seekRate * movement
    }
}

function cpuAlgo(data) {
    if (data.algorithm === "SJF") {
        return SJF(data);
    } else if (data.algorithm === "RR") {
        return RR(data);
    }
}

function SJF({algorithm, arrivalTime, burstTime}) {
    let container = arrivalTime.map((_, i) => [i + 1, arrivalTime[i], burstTime[i], 0, 0, 0]);
    let n = container.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (container[j][1] > container[j + 1][1]) {
                for (let k = 0; k < 3; k++) {
                    let temp = container[j][k];
                    container[j][k] = container[j + 1][k];
                    container[j + 1][k] = temp;
                }
            }
        }
    }
    let temp, val = -1;
    container[0][3] = container[0][1] + container[0][2];
    container[0][5] = container[0][3] - container[0][1];
    container[0][4] = container[0][5] - container[0][2];

    for (let i = 1; i < n; i++) {
        temp = container[i - 1][3];
        let low = container[i][2];
        for (let j = i; j < n; j++) {
            if (temp >= container[j][1] && low >= container[j][2]) {
                low = container[j][2];
                val = j;
            }
        }
        container[val][3] = temp + container[val][2];
        container[val][5] = container[val][3] - container[val][1];
        container[val][4] = container[val][5] - container[val][2];
        for (let k = 0; k < 6; k++) {
            let tem = container[val][k];
            container[val][k] = container[i][k];
            container[i][k] = tem;
        }
    }
    
    //Average
    let aveWaiting = 0, aveTurnaround = 0;
    for (let i = 0; i < n; i++) {
        aveWaiting += container[i][4];
    }
    aveWaiting /= n;
    
    for (let i = 0; i < n; i++) {
        aveTurnaround += container[i][5];
    }
    aveTurnaround /= n;
    return {
        algorithm,
        container,
        aveWaiting,
        aveTurnaround
    }
}

function RR({algorithm, arrivalTime, burstTime, quantumTime}) {
    let t = 0; //cpu time
    let p = arrivalTime.map((_, i) => i + 1)
    let qt = parseInt(quantumTime)
    let at = [...arrivalTime]
    let bt = [...burstTime]
	    	
    // result of average times 
    let wt = 0;  //waiting time
    let tat = 0; //turnaround time 

    // copy of burst time array and arrival time array (in order to not affect the actual array)
    let at_res = [...arrivalTime]
    let bt_res = [...burstTime]

    // array to store the waiting time 
    let waiting = at.map(() => 0); 

    // array to store the turnaround time
    let turnaround = at.map(() => 0); 

    while (true) { 
        let flag = true; 
        for (let i = 0; i < p.length; i++) {
            //checks if arrival time of index i matches the cpu time
            //proceed to running queue if the following statements are met
            if (at_res[i] <= t) { 
                if (at_res[i] <= qt) { 
                    if (bt_res[i] > 0) { 
                        flag = false; 
                        if (bt_res[i] > qt) { 
                            //decrease the bt for index i and increase cpu time and arrival time
                            t = t + qt; 
                            bt_res[i] = bt_res[i] - qt; 
                            at_res[i] = at_res[i] + qt; 
                        } 
                        else { //if bt < qt	
                            //empty the bt for index i, increase cpu time, store turnaround time and wait time
                            t = t + bt_res[i];
                            turnaround[i] = t - at[i];
                            waiting[i] = t - bt[i] - at[i];
                            bt_res[i] = 0; 
                        } 
                    } 
                } 
                else if (at_res[i] > qt) { 
                    // if at of index i is > than qt, check and prioritize other processes with lesser arrival time
                    for (let j = 0; j < p.length; j++) { 
                        if (at_res[j] < at_res[i]) {  // compare processes
                            if (bt_res[j] > 0) { 
                                flag = false; 
                                if (bt_res[j] > qt) { 
                                    //decrease the bt for index j and increase cpu time and arrival time
                                    t = t + qt; 
                                    bt_res[j] = bt_res[j] - qt; 
                                    at_res[j] = at_res[j] + qt; 
                                } 
                                else { 
                                    //empty the bt for index j, increase cpu time, store turnaround time and wait time
                                    t = t + bt_res[j]; 
                                    turnaround[j] = t - at[j]; 
                                    waiting[j] = t - bt[j] - at[j]; 
                                    bt_res[j] = 0; 
                                } 
                            } 
                        } 
                    } 
                    // execute the previous process next (index i)
                    if (bt_res[i] > 0) { 
                        flag = false; 
                        if (bt_res[i] > qt) { 
                            t = t + qt; 
                            bt_res[i] = bt_res[i] - qt; 
                            at_res[i] = at_res[i] + qt; 
                        } 
                        else { 
                            t = t + bt_res[i]; 
                            turnaround[i] = t - at[i]; 
                            waiting[i] = t - bt[i] - at[i]; 
                            bt_res[i] = 0; 
                        } 
                    } 
                } 
            } 
            // if at of index i is not yet on the critical time 
            else if (at_res[i] > t) { 
                t++; 
                i--; 
            } 
        } 
        // exit while loop 
        if (flag) { 
            break; 
        } 
    } 
    
    //Display results
    for (let i = 0; i < p.length; i++) { 
        wt = wt + waiting[i]; 
        tat = tat + turnaround[i]; 
    } 

    return {
        algorithm,
        arrivalTime, 
        burstTime,
        waitingTime: waiting,
        turnaroundTime: turnaround,
        aveWaiting: wt / p.length,
        aveTurnaround: tat / p.length
    }
}

export {
    scanAlgo,
    cpuAlgo
}

