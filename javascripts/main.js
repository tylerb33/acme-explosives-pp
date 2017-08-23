"use strict";

let Handlebars = require('hbsfy/runtime');
// let explosivesProductTemplate = require("../templates/productTemplate.hbs");
let explosivesFactory = require("./explosives-factory.js");

let categoryDropdown = $("#futureDropdown");
let allListItems = "";
let selectedDropDown = "";
let arrayOfTypes = [];

let MainJS = {};

function populateDropdown(dataArrayForPage) {
    
    for (let i = 0; i < dataArrayForPage.length; i++) {
    allListItems += `<li><label class="dropdown-radio" value="${dataArrayForPage[i].id}">${dataArrayForPage[i].name}</label></li>`;   
    }
    categoryDropdown.html(allListItems);

    $(".dropdown-radio").click(function(event) {
        $("#dropdownMenu1").html($(this).html());
        selectedDropDown = parseInt($(this).attr("value"));
        // console.log ("selectedDropDown", selectedDropDown);
        explosivesFactory.loadTypes()
        .then(
            (typesFromFactory) => {
                // console.log ("typesFromFactory", typesFromFactory);
                for (let i = 0; i < typesFromFactory.length; i++) {
                    if (selectedDropDown === typesFromFactory[i].id) {
                        arrayOfTypes.push(typesFromFactory[i]);
                    }
            }
            // console.log ("arrayOfTypes", arrayOfTypes);
            createTypesDropDown(arrayOfTypes);
        },
            (reject) => {
                console.log ("something went wrong");
            });
        });
}

let typeDropdown = $("#typeDropdown");
let outputTypeDropdown = "";
let selectedTypeDropDown = "";
let arrayOfProducts = [];

function createTypesDropDown(arrayOfChosenType) {
    for (let i = 0; i < arrayOfChosenType.length; i++) {
        outputTypeDropdown +=`<li><label class="dropdown-radio-type" value="${arrayOfChosenType[i].type}">${arrayOfChosenType[i].name}</label></li>`;
    }
        typeDropdown.html(outputTypeDropdown);
            $(".dropdown-radio-type").click(function(event) {
                // console.log ("event", event);
                arrayOfProducts = [];
                selectedTypeDropDown = parseInt($(this).attr("value"));
                console.log (selectedTypeDropDown);

                explosivesFactory.loadDetails()
                .then(
                    (productsFromFactory) => {
                        // console.log ("productsFromFactory", productsFromFactory);
                        productsFromFactory.forEach(function(product, index) {
                            for (let prop in product) {
                                // arrayOfProducts = [];
                                if (product[prop].type === selectedTypeDropDown) {
                                    arrayOfProducts.push(product[prop]);
                                }
                            }
                        });
                                sendToTemplate(arrayOfProducts);
                                
                },

                    (reject) => {
                    console.log ("something went wrong");
                    });
                
                $("#dropdownMenu2").html($(this).html());
    });

        
        arrayOfTypes = [];
        outputTypeDropdown = "";
    }



explosivesFactory.loadCategories()
.then(
    (dataFromExplosivesFactory) => {
        // console.log("dataFromExplosivesFactory", dataFromExplosivesFactory);
        populateDropdown(dataFromExplosivesFactory);

    },
    (reject) => {
        console.log("something went wrong");
    });


// FUNCTION TO TAKE AN ARRAY AND PLUG IT INTO HANDLEBARS then SPIT TO PAGE
let outputHTML = '';


function sendToTemplate(arrayOfProducts) {
    console.log ("arrayOfProducts", arrayOfProducts);
    $("#productsHere").html('');
    outputHTML = '';
    for (let i = 0; i < arrayOfProducts.length; i++) {
        outputHTML += `<div class="col-sm-4">
                        <div class="card">
                          <div class="card-block">
                            <h2 class="card-title">${arrayOfProducts[i].name}</h2>
                            <h4 class="card-text">${arrayOfProducts[i].description}</h4>
                            <p>Category: ${getCategory(arrayOfProducts[i].id)}</p>
                            <p>Type of Product: ${getType(arrayOfProducts[i].type)}</p>
                          </div>
                        </div>
                      </div>`;
    }
    $("#productsHere").html(outputHTML);
    
}

function getCategory(id) {
    if (id === 0) {
        return "Recreation";
    }else if (id === 1) {
        return "Demolition";
    }
}

function getType(type) {
    if (type === 0) {
        return "Personal";
    }else if (type === 1) {
        return "Self Propellant";
    }else if (type === 2) {
        return "Fishing Assistance";
    }else if (type === 3) {
        return "Tree Stump Management";
    }else if (type === 4) {
        return "Bird Deterrent";
    }else if (type === 5) {
        return "Rock Clearer";
    }else {return "So new, it isn't catalogued yet!";}
}


