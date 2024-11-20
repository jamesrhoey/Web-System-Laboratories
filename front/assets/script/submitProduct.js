const productForm = document.querySelector('.add-product');
const inputs = Array.from(document.querySelectorAll('.form-control'));


const modalElement = document.getElementById('addProductModal');
let modal;

if (modalElement) {
    modal = new bootstrap.Modal(modalElement);  
} else {
    console.error('Modal element not found!');
}

const sendData = async (data) => {
    const response = await fetch('http://localhost:4000/api/product/new', {  
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
};

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = {
        productName: inputs[0].value,
        price: inputs[1].value,
        ingredients: inputs[2].value
    };

    sendData(product).then(result => {
        Swal.fire({
            icon: "success",
            title: "Operation Successful!",
            text: "A new product has been added to the menu!"
        }).then(() => {
            
            location.reload();
        });

        
        if (modal) {
            modal.hide();  
        } else {
            console.error('Modal is not initialized!');
        }

        console.log(result);

    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: "Oops... :(",
            text: "Something went wrong! Please try again later!"
        });

        console.log(e);
    });
});
