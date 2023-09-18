const express = require('express');
const { result } = require('lodash');
const router = express.Router();
const Order = require('../models/order').Order;
const FinishedOrder = require('../models/order').FinishedOrder;
const Admin = require('../models/admin');
const async = require('async');
const bcrypt = require('bcrypt');
const { response } = require('express');

router.delete('/admin/order-done/:id', async (req, res) => {
    let id = req.params.id;
    
    let order = await Order.findOne({_id: id});
    if ( !order ) {
        console.log('order with id ' + id + ', not found');
        res.json({
            success: false,
            errorStr: err
        });
    }
    order.delete((err) => {
        if ( err )
        res.json({
            success: false,
            errorStr: err
        });
    })
    /*Order.findOneAndDelete({_id: id}, (err) => {
        if ( err )
        res.json({
            success: false,
            errorStr: err
        });
    });*/
    
    let finishedOrder = new FinishedOrder({
        pens: order.pens,
        totalPrice: order.totalPrice,
        _id: order._id
    });
    
    finishedOrder.save();
    res.json({
        success: true
    });
});

//login------------------------------------------------------
const loadAdminPage = (req, res) => {
    Order.find().then((orders) => {
        FinishedOrder.find().then((finishedOrders) => {
            res.render('admin.ejs', {orders: orders, finishedOrders: finishedOrders});
        }).catch((err) => {
            console.log("error when loading all finishedOrders: " + err);
            res.status(500).send('ERROR');
        });
    }).catch((err) => {
        console.log("error when loading all orders: " + err);
        res.status(500).send("ERROR");
    });
}
router.get('/admin', (req, res) => {
    if ( req.session.isLogged )
        loadAdminPage(req, res);
    else
        res.render('login/login.ejs', {layout: 'login/loginLayout.ejs'});
});

router.post('/admin/login', async (req, res) => {
    const {name, password} = req.body;
    const error = [];

    if (!name || !password) {
        error.push('Vyplnťe všechny políčka');
        res.render('login/login.ejs', {layout: 'login/loginLayout.ejs', name, password, error});
    } else {
    
        await async.waterfall([
            function a(cb) {
                Admin.findOne({user: name}, (err, admin) => {
                    if ( err || admin == null ) {
                        cb(null, null);
                    } else {
                        cb(null, admin);
                    }
                });
            },
            function b(admin, cb) {
                if ( admin == null )
                    cb(null, null);
                else {
                    bcrypt.compare(password, admin.password, (err, result) => {
                        if ( err || result == false )
                            cb(null, null);
                        else
                            cb(null, result);
                    });
                }
            }
        ], (err, result) => {
            if ( result ) {
                req.session.isLogged = true;
                res.redirect('/admin')
                //loadAdminPage(req, res);
            }else
                res.render("404.ejs");
        });
    }
});



router.get('/admin/save', async (req, res) => {
    let admin = new Admin({
        user: "admin",
        password: "admin"
    });
    console.log(admin.password);
    bcrypt.hash(admin.password, 10, (err, hash) => {
        if ( err ) {
            console.log(err);
        } else {
            admin.password = hash;
            admin.save();
            console.log('saved');
        }
    });
});



module.exports = router;