window.addEventListener("message", function (e) {
  const data = JSON.parse(e.data);
  console.log(data);

  if ((data.order = "open file")) {
    a = data.file;
    let options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        content: JSON.stringify({type: data.type, path: a}),
      },
    };

    fetch("/api/getfile", options).then((response) => {
      response
        .json()
        .then((data) => ({
          data: data,
          status: response.status,
        }))
        .then((res) => {
          console.log(res);
          this.document
            .querySelectorAll("iframe")[2]
            .setAttribute("srcdoc", res.data.html);
          this.document.getElementById("files").style.display = "none";
          this.document.getElementById("openfiles").style.display = "block";
          this.document.getElementById('band_title').innerHTML = res.data.title
        });
    });
  }
});
