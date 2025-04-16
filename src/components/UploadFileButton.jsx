import React from 'react';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function UploadFileButton({handleUploadFile}) {
    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon/>}
            >
                Загрузить
                <VisuallyHiddenInput
                    type="file"
                    onChange={event => handleUploadFile(
                        event.target.files[0],
                        event.target.value.substring(event.target.value.lastIndexOf('\\') + 1)
                    )
                }
                />
            </Button>
        </>
    )
}

export default UploadFileButton;
