const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Order = require('../models/order').Order;

router.delete('/shopping-cart/delete-all', (req, res) => {
    req.session.cart = null;
    res.send("good");
});


function shoppingCartAction(req, res, func, funcCountPrice, funcCountQty) {
    let id = req.params.id;
    if ( !req.session.cart ) {
        console.log("can not delete item in shopping cart, if there is no shopping cart");
        return res.send("ERROR");
    }
    
    let cart = new Cart(req.session.cart);
    if ( !cart.doesContain(id) ) {
        console.log("can not delete item in shopping cart with non-existend it");
        return res.send("Error");
    }
    let totalPrice = funcCountPrice(cart, id);
    let totalQty = funcCountQty(cart, id);
    func(cart, id);
    req.session.cart = cart;
    res.json({
        totalPrice: totalPrice,
        totalQty: totalQty
    });
}

router.delete('/shopping-cart/delete-block/:id', (req, res) => {
    shoppingCartAction(req, res, (cart, id) => {
        cart.delete(id);
    }, (cart, id) => {
        return cart.pens[id].price;
    }, (cart, id) => {
        return cart.pens[id].qty;
    });
});

router.put('/shopping-cart/change-quantity-up/:id', (req, res) => {
    shoppingCartAction(req, res, (cart, id) => {
        cart.changeQty(id, true);
    }, (cart, id) => {
        return -cart.pens[id].pen.price;
    }, (cart, id) => {
        return -1;
    });
});

router.put('/shopping-cart/change-quantity-down/:id', (req, res) => {
    shoppingCartAction(req, res, (cart, id) => {
        cart.changeQty(id, false);
    }, (cart, id) => {
        return cart.pens[id].pen.price;
    }, (cart, id) => {
        return 1;
    });
});

router.get('/shopping-cart', (req, res) => {
    if ( !req.session.cart )
        return res.render("shopping-cart.ejs", {products: null});

    let cart = new Cart(req.session.cart);
    res.render("shopping-cart.ejs", 
        {products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty}
    );
});

router.get('/order', (req, res) => {
    if ( !req.session.cart ) {;
        console.log("cannot order if cart is empty");
        return res.redirect("/");
    }

    res.redirect('/objednavka/dodaci-udaje');
});

module.exports = router;