const buttonLoadFile = document.querySelector('.buttonFile')
const buttonLoadFileHidden = document.querySelector('#excelFileInput')
buttonLoadFile.addEventListener('click', () => {
    document.querySelector('#excelFileInput').click()
    buttonLoadFileHidden
    // document.querySelector('.filename').innerHTML = document.querySelector('.filename#excelFileInput').innerHTML
})
buttonLoadFileHidden.addEventListener('change', () => {
    document.querySelector('.filename').innerHTML = buttonLoadFileHidden.files[0]?.name
    document.querySelector('#checkFile').classList.remove('inv')
});


const checkFile = document.querySelector('#checkFile')
checkFile.addEventListener('click', () => {
    handleFile()
})