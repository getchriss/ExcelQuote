var input = document.getElementById("userFile");

input.onclick = function () {
    this.value = null;
};

input.onchange = function () {
    var path = input.value;
    var filename = "";
    if(path.lastIndexOf("\\") != -1)
        filename = path.substring(path.lastIndexOf("\\") + 1,path.length);
    else
        filename = path.substring(path.lastIndexOf("/") + 1,path.length);
    document.getElementById("log").innerHTML = filename;
};