// addGender: function() {
//     if (gender_man.is(':checked')) {
//         gender = 'man';
//         console.log(gender);
//     }
//     if (gender_woman.is(':checked')) {
//         gender = 'woman';
//         console.log(gender);
//     }
// },

//add button
// const btn = document.createElement('input');
// btn.type = "button";
// btn.className = "btn delete-button";
// btn.value = obj.id;
// cell5.appendChild(btn);

const personController = (function() {



    function getId() {
        let id = data.length;
        return id;
    }

    var Person = function(name, password, surname, username) {
        this.name = name;
        this.password = password;
        this.surname = surname;
        this.username = username;
        this.id = getId();
    };

    var data = [];

    var addData = function(name, password, surname, username) {
        var person = new Person(name, password, surname, username);

        console.log("========after push==========");

        data.push(person);

        data.forEach(function(entry) {
            console.log(entry);
        });

        return person;
    };
    // {pes, modra} {macka, cervena}
    var deleteItem = function(id) {
        let index;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                index = i;
                break;
            }
        }


        console.log(index);


        if (index !== -1) {
            data.splice(index, 1);
        }
        console.log("========after delete==========");
        data.forEach(function(entry) {
            console.log(entry);
        });

    };

    return {
        addData,
        deleteItem
    }


})();

const uiController = (function() {
    console.log("ui controller init");

    let formStrings = {
        nameInput: "#nameInput",
        surNameInput: "#surnameInput",
        userNameInput: "#usernameInput",
        passwordInput: "#passwordInput",
        radioMale: "#radioMale",
        radioFemale: "#radioFemale",
        bdayInput: "#bdayInput",
        saveButton: "#saveButton",
        nameInput_error: "#nameInput-error",
        passwordInput_error: "#passwordInput-error",
        surNameInput_error: "#surNameInput-error",
        userNameInput_error: "#userNameInput-error",
        user_table: "#user_table"
    };

    let removeElement = function(elementId) {
        // Removes an element from the document
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }

    let formData = function() {
        return {
            password: document.querySelector(formStrings.passwordInput).value,
            name: document.querySelector(formStrings.nameInput).value,
            surname: document.querySelector(formStrings.surNameInput).value,
            username: document.querySelector(formStrings.userNameInput).value,
        }

    }

    let clearFields = function() {
        document.querySelector(formStrings.passwordInput).value = "";
        document.querySelector(formStrings.nameInput).value = "";
        document.querySelector(formStrings.surNameInput).value = "";
        document.querySelector(formStrings.userNameInput).value = "";

    }

    let hideErrorMessage = function(errorSpan) {
        document.querySelector(errorSpan).style.visibility = 'hidden';
    }
    let showErrorMessage = function(errorSpan) {
        console.log(errorSpan, "error");
        document.querySelector(errorSpan).style.visibility = 'visible';
        document.querySelector(errorSpan).style.color = 'red';

    }
    let addPersonRow = function(obj) {
        const table = document.querySelector(formStrings.user_table).getElementsByTagName("tbody")[0];
        const row = table.insertRow(0);
        row.id = "user" + obj.id;
        const cell1 = row.insertCell(0);
        cell1.className = "test";
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        cell1.innerHTML = obj.name;
        cell2.innerHTML = obj.surname;
        cell3.innerHTML = obj.password;
        cell4.innerHTML = obj.username;
        const btn = document.createElement('input');
        btn.type = "button";
        btn.className = "btn delete-button";
        btn.value = "Delete";
        btn.id = obj.id;

        cell5.appendChild(btn);

    };

    return {
        getFormData: function() {
            return formData();
        },
        getFormStrings: function() {
            return formStrings;
        },
        getHideErrorMessage: function(input) {
            return hideErrorMessage(input);
        },
        getShowErrorMessage: function(input) {
            return showErrorMessage(input);
        },
        removeElement,
        addPersonRow,
        clearFields

    }


})()

const appController = (function(ui, pc) {
    console.log("class app controller");

    const registerListeners = function() {
        // after click on submit button
        document.querySelector(ui.getFormStrings().saveButton).addEventListener('click', function() {
            // get data from inputs
            var data = ui.getFormData();
            let error = false;

            if (!data.name || data.name.length <= 3) {
                ui.getShowErrorMessage(ui.getFormStrings().nameInput_error);
                error = true
            } else {
                ui.getHideErrorMessage(ui.getFormStrings().nameInput_error);
            }

            if (!data.password || data.password.length <= 3) {
                ui.getShowErrorMessage(ui.getFormStrings().passwordInput_error);
                error = true;
            } else {
                ui.getHideErrorMessage(ui.getFormStrings().passwordInput_error);
            }


            if (!data.surname || data.surname.length <= 3) {
                ui.getShowErrorMessage(ui.getFormStrings().surNameInput_error);
                error = true;
            } else {
                ui.getHideErrorMessage(ui.getFormStrings().surNameInput_error);
            }

            if (!data.username || data.username.length <= 3) {
                ui.getShowErrorMessage(ui.getFormStrings().userNameInput_error);
                error = true;
            } else {
                ui.getHideErrorMessage(ui.getFormStrings().userNameInput_error);
            }

            if (error == false) {
                const personData = pc.addData(data.name, data.password, data.surname, data.username);
                ui.addPersonRow(personData);
                //ui.clearFields();

            }

            // console.log(document.querySelector("#radioMale").checked);
            // console.log(document.querySelector("#radioMale").value);

        });
        document.querySelector(ui.getFormStrings().user_table).addEventListener('click', deleteItem);

    };
    let deleteItem = function(event) {
        console.log("type", event.target.type);
        console.log("class", event.target.classList.contains("delete-button"));
        console.log("asad", event.target.value);
        console.log("id", event.target.id);

        if (event.target.type == 'button' && event.target.classList.contains("delete-button")) {
            const id = event.target.id;
            pc.deleteItem(id);
            const userId = "user" + id;
            ui.removeElement(userId);
        }
    }





    const init = function() {
        registerListeners();
    };

    return {
        init
    }

})(uiController, personController)

appController.init();