import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
    const [status, setStatus] = useState("idle");
    const [result, setResult] = useState(null);

    const startJob = async () => {
        setStatus("starting...");
        const { jobId } = await invoke('startJob');
        setStatus('processing...');
        const interval = setInterval(async () => {
            const res = await invoke('getJobStatus', { jobId });
            if(res.status === 'completed') {
                clearInterval(interval);
                setStatus('completed');
                setResult(res.result);
            }
        
        }, 3000);
    };
return (
    <div>
        <h1> Forge Queue Demo</h1>
        <br/>
        <button onClick={startJob}> Start Long Job </button>
        <br/>
        <p> Status: {status} </p>
        <br/>
        {result && (
            <div>
                <br/>
                <h3> Result: </h3>
                <p>{result} </p>
                <br/>
            </div>
        ) }
    </div>
);
}

export default App;
