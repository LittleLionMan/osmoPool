'use client'

import { useState, useEffect } from 'react';
import { NavBar } from "@/components/NavBar";

export default function Python() {
    const [poolId, setPoolId] = useState('');
    const [plotData, setPlotData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        import('react-plotly.js').then(Plot => {
            setPlotLibrary(Plot);
        });
    }, []);

    const [Plot, setPlotLibrary] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await fetch('/api/run-script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ poolId }),
            });

            if (!response.ok) {
                throw new Error('Failed to execute script');
            }

            const data = await response.json();
            const jsonData = JSON.parse(data.data); // Parse the string data to JSON
            setPlotData(jsonData); // Update state with parsed JSON data
        } catch (error) {
            setError(error.message);
        }
    };

    const handleInputChange = (event) => {
        setPoolId(event.target.value);
    };

    return (
        <div className="container mx-auto p-5">
            <NavBar />
            <form className="w-full max-w-sm">
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Pool Id"
                        aria-label="Pool Id"
                        value={poolId}
                        onChange={handleInputChange}
                    />
                    <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </form>

            {plotData && Plot && (
                <div>
                    <h2>Plot:</h2>
                    <Plot
                        data={[
                            {
                                x: plotData.map(entry => entry.lower_tick),
                                y: plotData.map(entry => entry.upper_tick),
                                z: plotData.map(entry => entry.liquidity_amount),
                                mode: 'markers',
                                type: 'scatter3d',
                                marker: {
                                    size: 5,
                                    opacity: 0.8,
                                },
                            },
                        ]}
                        layout={{
                            title: '3D Plot of Liquidity Amount vs. Tick Range',
                            scene: {
                                xaxis: { title: 'Lower Tick Value' },
                                yaxis: { title: 'Upper Tick Value' },
                                zaxis: { title: 'Liquidity Amount' },
                            },
                        }}
                    />
                </div>
            )}

            {error && <div>Error: {error}</div>}
        </div>
    );
}
