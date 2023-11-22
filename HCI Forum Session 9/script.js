const fileSelector = document.querySelector('input')
const start = document.querySelector('button')
const img = document.querySelector('img')
const progress = document.querySelector('.progress')
const textarea = document.querySelector('textarea')
const save = document.getElementById('save')

// first show image on upload
fileSelector.onchange = () => {
    var file = fileSelector.files[0]
    var imgUrl = window.URL.createObjectURL(new Blob([file], { type: 'image/jpg' }))
    img.src = imgUrl
}

save.onclick = () => {
    const content = document.getElementById('textoutput').value;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'document.txt');
}


// now start text recognition
start.onclick = () => {
    textarea.innerHTML = ''
    const rec = new Tesseract.TesseractWorker()
    rec.recognize(fileSelector.files[0])
        .progress(function (response) {
            if(response.status == 'recognizing text'){
                progress.innerHTML = response.status + '   ' + response.progress
            }else{
                progress.innerHTML = response.status
            }
        })
        .then(function (data) {
            textarea.innerHTML = data.text
            progress.innerHTML = 'Done'
        })
}

function savefile() {
    const content = document.getElementById('textoutput').value;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'document.txt');
  }

  function saveFile() {
    const content = document.getElementById('editor').value;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'document.txt');
  }
  
  function openFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const content = e.target.result;
        document.getElementById('editor').value = content;
        document.getElementById('fileContent').innerHTML = `<strong>File Content:</strong><br>${content}`;
      };

      reader.readAsText(file);
    }
  }