module.exports = function Cart(oldCart) {
    this.pens = oldCart.pens || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(pen, id) {
        let storedPen = this.pens[id];
        if ( !storedPen ) {
            storedPen = this.pens[id] = {pen: pen, qty: 0, price: 0};
        }
        storedPen.qty++;
        storedPen.price = storedPen.pen.price * storedPen.qty;
        this.totalQty++;
        this.totalPrice += storedPen.pen.price;
    }

    this.delete = function(id) {
        let penToDelete = this.pens[id];
        if ( penToDelete ) { //only if exists
            let newArray = {};
            for ( let pen_id in this.pens ) {
                if ( pen_id != id )
                    newArray[pen_id] = this.pens[pen_id];
            }
            this.totalQty -= this.pens[id].qty;
            this.totalPrice -= this.pens[id].price;
            this.pens = newArray;
        }
    }

    this.changeQty = function(id, increment) {;
        let pen = this.pens[id];
        if ( pen ) {//only if exists 
            let changeBy = (increment) ? 1 : -1;
            if ( (pen.qty + changeBy) <= 0 )
                this.delete(id);
            else {
                this.totalQty += changeBy;
                this.totalPrice += changeBy * pen.pen.price;
                this.pens[id].qty += changeBy;
                this.pens[id].price += changeBy * pen.pen.price;
            }
        }
    }

    this.generateArray = function() {
        let arr = [];
        for ( let id in this.pens ) {
            arr.push(this.pens[id]);
        }
        return arr;
    }

    this.doesContain = function(pen_id) {
        for ( let id in this.pens ) {
            if ( id == pen_id )
                return true;
        }
        return false;
    }
}