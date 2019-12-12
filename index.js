function getUserName() {
    var name = document.getElementById("nameInput").value;
    console.log(name);
}

// BUDGET CONTROLLER
var userController = (function() {

    // var Expense = function(id, description, value) {
    //     this.id = id;
    //     this.description = description;
    //     this.value = value;
    //     this.percentage = -1;
    // };

    return {

        testing: function() {
            console.log(data);
        }
    };

})();

var uiController = (function() {
    var formStrings = {
        nameInput: "#nameInput",
        surNameInput: "#surnameInput",
        userNameInput: "#usernameInput",
    };
    var registerListeners = function() {
        document.querySelector(formStrings.nameInput).addEventListener('click', function() {
            console.log("click click");
        })
    }
    return {
        strings: formStrings,
        getStrings: function() {
            return formStrings;
        },
        registerListeners

    }

})()

var appController = (function(uiController) {
    console.log(uiController.getStrings(), uiController.strings, "asdada");
    var initF = function() {
        uiController.registerListeners();
    }
    return {
        init: function() {
            console.log("init");
            initF();
        }
    }

})(uiController);

//appController.init();

function nameFunc() {
    console.log("index1.js");
}