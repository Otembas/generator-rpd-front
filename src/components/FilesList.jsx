import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Box from "@mui/material/Box";
import {useEffect} from "react";
import {download, generateFiles} from "../HttpClient.js";
import {LinearProgress} from "@mui/material";

export default function FilesList({department, discipline, getAll}) {
    const [fileInfo, setFileInfo] = React.useState(null);
    const [loadingFiles, setLoadingFiles] = React.useState(true);
    const [loadingIndex, setLoadingIndex] = React.useState(null)

    useEffect(() => {
        generateFiles(
            {
                id: localStorage.getItem("sessionId"),
                department: department,
                discipline: discipline,
                getAll: getAll
            }
        ).then((res) => {
            if (res.status === 200) {
                setFileInfo(res.data);
                setLoadingFiles(false)
            } else {
                console.log("Failed generate files: " + res);
            }
        }).catch((err) => {
            console.log(err);
            setLoadingFiles(false);
        })
    }, [department, discipline, getAll]);

    const handleToggle = (value, index) => {
        setLoadingIndex(index);
        download(value)
            .then((res) => {
                const downloadUrl = window.URL.createObjectURL(
                    new Blob([res.data], {type: "application/octet-stream"})
                );
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', `${value.filename}.docx`);
                document.body.appendChild(link);
                link.click();
                link.remove();
                setLoadingIndex(null)
            })
            .catch((error) => {
                console.log(error);
                setLoadingIndex(null);
            })
    };

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '25px 0'}}>
                <List
                    component="span"
                    sx={{
                        maxWidth: 360,
                        minWidth: 360,
                        maxHeight: 300,
                        bgcolor: '#8e9294',
                        border: '1px solid #000',
                        borderRadius: '2px',
                        padding: 0,
                        overflow: 'auto'
                    }}
                >
                    {loadingFiles && <LinearProgress />}
                    {fileInfo && fileInfo.map((value, index) => {
                        return (
                            <ListItem
                                divider
                                sx={{color: 'black'}}
                                key={index}
                                secondaryAction={
                                    <IconButton
                                        loading={loadingIndex === index}
                                        edge="end"
                                        aria-label="comments"
                                        onClick={() => handleToggle(value, index)}
                                    ><FileDownloadIcon/>
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} dense>
                                    <ListItemText primary={`${value.filename}`}/>
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </>
    );
}
