import React, {useEffect} from 'react';
import Protocol from "./Protocol.jsx";
import {Autocomplete, TextField} from "@mui/material";
import {getDepartmentsTeachers} from "../HttpClient.js";

function SecondStep({
    setDepartmentProtocolNumber,
    setDepartmentProtocolDate,
    setCommissionProtocolNumber,
    setCommissionProtocolDate,
    setYear,
    setCreators
}) {
    const [reportYear, setReportYear] = React.useState(new Date().getFullYear());
    const [teachers, setTeachers] = React.useState([]);

    useEffect(() => {
        getDepartmentsTeachers().then((res) => {
            if (res.status === 200) {
                console.log(res.data);
                setTeachers(res.data);
            } else {
                console.log("Failed load teachers: " + res.status);
            }
        });
    }, []);

    return (
        <>
            <Protocol
                protocolLabel={'Протокол утверждения дисциплины на заседании кафедры'}
                setProtocolNumber={setDepartmentProtocolNumber}
                setProtocolDate={setDepartmentProtocolDate}
            />
            <Protocol
                protocolLabel={'Протокол утверждения дисциплины на заседании учебно-методической комиссии факультета'}
                setProtocolNumber={setCommissionProtocolNumber}
                setProtocolDate={setCommissionProtocolDate}
            />
            <TextField
                id="filled-year"
                value={reportYear}
                label="Год"
                variant="filled"
                size="small"
                margin="normal"
                sx={{backgroundColor: '#d4d0cf', borderRadius: '5px', minWidth: 300}}
                onChange={(e) => {
                    setYear(e.target.value)
                    setReportYear(e.target.value)
                }}
            />
            <Autocomplete
                disablePortal
                multiple
                options={teachers}
                sx={{backgroundColor: '#d4d0cf', borderRadius: '5px', minWidth: 300}}
                onChange={(e, newValue) => setCreators(newValue)}
                renderInput={(params) => <TextField {...params} label="Составители" />}
            />
        </>
    );
}

export default SecondStep;