import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {clean, sendFile, sendReportInfo} from "../HttpClient.js";
import FirstStep from "./FirstStep.jsx";
import SecondStep from "./SecondStep.jsx";
import {v4 as uuidv4} from 'uuid';
import ThirdStep from "./ThirdStep.jsx";
import FilesList from "./FilesList.jsx";

const steps = ['Учебный план', 'Заполнение данных', 'Генерация'];

export default function HorizontalLinearStepper() {
    useEffect(() => {
        localStorage.setItem('sessionId', uuidv4())
    }, []);

    const [activeStep, setActiveStep] = React.useState(0);
    const [planFileName, setPlanFileName] = React.useState('');
    const [planFile, setPlanFile] = React.useState(undefined);
    const [departmentsFileName, setDepartmentsFileName] = React.useState('');
    const [departmentsFile, setDepartmentsFile] = React.useState(undefined);
    const [departmentProtocolNumber, setDepartmentProtocolNumber] = React.useState(null);
    const [departmentProtocolDate, setDepartmentProtocolDate] = React.useState(null);
    const [commissionProtocolNumber, setCommissionProtocolNumber] = React.useState(null);
    const [commissionProtocolDate, setCommissionProtocolDate] = React.useState(null);
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [creators, setCreators] = React.useState(undefined);
    const [department, setDepartment] = React.useState(undefined);
    const [discipline, setDiscipline] = React.useState(undefined);
    const [getAll, setGetAll] = React.useState(false);

    const handleNext = () => {
        switch (activeStep) {
            case 0: {
                handleFirstStep();
                break;
            }
            case 1: {
                handleSecondStep();
                break;
            }
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setPlanFileName('');
        setPlanFile(undefined);
        setDepartmentsFileName('');
        setDepartmentsFile(undefined);
        setDepartmentProtocolNumber(null);
        setDepartmentProtocolDate(null);
        setCommissionProtocolNumber(null);
        setCommissionProtocolDate(null);
        setYear(new Date().getFullYear());
        setCreators(undefined);
        setDepartment(undefined);
        setDiscipline(undefined);
        setGetAll(false);
        clean(localStorage.getItem('sessionId'));
    };

    const handleFirstStep = () => {
        sendFile(localStorage.getItem("sessionId"), planFile, '/disciplines');
        departmentsFile && sendFile(localStorage.getItem("sessionId"), departmentsFile, '/departments');
    };

    const handleUploadPlanFile = (file, filename) => {
        setPlanFileName(filename);
        setPlanFile(file);
    };

    const handleUploadDepartmentsFile = (file, filename) => {
        setDepartmentsFileName(filename);
        setDepartmentsFile(file);
    };

    const handleSecondStep = () => {
        console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
        sendReportInfo(
            localStorage.getItem("sessionId"),
            {
                departmentProtocol: {
                    number: departmentProtocolNumber,
                    date: departmentProtocolDate,
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                commissionProtocol: {
                    number: commissionProtocolNumber,
                    date: commissionProtocolDate,
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                year: year,
                creators: creators
            }
        )
    }

    return (
        <Box sx={{width: '100%', padding: '5px'}}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps} sx={{}}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{mt: 2, mb: 1}}>
                        <FilesList department={department} discipline={discipline} getAll={getAll} />
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button onClick={handleReset}>Завершить</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{display: 'flex', flexDirection: 'column', pt: 2}}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            pt: 2,
                            alignItems: 'center',
                            maxWidth: '50%',
                            margin: '0 auto'
                        }}>
                            {activeStep === 0 ?
                                <FirstStep
                                    planFileName={planFileName}
                                    handleUploadPlanFile={handleUploadPlanFile}
                                    departmentsFileName={departmentsFileName}
                                    handleUploadDepartmentsFile={handleUploadDepartmentsFile}
                                /> : null
                            }
                            {activeStep === 1 ?
                                <SecondStep
                                    setDepartmentProtocolNumber={setDepartmentProtocolNumber}
                                    setDepartmentProtocolDate={setDepartmentProtocolDate}
                                    setCommissionProtocolNumber={setCommissionProtocolNumber}
                                    setCommissionProtocolDate={setCommissionProtocolDate}
                                    setYear={setYear}
                                    setCreators={setCreators}
                                />
                                : null
                            }
                            {activeStep === 2 ?
                                <ThirdStep
                                    setDepartment={setDepartment}
                                    setDiscipline={setDiscipline}
                                    getAll={getAll}
                                    setGetAll={setGetAll}
                                />
                                : null
                            }
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}
                        >
                            Назад
                        </Button>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Сгенерировать' : 'Далее'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
