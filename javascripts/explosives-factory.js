"use strict";
console.log ("explosives-factory.js");

let ExplosivesFactory = {};

let listCategories = [];
let listTypes= [];

// let listProducts = [];

// ExplosivesFactory.getAllCategories = function() {
// 	return listCategories;
// };
// ExplosivesFactory.getAllTypes = function() {
// 	return listTypes;
// };
// ExplosivesFactory.getAllProducts = function() {
// 	return listProducts;
// };


ExplosivesFactory.loadCategories = function () {

	return new Promise((resolve, reject) => {

	$.getJSON("category.json", (result) => {
		let ogCategories = JSON.parse(event.target.responseText).categories;
			listCategories = ogCategories;
			resolve(listCategories);
		});
	});
};


ExplosivesFactory.getAllTypes = function () {
	return listTypes;
};

ExplosivesFactory.loadTypes = function () {

	return new Promise((resolve, reject) => {

	$.getJSON("type.json", (result) => {
		let listTypes = JSON.parse(event.target.responseText).types;
			// console.log ("listTypes", listTypes);
			resolve(listTypes);

		});
	});
};


ExplosivesFactory.loadDetails = function () {

	return new Promise((resolve, reject) => {

	$.getJSON("details.json", (result) => {
		let listDetails = JSON.parse(event.target.responseText).products;
			// console.log ("listProducts", listProducts);
			resolve(listDetails);

		});
	});
	
};

module.exports = ExplosivesFactory;

