const filePickerElement = document.getElementById('image');
const imagePreviewElement = document.getElementById('image-preview');

function showPreview(){
  const files = filePickerElement.files; // get the files picked  and stores
  if (!files || files.length === 0) {
    imagePreviewElement.style.display = 'none';
    return;
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile); 
  // create a local URL to this file and using as a source to the preview element
  imagePreviewElement.style.display = 'block';
}

filePickerElement.addEventListener('change', showPreview);