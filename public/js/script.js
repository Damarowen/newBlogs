// **material Box from Materialize css
// ** tabs
document.addEventListener('DOMContentLoaded', function () {
  const tab = document.querySelectorAll('.tabs');

  M.Tabs.init(tab, {
    duration: 100
  });


  //* below is for pagination */

  //* url adress bar */
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pages = urlParams.get('page') //* output number pages i.e 1,2,3


  //* catch all page class
  let page = document.querySelectorAll('.page')

  //* catch first page class
  let pageOne = document.querySelector('.page')

  //* if in url has a page query




  if (pages) {
    for (x of page) {
     
      if (x.innerText == pages) {
        //** add class active */
        x.classList.add("active")
      }

      //** remove class active in page one */
      pageOne.classList.remove("active")
    }

  }

});



// **image preview upload

const img = document.querySelector("#imageUpload");
const wrapper = document.querySelector(".wrapper");
const cancel = document.querySelector(".cancel")
const inputText = document.querySelector("#inputBtn")


//*This event is triggered each time a file is created, modified, or deleted on a given storage area.
inputBtn.addEventListener("change", function () {
  //* ini mengambil file yang dipilih, file yang dipilih akan return dalam bentuk array
  //* maka dikasi [0]
  const file = this.files[0];

  //*memangil reader
  const reader = new FileReader();

  //*memanggil property onload
  reader.onload = function () {
    const result = reader.result;
    img.src = result;
  }

  //*memasang class untuk wrapper
  wrapper.classList.add("actives")

  cancel.addEventListener('click', function () {
    img.src = "";
    wrapper.classList.remove("actives")
    inputBtn.value = "";
  })

  //*memanggil property readAsDataUrl
  reader.readAsDataURL(file);

});