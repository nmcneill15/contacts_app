
var contacts = [];

function Contact(first_name, last_name, number, street, city, state) {
  this.first_name = first_name;
  this.last_name = last_name;
  this.number = number;
  this.street = street;
  this.city = city;
  this.state = state;
  this.address = street + " " + city + ", " + state;
}

function newContact(first_name, last_name, number, street, city, state) {
  var newObj = new Contact(first_name, last_name, number, street, city, state);
  contacts.push(newObj);
  index = contacts.indexOf(newObj);
  $("#contacts-list").append("<li id='" + index + "' >" + first_name + " " + last_name + "</li>");
}
console.log($(".number").count());
$("#form").on("submit", function(e) {
  e.preventDefault();
  var first_name = $("#first-name").val();
  var last_name = $("#last-name").val();
  var number = [];

  var street = $("#street").val();
  var city = $("#city").val();
  var state = $("#state").val();
  first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1);
  last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);
  city = city.charAt(0).toUpperCase() + city.slice(1);
  state = state.toUpperCase();
  newContact(first_name, last_name, number, street, city, state);
  $(".input").val("");
  $("#first-name").focus();
});

$("#contacts-list").on("click", "li", function(e) {
  e.preventDefault();
  var contactNum = e.target.id;
  displayContact(contactNum);
});

function displayContact(contactNum) {
  var contact = contacts[contactNum];
  var fullName = contact.first_name + " " + contact.last_name;
  $("#display-name").text(fullName);
  $("#display-phone").text(contacts[contactNum].number);
  $("#display-address").text(contacts[contactNum].address);
}
