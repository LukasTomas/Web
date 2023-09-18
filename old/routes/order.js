const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Pen = require('../models/pen');
const Order = require('../models/order').Order;
const csv = require('csv-parser');
const fs = require('fs');

const results = [];
let readerStream = fs.createReadStream('./documents/posta.csv');
readerStream.pipe(csv({})).on('data', (data) => results.push(data));

function parseData(csvData) {
    let parsed = [];
    csvData.forEach( element => {
        const split = element.split(";");
        parsed.push(
            {
                psc: split[0],
                name: split[1],
                street: split[2],
                cp: split[3],
                cislo_or: split[4],
                cast_obce: split[5], 
                obec: split[6],
            }
        );
    });
    return parsed;
}

function find(pscToFound) {
    const found = [];
    for ( let i = 1; i < results.length-1; i++ ) {
        const obj = results[i].k;
        const psc = obj.split(";")[0];

        const substring = psc.substring(0, pscToFound.length);
        if ( substring > pscToFound )
            break;

        if ( substring == pscToFound )
            found.push(obj);
    }
    return parseData(found);
}

router.post('/objednavka/dodaci-udaje/psc', (req, res) => {
    let query = req.body.data;
    const data = find(query);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json({
        success: true,
        result: data
    });
});

function checkCart(req, res, next) {
    if ( !req.session.cart ) {
        return res.redirect("/");
    } else
        next();
}

router.use(checkCart);

//Delivery Details ---------------------------------------
router.get('/objednavka/dodaci-udaje', (req, res) => {
    let cart = new Cart(req.session.cart);
    res.render('ordering/delivery-details.ejs', 
        {layout: 'ordering/ordering-layout.ejs', products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty});
});

router.post('/objednavka/dodaci-udaje/', (req, res) => {
    res.redirect('/objednavka/expedice');
});

//Expedition --------------------------------------------
router.get('/objednavka/expedice', (req, res) => {
    let cart = new Cart(req.session.cart);
    res.render('ordering/expedition.ejs', 
        {layout: 'ordering/ordering-layout.ejs', products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty})
});

router.post('/objednavka/expedice', (req, res) => {
    res.redirect('/objednavka/platba');
});

//Paymennt --------------------------------------
router.get('/objednavka/platba', (req, res) => {
    let cart = new Cart(req.session.cart);
    res.render('ordering/payment.ejs', 
        {layout: 'ordering/ordering-layout.ejs', products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty})
});


router.post('/order-done', async (req, res) => {
    if ( !req.session.cart ) {;
        console.log("cannot order if cart is empty");
        return res.render("shopping-cart.ejs", {products: null});
    }

    let cart = new Cart(req.session.cart);
    let pens = [];

    
    for ( let id in cart.pens ) {
        let pen = cart.pens[id];
        
        // first check if the ordered quantity is avaliable
        Pen.findOne({"title": "ahoj"}, (err, pen) => {
            console.log("al;sdkjf")
            if (err) {
                console.log("E")
            }

        });

        let obj = {name: pen.pen.title, qty: pen.qty};
        pens.push(obj);
    }
    let order = new Order({
        pens: pens,
        totalPrice: cart.totalPrice
    });
    await order.save();
    req.session.cart = null;
    res.render('order-submitted.ejs');
});

module.exports = router;