import axios from "axios";

const instance = axios.create({baseURL: import.meta.env.VITE_BACK_URL})

export function sendFile(id, file, sendTo) {
    const form = new FormData();
    form.append('id', id);
    form.append('file', file);
    instance.post(`/files${sendTo}`, form)
        .then(response => {
            if (response.status === 200) {
                console.log("File successfully sent");
            } else {
                console.log("File failed with status: " + response.data);
            }
        })
}

export function getDepartments() {
    return instance.get("/departments/all")
}

export function getDepartmentsTeachers() {
    return instance.get("/departments/teachers")
}

export function getDisciplines(id) {
    const form = new FormData();
    form.append('id', id);
    return instance.post(`/disciplines/names`, form)
}

export function sendReportInfo(id, data) {
    instance.post(`/report/info`, {id: id, reportInfo: data}).then(response => {
        if (response.status === 200) {
            console.log(`Report info successfully sent`);
        } else {
            console.log("Report info sending failed with status: " + response.status);
        }
    })
}

export function generateFiles(filter) {
    return instance.post('/report/docx', filter)
}

export function download(fileInfo) {
    return instance.post(
        `/files/download`,
        fileInfo,
        {responseType: 'blob'}
    )
}

export function clean(id) {
    instance.post('/report/clean', {id}).then(response => {
        if (response.status === 200) {
            console.log(`Report metadata clean successfully ${id}`);
        } else {
            console.log("Report metadata clean failed with status: " + response.status);
        }
    });
}
