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

var personController = (function() {

    var Person = function(name, password, surname) {
        this.name = name;
        this.password = password;
        this.surname = surname;
    };

    var data = [];

    var addData = function(name, password, surname) {
        var person = new Person(name, password, surname);

        console.log("========after push==========");

        data.push(person);
        data.forEach(function(entry) {
            console.log(entry);
        });
    };

    var deleteItem = function(id) {
        let index;
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == id) {
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

var uiController = (function() {
    console.log("ui controller init");

    var formStrings = {
        nameInput: "#nameInput",
        surNameInput: "#surnameInput",
        userNameInput: "#usernameInput",
        passwordInput: "#passwordInput",
        radioMale: "#radioMale",
        radioFemale: "#radioFemale",
        bdayInput: "#bdayInput",
        saveButton: "#saveButton",
        nameInput_error: "#nameInput-error",
        passwordInput_error: "#passwordInput-error"
    };

    var formData = function() {
        return {
            password: document.querySelector(formStrings.passwordInput).value,
            name: document.querySelector(formStrings.nameInput).value,
            surname: document.querySelector(formStrings.surNameInput).value,
        }

    }
    var hideErrorMessage = function(errorSpan) {
        document.querySelector(errorSpan).style.visibility = 'hidden';
    }
    var showErrorMessage = function(errorSpan) {
        console.log(errorSpan, "error");
        document.querySelector(errorSpan).style.visibility = 'visible';
        document.querySelector(errorSpan).style.color = 'red';

    }

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
        }

    }


})()

var appController = (function(ui) {
    console.log("class app controller");

    var registerListeners = function() {
        document.querySelector("#delete").addEventListener('click', function() {
            personController.deleteItem("asd1");
        });

        document.querySelector(ui.getFormStrings().saveButton).addEventListener('click', function() {
            var data = ui.getFormData();
            let error = false;
            // console.log("click on save button", ui.getFormData());
            if (!data.name || data.name === "asd") {
                ui.getShowErrorMessage(ui.getFormStrings().nameInput_error);
                error = true
            } else {
                ui.getHideErrorMessage(ui.getFormStrings().nameInput_error);
            }

            if (!data.password || data.password.length === 3) {
                ui.getShowErrorMessage(ui.getFormStrings().passwordInput_error);
                error = true;
            } else {
                ui.getHideErrorMessage(ui.getFormStrings().passwordInput_error);
            }
            if (!error) {
                personController.addData(data.name, data.password, data.surname);
            }

            console.log(document.querySelector("#radioMale").checked);
            console.log(document.querySelector("#radioMale").value);

        });
    }


    var init = function() {
        registerListeners();
    }

    return {
        init
    }

})(uiController)

appController.init();