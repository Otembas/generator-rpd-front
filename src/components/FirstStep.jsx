import React from 'react';
import UploadPlanFile from "./UploadPlanFile.jsx";
import UploadDepartments from "./UploadDepartments.jsx";

function FirstStep({planFileName, handleUploadPlanFile, departmentsFileName, handleUploadDepartmentsFile}) {
    return (
        <>
            <UploadPlanFile plainFileName = {planFileName} handleUploadFile = {handleUploadPlanFile}/>
            <UploadDepartments
                departmentsFileName={departmentsFileName}
                handleUploadFile = {handleUploadDepartmentsFile}
            />
        </>
    );
}

export default FirstStep;