const menu = document.querySelector('.menu')

const getData = async()=>{
    const response = await fetch("http://localhost:7979/api/v1/product/");
    const result = await response.json();
    return result;
}

const createCard = (menuItem) =>{
    const col = document.createElement('div');
    const card = document.createElement('div');

    col.classList.add('cols', 'col-lg-4');
    card.classList.add('card', 'menu-item', 'mb-3');

    card.append(createCardBody(menuItem.name, menuItem.category, menuItem.description));
    card.append(createCardFooter(menuItem.price));
    col.append(card);

    return col;
}

const createCardBody = (name, category, description) =>{
    const div = document.createElement('div');
    const h5 = document.createElement('h5');
    const h6 = document.createElement('h6');
    const p = document.createElement('p');

    div.classList.add('card-body');
    h5.classList.add('card-title');
    h6.classList.add('card-subtitle', 'mb-2', 'text-body-secondary');
    p.classList.add('card-text', 'fw-light');

    h5.innerText = name;
    h6.innerText = category;
    p.innerText = description;

    div.append(h5);
    div.append(h6);
    div.append(p);

    return div;
}

const createCardFooter = (price) =>{
    const div = document.createElement('div');
    const small = document.createElement('small');

    div.classList.add('card-footer');
    small.classList.add('fw-bold')
    small.innerText = `${price}.00 php`;

    div.append(small);
    return div;
}

getData().then(result =>{
    result.forEach(menuItem =>{
        menu.append(createCard(menuItem))
    })
}).catch(err =>{
    console.log(err);
})