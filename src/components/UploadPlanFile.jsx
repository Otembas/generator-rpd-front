import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UploadFileButton from "./UploadFileButton.jsx";

function UploadPlanFile({plainFileName, handleUploadFile}) {
    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'column', pt: 2, alignItems: 'center', color: 'black'}}>
                <Typography sx={{mt: 2, mb: 1}}>Загрузите учебный план</Typography>
                {plainFileName ? (
                    <Typography>{plainFileName}</Typography>
                ) : (
                    <Typography>Файл не выбран</Typography>
                )}
                <UploadFileButton handleUploadFile={handleUploadFile} />
            </Box>
        </>
    );
}

export default UploadPlanFile;