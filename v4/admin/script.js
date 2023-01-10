function remoteopen() {
    input = document.getElementById('selectfolder').value
    let a = "1"
    if (input == "folder1") a = "1";
    if (input == "folder2") a = "2";
    if (input == "folder3") a = "3";
    if (input == "file1") a = "a";
    if (input == "file2") a = "b";
    if (input == "file3") a = "c";

    let options = {
        method: "post",
        headers: {
            'Content-Type': "application/json",
            "content": JSON.stringify(a)
        },

    }

    fetch('/api/open', options).then((response) => {
        response.json().then(data => ({
            data: data,
            status: response.status
        })
        ).then(res => {
            let asw = res.data

            if (asw.status == "folder opened on all clients") {
                console.log('folder opened on all clients')
            } else if (asw.status == "file opened on all clients") {
                console.log('file opened on all clients')
            } else {
                console.log('error in api /!&#92');
            }
        })
    })
}

function remoteunlock() {
    input = document.getElementById('unlockfolderselect').value
    let a = "1"
    if (input == "folder3") a = "3"

    let options = {
        method: "post",
        headers: {
            'Content-Type': "application/json",
            "content": JSON.stringify(a)
        },

    }

    fetch('/api/unlock', options).then((response) => {
        response.json().then(data => ({
            data: data,
            status: response.status
        })
        ).then(res => {
            let asw = res.data

            if (asw.status == "folder unlocked on all clients") {
                console.log('folder unlocked on all clients')
            } else {
                console.log('error in api /!&#92');
            }
        })
    })
}

function remotelock() {
    input = document.getElementById('lockfolderselect').value
    let a = "1"
    if (input == "folder3") a = "3"

    let options = {
        method: "post",
        headers: {
            'Content-Type': "application/json",
            "content": JSON.stringify(a)
        },

    }

    fetch('/api/lock', options).then((response) => {
        response.json().then(data => ({
            data: data,
            status: response.status
        })
        ).then(res => {
            let asw = res.data

            if (asw.status == "folder locked on all clients") {
                console.log('folder locked on all clients')
            } else {
                console.log('error in api /!&#92');
            }
        })
    })
}

function remoteclosepopup() {
    input = document.getElementById('closepopupselect').value
    let a = "1"
    if (input == "popup1") a = "1"
    if (input == "popup2") a = "2"

    let options = {
        method: "post",
        headers: {
            'Content-Type': "application/json",
            "content": JSON.stringify(a)
        },

    }

    fetch('/api/closepopup', options).then((response) => {
        response.json().then(data => ({
            data: data,
            status: response.status
        })
        ).then(res => {
            let asw = res.data

            if (asw.status == "popup closed on all clients") {
                console.log('popup closed on all clients')
            } else {
                console.log('error in api /!&#92');
            }
        })
    })
}

let unlockfolder = document.getElementById('unlockfolder');
unlockfolder.addEventListener('click', e => {
    if (e.path.includes(document.querySelector("#unlockfolder > div"))) return;
    unlockfolder.close()
})

let lockfolder = document.getElementById('lockfolder');
lockfolder.addEventListener('click', e => {
    if (e.path.includes(document.querySelector("#lockfolder > div"))) return;
    lockfolder.close()
})

let openfolder = document.getElementById('openfolder');
openfolder.addEventListener('click', e => {
    if (e.path.includes(document.querySelector("#openfolder > div"))) return;
    openfolder.close()
})

let closepopup = document.getElementById('closepopup');
closepopup.addEventListener('click', e => {
    if (e.path.includes(document.querySelector("#closepopup > div"))) return;
    closepopup.close()
})

let vocalclue = document.getElementById('sendvocalclue');
vocalclue.addEventListener('click', e => {
    if (e.path.includes(document.querySelector("#sendvocalclue > div"))) return;
    vocalclue.close()
})

function sendvocalclue () {
    input = document.getElementById('sendvocalclueselect').value
    let options = {
        method: "post",
        headers: {
            'Content-Type': "application/json",
            "content": JSON.stringify(input)
        },

    }

    fetch('/api/audioclue', options).then((response) => {
        response.json().then(data => ({
            data: data,
            status: response.status
        })
        ).then(res => {
            let asw = res.data

            if (asw.status == "audio clue played on all clients") {
                console.log('audio clue played on all clients')
            } else {
                console.log('error in api /!&#92');
            }
        })
    })
}