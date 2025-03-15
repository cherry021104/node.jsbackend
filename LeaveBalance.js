import React, { useEffect, useState } from "react";
import { getAvailableLeaves } from "../services/leaveService";

const LeaveBalance = () => {
    const [leaveDays, setLeaveDays] = useState(null);

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const data = await getAvailableLeaves(1); // Replace with dynamic user ID
                setLeaveDays(data);
            } catch (error) {
                console.error("Failed to fetch leave balance");
            }
        };
        fetchLeaves();
    }, []);

    return (
        <div>
            <h3>Your Available Leave Days:</h3>
            {leaveDays ? <p>{leaveDays.available} days remaining</p> : <p>Loading...</p>}
        </div>
    );
};

export default LeaveBalance;
