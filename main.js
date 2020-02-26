const LOCAL_STORAGE_KEY = "contactList";
window.onload = () => {
  let buttonAdd;
  let inputs;
  let emailInput;
  let nameInput;
  let lastNameInput;
  let allInputs = inputs;
  let allPersons = [];
  bindDOM();
  console.log(inputs);
  showData();
  addEventListenerOnClick();
  function bindDOM() {
    buttonAdd = document.getElementById("addBtn");
    inputs = document.querySelectorAll("input");
    emailInput = document.getElementsByClassName("email")[0];
    nameInput = document.getElementById("nameInput");
    lastNameInput = document.getElementById("lastNameInput");
  }
  //wyswietlenie danych w tabelce
  function showData() {
    let myPersons = getDataFromLocalStorage();
    allPersons = [];
    myPersons.forEach(element => {
      allPersons.push(element);
      console.log("pobieram z local: ", allPersons);
      addElementToBody(
        element.firstName,
        element.lastName,
        element.myGender,
        element.phoneNum,
        element.emailAdress
        );
      });
    }
    
    function checkEmail(email) {
      const mailRegex = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i;
    if (mailRegex.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  function validateRequiredInputs(input) {
    const inputRegex = /^.+$/s;
    if (input === "" || !inputRegex.test(input)) {
      return false;
    } else {
      return true;
    }
  }
  function clearInputs(tab) {
    tab.forEach(input => {
      input.value = "";
    });
  }
  
  function addNewElement() {
    //wartosc z input 'Name'
    let namePerson = document.getElementById("name");
    let firstName = namePerson.value;
    if (!validateRequiredInputs(firstName)) {
      return (nameInput.innerHTML = "This field is required");
    } else {
      nameInput.innerHTML = "";
    }
    //wartosc z input 'Last name'
    let surnamePerson = document.getElementById("lastname");
    let lastName = surnamePerson.value;
    if (!validateRequiredInputs(lastName)) {
      return (lastNameInput.innerHTML = "This field is required");
    } else {
      lastNameInput.innerHTML = "";
    }
    //wartosc z input 'gender'
    let genType = document.getElementById("gender");
    let myGender = genType.value;
    //wartosc z input 'phonenumber'
    let number = document.getElementById("phone");
    let phoneNum = number.value;
    let myEmail = document.getElementById("email");
    let emailAdress = myEmail.value;
    if (!checkEmail(emailAdress)) {
      return (emailInput.innerHTML = "*niepoprawny Email");
    } else {
      emailInput.innerHTML = "";
    }
  }
  
  //dodaje tbody tabelki
  function addElementToBody(name, surname, gen, phone, email) {
    let tbody = document.getElementsByTagName("tbody")[0];
    let trow = document.createElement("tr");
    tbody.appendChild(trow);
    //pierwsza komorka
    tdata1 = document.createElement("td");
    tdata1.innerText = name;
    trow.appendChild(tdata1);
    //druga komorka
    tdata2 = document.createElement("td");
      tdata2.innerText = surname;
      trow.appendChild(tdata2);
      //trzecia komorka
      tdata3 = document.createElement("td");
      tdata3.innerText = gen;
      trow.appendChild(tdata3);
      //czwarta komorka
      tdata4 = document.createElement("td");
      tdata4.innerText = phone;
      trow.appendChild(tdata4);
      //piata komorka
      tdata5 = document.createElement("td");
      tdata5.innerText = email;
      trow.appendChild(tdata5);
      //szósta komorka
      tdata6 = document.createElement("td");
      tdata6.innerText = new Date();
      trow.appendChild(tdata6);
    }
    addToArray(allPersons, allPersons.length + 1);
    saveToLocalStorage(allPersons);
    addElementToBody(firstName, lastName, myGender, phoneNum, emailAdress);
    clearInputs(allInputs);
    
    //dodaje do tablicy obiekty
    function addToArray(arr, id) {
      arr.push({
        id,
        firstName,
        lastName,
        myGender,
        phoneNum,
        emailAdress
      });
      console.log(arr);
    }
    
    function saveToLocalStorage(items) {
      let person = JSON.stringify(items);
      localStorage.setItem(LOCAL_STORAGE_KEY, person);
    }
    
    function getDataFromLocalStorage() {
      let myPersonArr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (myPersonArr == null) {
      myPersonArr = [];
    }
    return myPersonArr;
  }
  
  function addEventListenerOnClick() {
    buttonAdd.addEventListener("click", event => {
      event.preventDefault();
      addNewElement();
    });
    
    buttonAdd.addEventListener("keypress", event => {
      event.preventDefault();
      if (event.key === "Enter") {
        addNewElement();
      }
    });
  }
  
};