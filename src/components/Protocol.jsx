import React from 'react';
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ru} from 'date-fns/locale/ru';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';
import {DatePicker} from "@mui/x-date-pickers";

function Protocol({protocolLabel, setProtocolNumber, setProtocolDate}) {
    const [number, setNumber] = React.useState(undefined);
    const [date, setDate] = React.useState(null);

    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography style={{margin: '0 auto', alignItems: 'center', color: 'black'}}>
                    {protocolLabel}
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', m: 1}}>
                    <TextField
                        required
                        error={number < 0}
                        id="filled-number"
                        label="Номер протокола"
                        type="number"
                        variant="filled"
                        value={number}
                        size="small"
                        sx={{backgroundColor: '#d4d0cf', borderRadius: '5px', margin: 'auto'}}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        onChange={(e) => {
                            setProtocolNumber(e.target.value)
                            setNumber(e.target.value)
                        }
                    }
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                        <DatePicker
                            label="Дата протокола"
                            format="dd.MM.yyyy"
                            defaultValue={date}
                            onChange={newDate => {
                                setProtocolDate(newDate)
                                setDate(newDate)
                            }}
                            sx={
                                {backgroundColor: '#d4d0cf', borderRadius: '5px', margin: '5px auto', maxWidth: 220}
                            }
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
        </>
    );
}

export default Protocol;