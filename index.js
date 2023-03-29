"use strict";

const API_KEY = 'https://restcountries.com/v3.1/all';


let data = [];
let region = [];
let fragment = new DocumentFragment;

let elList = document.querySelector(".list");
let elForm = document.querySelector("#form");
let elSelect = document.querySelector(".form-main-select");
let elCounty = document.querySelector(".form-country-select");

function dataBase() {

    fetch(`${API_KEY}`).then(res => {
        return res.json();
    }).then((database) => {
        data = database;

        data.forEach(element => {
            renderUi(element);
            if (!region.includes(element.region)) {
                region.push(element.region);
            }
        });

        selected(region, elSelect);
        selectChange(data);
        selectCountry(data);
        searchFun(data);

    });

}
dataBase();

function renderUi(obj) {

    let elItem = document.createElement("li");
    elItem.setAttribute("class", "card w-100 bg-info")

    elItem.innerHTML = `

    <div class="card">
    <img src="${obj.flags.png}" class="card-img-top" alt="...">
    <div class="card-body">
    <h2 class="card-title">${obj.name.common}</h2>
    <span class="card-text"><strong>Region:</strong> ${obj.region}</span>
    <span class="card-text"><strong>Subregion:</strong> ${obj.subregion}</span>
    <span class="card-text"><strong>Continents:</strong> ${obj.continents}</span>
    <span class="card-text"><strong>Capital:</strong> ${obj.capital}</span>
    <span class="card-text"><strong>Population:</strong> ${obj.population}</span>

    </div>
  </div>

    `
    fragment.append(elItem);
    elList.append(fragment);
}

function selected(arr, btn) {
    arr.forEach(item => {
        let elOption = document.createElement("option");
        elOption.textContent = item;
        fragment.append(elOption);
    });
    btn.append(fragment);
}


function selectChange(arr) {
    elSelect.addEventListener("change", evt => {
        evt.preventDefault();
        elList.innerHTML = '';
        let newArr = [];
        let value = evt.target.value;
        if (value == 'all') {
            arr.forEach(obj => {
                renderUi(obj);
            })
        } else {
            arr.forEach(obj => {
                if (obj.region == value) {
                    // console.log(obj);
                    newArr.push(obj.name.common);
                    renderUi(obj);
                }
            })
        }
        selected(newArr, elCounty);
    })
}

function selectCountry(arr) {
    elCounty.addEventListener("change", evt => {
        evt.preventDefault();
        elList.innerHTML = '';
        let value = evt.target.value;
        if (value == 'all') {
            arr.forEach(obj => {
                renderUi(obj);
            })
        } else {
            arr.forEach(obj => {
                if (obj.name.common.includes(value)) {
                    renderUi(obj);
                }
            })
        }
    })
}

function searchFun(arr) {

    elForm.addEventListener("submit", (evt) => {

        evt.preventDefault();

        let value = evt.target.mainSearch.value.trim();
        if (value && value != "") {

            elList.innerHTML = '';
            arr.forEach(item => {
                if (item.name.common == value) {
                    renderUi(item);
                }
            })

        } else {

            arr.forEach((item) => {

                renderUi(item);

            });

        }


    });

}