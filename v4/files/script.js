
let currentscene = 1
let previouscene = 1
let scene3login = false

let login = document.getElementById('loginbox')
function switchScene(scene) {

    if (scene == 3) {
        wrong.style.visibility = "hidden"
        psw.style.color = "black"
        if (!scene3login) return login.showModal()
    }
    document.getElementById('scene-' + currentscene).style.display = "none"
    document.getElementById('scene-' + scene).style.display = "block"
    previouscene = currentscene
    currentscene = scene

    if (scene == 1) {
        document.getElementById('back').style.backgroundColor = "grey"
        document.getElementById('back').style.cursor = "not-allowed"
    } else {
        document.getElementById('back').style.cursor = "pointer"
        document.getElementById('back').style.backgroundColor = "#00a8ff"
    }
}

document.getElementById('back').addEventListener('click', () => {
    if (currentscene == 1) return
    previous()
})

function openfile(type, file) {
    const message = JSON.stringify({
        "order": 'open file',
        "file": file,
        "type": type,
        "window": 'files'
    });
    window.parent.postMessage(message, '*');
}

function previous() {
    switchScene(previouscene)
}

switchScene(1)

let check = document.getElementById('pswShow')
let psw = document.getElementById('passwordInput')
let wrong = document.getElementById('wrong')
check.addEventListener('click', () => {
    if (check.checked) {
        psw.type = "text"
    } else {
        psw.type = "password"
    }
})

function submit() {
    password = psw.value
    if (password == "test1234") {
        scene3login = true
        switchScene(3)
        login.close()
        wrong.style.visibility = "hidden"
        psw.style.color = "black"
        document.getElementById('lockalert1').style.display = "none"
        document.getElementById('lockfolder1').className = "mdi mdi-folder"
    } else {
        wrong.style.visibility = "visible"
        psw.style.color = "#ff4A4A"
        psw.addEventListener('input', () => {
            psw.style.color = "black"
            wrong.style.visibility = "hidden"
        })
    }
}

function update() {
    setInterval(() => {
        a = "update from client"
        let options = {
            method: "post",
            headers: {
                'Content-Type': "application/json",
                "content": JSON.stringify(a)
            }
        }

        fetch('/api/update', options).then((response) => {
            response.json().then(data => ({
                data: data,
                status: response.status
            })
            ).then(res => {
                let asw = res.data

                if (asw.status == "nothing to update") return console.log("updating... (nothing new)")
                if (asw.type == "openfolder") {
                    switchScene(asw.id);
                    return console.log('updating... (open folder)')
                }
                if (asw.type == "unlockfolder") {
                    if (asw.id == "3") {
                        scene3login = true
                        login.close()
                        document.getElementById('lockalert1').style.display = "none"
                        document.getElementById('lockfolder1').className = "mdi mdi-folder"
                    }
                    return console.log('updating... (unlock folder)')
                }
                if (asw.type == "lockfolder") {
                    if (asw.id == "3") {
                        scene3login = false
                        login.close()
                        document.getElementById('lockalert1').style.display = "initial"
                        document.getElementById('lockfolder1').className = "mdi mdi-folder-lock"
                    }
                    return console.log('updating... (lock folder)')
                }
                if (asw.type == "closepopup") {
                    if (asw.id == "1") {
                        dialog.close()
                    }
                    if (asw.id == "2") {
                        login.close()
                    }
                    return console.log('updating... (close popup)')
                }
                if (asw.type == "openfile") {
                    if (asw.id == "a" || asw.id == "b" || asw.id == "c") openfile("text", asw.id.charCodeAt(0) - 96)

                    return console.log('updating... (open file)')
                }
                if (asw.type == "playaudio") {
                    playaudio(asw.id)
                }
            });
        })
    }, 500);
}

update()

let loginbox = document.getElementById('loginbox')
loginbox.addEventListener('click', e => {
    if (e.path.includes(document.querySelector("#loginbox > div"))) return;
    loginbox.close()
})

let audio = document.getElementById('audio')
let playaudio;

playaudio = function (audiosrc) {
    if (!canplay) return alert('vous avez recu un indice mais le navigateur ne l\'a pas affiché. veuillez le signaler aux organisateurs')
    audio.src = audiosrc
    audio.play()
}
let canplay = false

document.addEventListener('click', () => {
    canplay = true
})
