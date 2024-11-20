const productForm = document.querySelector('.add-product')
const inputs = Array.from(document.querySelectorAll('.form-control'))
const modal = new bootstrap.Modal(document.getElementById('addForm'));

const sendData = async(data)=>{
    const response = await fetch('http://127.0.0.1:7979/api/v1/product/new', {
        method: "POST",
        headers:{
            "Content-type" : "application/json; charaset=UTF-8"
        },
        body: JSON.stringify(data)
    })

    const result =  await response.json()

    return result
}


productForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const product = {
        name: inputs[0].value,
        category: inputs[1].value,
        price: inputs[2].value,
        description: inputs[3].value
    }

    sendData(product).then(result =>{
        Swal.fire({
            icon: "success",
            title: "Operation Successful!",
            text: "A new product has been added to the menu!",
        });
        modal.hide();

        console.log(result)
    }).catch(e =>{
        Swal.fire({
            icon: "error",
            title: "Oopss... :(",
            text: "Something went wrong! Please try again later!",
        });

        console.log(e)
    })
    
})