import Product from "../models/product.models.js";


const getProducts= async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products", details: err.message });
    }
};

const postProducts = async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ error: "Failed to create product", details: err.message });
    }
};

const getById= async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch product", details: err.message });
    }
};

const updateProduct=  async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: "Failed to update product", details: err.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product has been deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete product", details: err.message });
    }
}

export { getProducts, postProducts, getById, updateProduct, deleteProduct};