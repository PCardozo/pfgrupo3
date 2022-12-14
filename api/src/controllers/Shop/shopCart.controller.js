const { where } = require('sequelize');
const {
    Cart_item,
    Product,
    User
} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function updateItem(req, res) {
    try {
        const {cartItemId,newQuant} = req.body;
        if(!cartItemId || !newQuant) return res.status(400).send(badReq);
        let tuple = await Cart_item.findOne({where:{id:cartItemId}})
        let product = await Product.findOne({where:{id:tuple.productId}})
        if((product.stock-newQuant)<0 || newQuant>product.stock){
            return res.status(400).send({err:`Not enough units of ${product.name} in stock! The current stock is ${product.stock} units.`});
        }
        tuple.quantity = newQuant;
        await tuple.save();
        return res.status(200).send({success:'Cart item updated.'});
    } catch (error) {
        console.log(error)
        return res.status(200).send({err:'Server error....'});
    }
    

}

async function getCart(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        let cartItems = await Cart_item.findAll({where:{userId:req.params.id}})
        //console.log('cart items', cartItems);
        if(!cartItems) return res.status(404).send({err:'There are no items in your cart!'});
        let items = [];
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            let product = await Product.findByPk(cartItems[i].dataValues.productId)
            //console.log(product.dataValues);
            let obj = {}
            obj.productId = product.dataValues.id;
            obj.cartItemid = cartItems[i].dataValues.id;
            obj.name = product.dataValues.name;
            obj.price = product.dataValues.price * cartItems[i].dataValues.quantity;
            obj.quantity = cartItems[i].dataValues.quantity;
            total +=product.dataValues.price * cartItems[i].dataValues.quantity;
            items.push(obj)
        }
        let answer = {items,total};
        return res.status(200).send(answer);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function deleteWholeCart(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        let cartItems = await Cart_item.destroy({where:{userId:req.params.id}})
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function deleteOneFromCart(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        console.log(req.params.id)
        let cartItem = await Cart_item.destroy({where:{id:req.params.id}})
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function addCart(req,res){
    let {userId,productId,quantity} = req.body;
    
    try {
        //verificar que haya suficiente stock antes de aniadir a carrito
        let product = await Product.findByPk(productId);
        if((product.stock-quantity)<0 || quantity>product.stock){
            return res.status(400).send({err:`Not enough units of ${product.name} in stock! The current stock is ${product.stock} units.`});
        }
        let isInCart = await Cart_item.findOne({where:{productId:productId, userId:userId}})
        if(isInCart){
            let combinedQuantity =parseInt(isInCart.quantity)+parseInt(quantity)
            if((product.stock-combinedQuantity)<0 || combinedQuantity>product.stock){
                return res.status(400).send({err:`Adding that quantity of ${product.name} to your cart will surpass the stock available, which is ${product.stock} units.`});
            }
            isInCart.quantity = combinedQuantity;
            await isInCart.save()
            return res.sendStatus(200)
        }//
        let user = await User.findByPk(userId);
        let cItem = await user.createCart_item({quantity, productId});
        return res.sendStatus(200)
    } catch (error) {
        console.log('log',error)
        return res.status(500).send(error);
    }
}

module.exports = {
    addCart,
    deleteOneFromCart,
    deleteWholeCart,
    getCart,
    updateItem
}