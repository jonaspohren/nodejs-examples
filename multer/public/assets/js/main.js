var upload = function() {
    var file = document.getElementsByTagName('input')[0];

    if (!file.files.length) {
        return;
    }

    var formData = new FormData();
    formData.append('file', file.files[0]);

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/fileupload');
    xhr.send(formData);
};