const Product = require('../models/productModel')
const mongoose = require('mongoose')

// get all workouts
const getProducts = async (req, res) =>{
    const products = await Product.find({}).sort({createdAt: -1})

    res.status(200).json(products)
}

//get a single workout
const getProduct = async (req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findById(id)

    if (!product){
        return res.status(404).json({error: 'No such product'})
    }
    res.status(200).json(product)
}

//create a workout
const createProduct = async (req, res) =>{
    const { productName, price, ingredients, image } = req.body;
    
    //add doc to db
    try {
        const product = new Product({ productName,price, ingredients, image});
        await product.save(); 
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}





//delete a workout
const deleteProduct = async (req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findOneAndDelete({_id: id})

    if (!product){
        return res.status(404).json({error: 'No such product'})
    }
    res.status(200).json(product)

}

//update a workout
const updateProduct = async (req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findOneAndUpdate({_id: id},{
        ...req.body
    } )

    if (!product){
        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}