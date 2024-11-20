const menu = document.querySelector('.menu')

const getData = async() => {
    const response = await fetch("http://localhost:4000/api/product");
    const result = await response.json();

    return result;
}

const createCard =(menuItem) =>{
    const col = document.createElement('div');
    const card = document.createElement('div');

    col.classList.add('menu', 'col-sm-4','mb-4');
    card.classList.add('card', 'menu-item', 'product-card');

    card.append(createCardBody(menuItem.productName, menuItem.price, menuItem.ingredients));
    card.append(createCardFooter());

    col.append(card);

    return col;
}




const createCardBody = (productName, price, ingredients) =>{
    const div = document.createElement('div');
    const h5 = document.createElement('h5');
    const h6 = document.createElement('h6');
    const p = document.createElement('p');

    div.classList.add('card-body', 'text-center');
    h5.classList.add('card-title', 'text-white');
    h6.classList.add('card-text', 'text-white');
    p.classList.add('card-text', 'text-white');

    h5.innerHTML = productName;
    h6.innerHTML = price;
    p.innerText = ingredients;

    div.append(h5);
    div.append(h6);
    div.append(p);

    return div;
}
    




const createCardFooter = () =>{
    const div = document.createElement('div');
    const button = document.createElement('button');
    const button2 = document.createElement('button');

    div.classList.add('d-flex', 'justify-content-around');
    button.classList.add('btn', 'btn-danger', 'delete-btn');
    button2.classList.add('btn', 'btn-warning', 'update-btn');

    div.append(button);
    div.append(button2);

    return div;
} 

getData().then(result => {
    result.forEach(menuItem => {
        menu.append(createCard(menuItem))
    })
}).catch(err =>{
    console.log(err);
})