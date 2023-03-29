// angularApp.js
const app = angular.module("noteApp", []);

app.controller("noteController", function ($http) {
  const vm = this;

  vm.submitForm = function () {
    const data = {
      title: vm.title,
      contents: vm.contents,
    };

    $http.post("/notes", data).then(
      function (response) {
        console.log("Note created:", response.data);
        alert("Note created successfully");
        vm.title = "";
        vm.contents = "";
      },
      function (error) {
        console.error(error);
        alert("An error occurred while creating the note. Please try again.");
      }
    );
  };
});
