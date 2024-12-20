
var setNameInputed = document.getElementById("InputName");
var setURLInputed = document.getElementById("InputURL");
// ~ ----------------------------------------------------------------
var tableContent = document.getElementById("tableContent");
// ~ ----------------------------------------------------------------
var webData = [];
// ~ ----------------------------------------------------------------
webData = JSON.parse(localStorage.getItem("webData")) || [];
displayData();
function addData() {
  if(validateingAll()){
  var data = {
    webName: setNameInputed.value,
    webURL: setURLInputed.value,
  };
  webData.push(data);
  displayData();
  localStorage.setItem("webData", JSON.stringify(webData));
  clearForm()
  Swal.fire({
    title: "add!",
    icon: "success",
    draggable: true
  });
}else{
  Swal.fire({
    title: "Please fill all inputs!",
    icon: "error",
    draggable: true
  });
}
}
// !display data
function displayData() {
  var cartoona = "";
  for (var i = 0; i < webData.length; i++) {
    console.log(webData[i]);
    cartoona += `
      <tr>
                <td>${i + 1}</td>
                <td>${webData[i].webName}</td>
                <td><button class="btn btn-visit btn-warning" onclick="openNewTab(${i})"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                
                <td>
                <button class="btn btn-del btn-danger" onclick="deleteData(${i})">
                <i class="fa-solid fa-trash-can pe-2">
                </i>Delet</button>
                </td>
            </tr> 
    `;
  }
  tableContent.innerHTML = cartoona;
}
// !delete data
function deleteData(index) {
  webData.splice(index, 1);
  localStorage.setItem("webData", JSON.stringify(webData));
  displayData();
}
// !validation
function validateData(regex,  inputValue,  input ,alert){
  if(regex.test(inputValue) == true){
    input.classList.replace("is-invalid", "is-valid");
    return true
  }else{
    input.classList.add("is-invalid");
    return false
  }

}
// !global validation
function validateingAll(){
  if(validateData(/^\w{3,20}$/, setNameInputed.value, setNameInputed) && 
  validateData(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/, setURLInputed.value,setURLInputed) 
){
return true
}else{
return false
}
}
// !open new tab
function openNewTab(index) {
  var url = 
  `${webData[index].webURL}`;
  window.open(url, '_blank');
}

  // !clear form
  function clearForm() {
    setURLInputed.value = null;
    setNameInputed.value = null;
  }