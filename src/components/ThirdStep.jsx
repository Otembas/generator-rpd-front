import React, {useEffect} from 'react';
import {Autocomplete, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {getDepartments, getDisciplines} from "../HttpClient.js";

function ThirdStep({setDepartment, setDiscipline, getAll, setGetAll}) {
    useEffect(() => {
        getDepartments().then((res) => {
            if (res.status === 200) {
                setDepartments(res.data);
            } else {
                console.log("Failed load departments: " + res.status);
            }
        })
        getDisciplines(localStorage.getItem("sessionId")).then((res) => {
            if (res.status === 200) {
                console.log(res.data);
                setDisciplines(res.data);
            } else {
                console.log("Failed load disciplines: " + res.status);
            }
        })
    }, []);

    const [departments, setDepartments] = React.useState([]);
    const [disciplines, setDisciplines] = React.useState([]);

    return (
        <>
            <Autocomplete
                disablePortal
                options={departments}
                sx={{backgroundColor: '#d4d0cf', borderRadius: '5px', minWidth: 300}}
                onChange={(e, newValue) => setDepartment(newValue)}
                renderInput={(params) => <TextField {...params} label="Кафедра"/>}
            />
            <Autocomplete
                disablePortal
                required
                options={disciplines}
                sx={{backgroundColor: '#d4d0cf', borderRadius: '5px', minWidth: 300, marginTop: 1}}
                onChange={(e, newValue) => setDiscipline(newValue)}
                renderInput={(params) => <TextField {...params} label="Дисциплина"/>}
            />
            <FormGroup>
                <FormControlLabel
                    sx={{ color: 'black' }}
                    required
                    control={<Checkbox value={getAll} onChange={(e) => setGetAll(e.target.checked)}/>}
                    label="Все дисциплины"/>
            </FormGroup>
        </>
    );
}

export default ThirdStep;