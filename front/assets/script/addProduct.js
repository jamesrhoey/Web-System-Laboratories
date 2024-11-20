const menu = document.querySelector('.menu')

const getData = async() => {
    const response = await fetch("http://localhost:4000/api/product");
    const result = await response.json();

    console.log(result);
    return result;
}

getData();
