/*Constante de Acesso à API*/
const urlApiCompleta = 'http://makeup-api.herokuapp.com/api/v1/products.json';


/* Seleção de Elementos HTML */
let catalogoSec = document.querySelector('.catalog');
let nomeProduto = document.querySelector('#filter-name');
let selectBrands = document.querySelector('#filter-brand');
let selectTypes = document.querySelector('#filter-type');
let selectSort = document.querySelector('#sort-type');


/* Gloabis do Projeto */
var nomePreenchido = false; //Indica se tem algum nome preenchido.
var brandValor = "Todos";
var typeValor = "Todos";
var sortValor = "rating";
let urlApiFiltrada = urlApiCompleta;


brands.map((item, index) => {
    let optionBrand = document.createElement('option');
    optionBrand.value = item;
    optionBrand.textContent = item;
    selectBrands.appendChild(optionBrand);
});

types.map((item, index) => {
    let optionType = document.createElement('option');
    optionType.value = item;
    optionType.textContent = item;
    selectTypes.appendChild(optionType);
});



function retornaMakeJson(url) {
    return fetch(url).then((r) => {
        return r.json();
    });
}


function carregaProdutos(catalogoGeral) {

    if (nomePreenchido) {

        let filtrado = catalogoGeral.filter((item) => {
            return item.name.includes(nomeProduto.value);
        });
        catalogoSec.innerHTML = '';
        filtrado.map((item, index) => {
            if (index < 20)
                catalogoSec.innerHTML += productItem(item);
        });
        console.log(filtrado);

    } else {
        catalogoSec.innerHTML = '';
        catalogoGeral.map((item, index) => {
            if (index < 20)
                catalogoSec.innerHTML += productItem(item);
        });
    }
}

async function carregaMakes(url) {
    let makes = await retornaMakeJson(url);
    console.log(makes);
    carregaProdutos(makes);
}

// async function carregaMakes() {
//     let makes = await retornaMakeJson(urlApiCompleta);
//     console.log(makes);
//     carregaProdutos(makes);
// }



// carregaMakes(urlApiFiltrada);

// async function carregaMakesMarca(marca) {
//     let url = urlApiCompleta + '?brand=' + marca;
//     let makesBrand = await retornaMakeJson(url);
//     console.log(makesBrand);
//     carregaProdutos(makesBrand);
// }

//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
    const item = `<div class="product" data-name="${product.name}" data-brand="${product.brand}" data-type="bronzer" tabindex="508">
<figure class="product-figure">
<img src="${product.image_link}" width="215" height="215" alt="${product.name}" onerror="javascript:this.src='img/unavailable.png'">
</figure>
<section class="product-description">
<h1 class="product-name"> ${product.name}</h1>
<div class="product-brands"><span class="product-brand background-brand">${product.brand}</span>
<span class="product-brand background-price">R$ ${product.price?(product.price * 5.5).toFixed(2):0}</span></div>
</section>
${loadDetails(product)}
</div>`;

    return item;
}



//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
    let details = `<section class="product-details"><div class="details-row">
        <div>BRAND</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">R$ ${product.price?(product.price * 5.5).toFixed(2):0}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${!product.rating ? 0 : product.rating}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.category}</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.product_type}</div>
        </div>
      </div></section>`;

    return details;
}


nomeProduto.addEventListener('blur', buscaPorNome);


function buscaPorNome(event) {
    if (event.target.value) {
        nomePreenchido = true;
    } else {
        nomePreenchido = false;
    }
    ajustaUrl();
}


selectBrands.addEventListener('change', buscaMarca);

function buscaMarca(event) {
    console.log(event.target.value);
    brandValor = event.target.value;
    ajustaUrl();
}

selectTypes.addEventListener('change', buscaType);

function buscaType(event) {
    console.log(event.target.value);
    typeValor = event.target.value;
    ajustaUrl();
}

function ajustaUrl() {
    urlApiFiltrada = urlApiCompleta;

    brandValor !== 'Todos' ? urlApiFiltrada = urlApiCompleta + "?brand=" + brandValor : urlApiFiltrada = urlApiCompleta;
    typeValor !== 'Todos' ? urlApiFiltrada = urlApiFiltrada + "&product_type=" + typeValor.toLowerCase() : urlApiFiltrada;

    console.log(urlApiFiltrada);

    carregaMakes(urlApiFiltrada);
}

selectSort.addEventListener('change', alteraClassificacao);

function alteraClassificacao() {
    console.log(event.target.value);
}

ajustaUrl();