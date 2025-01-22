import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { TextField, Box, Typography } from "@mui/material";

const data = [
    { name: "2018", inflation: 4, deflation: 2.4 },
    { name: "2019", inflation: 3, deflation: 1.3 },
    { name: "2020", inflation: 2, deflation: 9.8 },
    { name: "2021", inflation: 2.7, deflation: 3.9 },
    { name: "2022", inflation: 1.89, deflation: 4.8 },
    { name: "2023", inflation: 2.39, deflation: 3.8 },
    { name: "2024", inflation: 3.49, deflation: 4.3 }
];

export default function LineChartComponent({ onEdit }) {
    const [colorDeflation, setColorDeflation] = useState("#8884d8");
    const [colorInflation, setColorInflation] = useState("#82ca9d");

    useEffect(() => {
        const savedColorDeflation = localStorage.getItem("colorDeflation");
        const savedColorInflation = localStorage.getItem("colorInflation");
        if (savedColorDeflation) setColorDeflation(savedColorDeflation);
        if (savedColorInflation) setColorInflation(savedColorInflation);
        console.log("localStorage",localStorage)
    }, []);

    const handleColorDeflationChange = (e) => {
        const newColor = e.target.value;
        setColorDeflation(newColor);
        localStorage.setItem("colorDeflation", newColor);
    };

    const handleColorInflationChange = (e) => {
        const newColor = e.target.value;
        setColorInflation(newColor);
        localStorage.setItem("colorInflation", newColor);
    };

    return (
        <Box sx={{ width: "100%", height: "500px" }}>
                        {onEdit && (
                            <Box className="set-colors-of-chart" sx={{ marginBottom: "20px" }}>
                                <Typography variant="h6">Select color for Deflation:</Typography>
                                <TextField
                                    type="color"
                                    value={colorDeflation}
                                    onChange={handleColorDeflationChange}
                                    variant="outlined"
                                    margin="normal"
                                    sx={{ width: "150px", height: "50px" }}
                                />
                                <Typography variant="h6">Select color for Inflation:</Typography>
                                <TextField
                                    type="color"
                                    value={colorInflation}
                                    onChange={handleColorInflationChange}
                                    variant="outlined"
                                    margin="normal"
                                    sx={{ width: "150px", height: "50px" }}
                                />
                            </Box>
                        )}
                        {/* Chart */}
            <ResponsiveContainer width="99%" height="90%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="deflation"
                        stroke={colorDeflation}
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="inflation" stroke={colorInflation} />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}
