import React, { useState } from "react";
import { applyLeave } from "../services/leaveService";

const LeaveForm = () => {
    const [leaveType, setLeaveType] = useState("");
    const [days, setDays] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const leaveData = { userId: 1, leaveType, days }; // Replace with dynamic user ID
            const response = await applyLeave(leaveData);
            alert(response.message);
        } catch (error) {
            alert("Failed to apply for leave");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Leave Type:</label>
            <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required>
                <option value="">Select Leave Type</option>
                <option value="casual">Casual Leave</option>
                <option value="medical">Medical Leave</option>
            </select>

            <label>Number of Days:</label>
            <input type="number" value={days} onChange={(e) => setDays(e.target.value)} min="1" required />

            <button type="submit">Apply Leave</button>
        </form>
    );
};

export default LeaveForm;
