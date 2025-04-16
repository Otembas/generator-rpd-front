import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import UploadFileButton from "./UploadFileButton.jsx";
import Typography from "@mui/material/Typography";
import {getDepartments} from "../HttpClient.js";

function UploadDepartments({departmentsFileName, handleUploadFile}) {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getDepartments().then((response) => {
            if (response.status === 200) {
                setDepartments(response.data);
            }
        })
    }, []);

    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'column', pt: 2, alignItems: 'center', color: 'black'}}>
                {departments.length > 0
                    ? <Typography sx={{mt: 2, mb: 1}}>Обновить список кафедр</Typography>
                    : <Typography sx={{mt: 2, mb: 1}}>Загрузите список кафедр</Typography>
                }
                {departmentsFileName ? (
                    <Typography>{departmentsFileName}</Typography>
                ) : (
                    <Typography>Файл не выбран</Typography>
                )}
                <UploadFileButton handleUploadFile={handleUploadFile} />
            </Box>
        </>
    );
}

export default UploadDepartments;