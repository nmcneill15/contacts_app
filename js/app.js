
var contacts = [];
var numberFields = 1;
var addressBlocks = 1;

function Contact(first_name, last_name, numbers, addresses) {
  this.first_name = first_name;
  this.last_name = last_name;
  this.numbers = numbers;
  this.addresses = addresses;
}
function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.address = street + " " + city + ", " + state;
}

function newContact(first_name, last_name, numbers, addresses) {
  var newObj = new Contact(first_name, last_name, numbers, addresses);
  contacts.push(newObj);
  var index = contacts.indexOf(newObj);
  $("#contacts-list").append("<li id='" + index + "' >" + first_name + " " + last_name + "</li>");
}

$("#form").on("submit", function(e) {
  e.preventDefault();

  var first_name = $("#first-name").val();
  var last_name = $("#last-name").val();
  var numbers = newNumArray();
  var addresses = newAddresses();
  newContact(first_name, last_name, numbers, addresses);
  $(".input").val("");
  $("#first-name").focus();
  for (i = 1; i < addressBlocks; i++) {
    $("#address" + (i + 1)).remove();
  }
  for (i = 1; i < numberFields; i++) {
    $("#number" + (i + 1)).remove();
  }
  numberFields = 1;
  addressBlocks = 1;
});
function newNumArray() {
  var numbers = [];
  var numFields = document.getElementsByClassName("number");
  for (i = 0; i < numFields.length; i++) {
    numbers.push(numFields[i].value);
  }
  return numbers;
}
function newAddresses() {
  var addresses = document.getElementsByClassName("address");
  var addressObjects = [];
  for (i = 0; i < addresses.length; i++) {
    var inputs = addresses[i].getElementsByTagName("input");
    var street = inputs[0].value;
    var city = inputs[1].value;
    var state = inputs[2].value;
    var newAddress = new Address(street, city, state);
    addressObjects.push(newAddress);
  }
  return addressObjects;
}

$("#add-number-btn").on("click", function(e) {
  e.preventDefault();
  numberFields++;
  var newNumber = $("#number1").clone().attr("id", ("number" + numberFields));
  newNumber.insertAfter("#number" + (numberFields - 1)).val("").focus();
});

$(".add-address-btn").on("click", function(e) {
  e.preventDefault();
  addressBlocks++;
  var newAddress = $("#address1").clone().attr("id", ("address" + addressBlocks));
  newAddress.insertAfter("#address" + (addressBlocks - 1)).children("input").val("").first().focus();
});

$("#contacts-list").on("click", "li", function(e) {
  e.preventDefault();
  var contactNum = e.target.id;
  displayContact(contactNum);
});

function displayContact(contactNum) {
  var contact = contacts[contactNum];
  var fullName = contact.first_name + " " + contact.last_name;
  var numbers = contact.numbers;
  var addresses = contact.addresses;
  $("#display-name").text(fullName);
  $(".display-number, .display-address").remove();
  for (i = 0; i < numbers.length; i++) {
    $("<p class='display-number display-info'>Number: " + numbers[i] + "</p>")
    .insertAfter("#display-name");
  }
  for (i = 0; i < addresses.length; i++) {
    $("<p class='display-address'>Address: " + addresses[i].address + "</p>")
    .insertAfter("p:last-child");
  }
}
