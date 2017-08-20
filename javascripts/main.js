"use strict";

let Handlebars = require('hbsfy/runtime');
let explosivesDropdownTemplate = require("../templates/dropdownTemp.hbs");
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
                selectedTypeDropDown = parseInt($(this).attr("value"));
                console.log (selectedTypeDropDown);

                $("#dropdownMenu2").html($(this).html());
    });

                explosivesFactory.loadDetails()
                .then(
                    (productsFromFactory) => {
                        console.log ("productsFromFactory", productsFromFactory);
                    // productsFromFactory.forEach((product) => {     
                    //         // arrayOfProducts.push(product);
                    //         console.log (key);
                    //     });
                                
                },

                    (reject) => {
                    console.log ("something went wrong");
                    });
        
        arrayOfTypes = [];
        outputTypeDropdown = "";
    }


// function checkValueOfSelected() {
//     console.log ("selectedDropDown", selectedDropDown);
// }



explosivesFactory.loadCategories()
.then(
    (dataFromExplosivesFactory) => {
        // console.log("dataFromExplosivesFactory", dataFromExplosivesFactory);
        populateDropdown(dataFromExplosivesFactory);

    },
    (reject) => {
        console.log("something went wrong");
    });


// ).then (
// 	() => {
// 		console.log ("details & all are loaded");
// 		console.log (explosivesFactory.getAllProducts());
// 	},
// 	() => {
// 		console.log ("no details loaded");
// 	}
// );


// FUNCTION TO TAKE AN ARRAY AND PLUG IT INTO HANDLEBARS then SPIT TO PAGE

