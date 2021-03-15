// models
const Order = require('../models/order');
const Product = require('../models/product');
const HttpStatus = require('../config/httpstatus');

async function isLoyalCustomer(orderId) {
    const loyalCus = 2;
    let isLoyal;
    try { await Order.findOne({
        _id: orderId
    }, function (err, data) {
        if (data.customer[0].reg_date = "2021-01-05T12:17:28.783+00:00") {
            isLoyal = true
            return isLoyal
        } else {
            return false
        }
    }).populate('customer')
    return isLoyal
}
catch (err) {
    console.log(err) 
}
}

async function getUserType(orderId) {
    let cusRoles;
   try{ await Order.findOne({
        _id: orderId
    }, function (err, data) {
        if (data) {
            cusRoles = data.customer[0].roles
            return cusRoles
        } else {
            return false
        }

    }).populate('customer')
    return cusRoles
}
catch (err) {
    console.log(err) 
}
}

async function getDiscountRate(orderId) {

    const user_type = await getUserType(orderId)
    const isloyalist = await isLoyalCustomer(orderId)
    //console.log(isloyalist)
    let discount_rate = 0;
    if (user_type == 'employee') {
        discount_rate = 0.3;
    } else if (user_type == 'affiliate') {
        discount_rate = 0.1;
    } else if (user_type == 'customer' && isloyalist == true) {
        discount_rate = 0.05;
    } else {
        discount_rate = 0.0;
    }
    return discount_rate;
}


async function getTotalAmount(orderId) {
    let total_amount;
    try { await Order.findOne({
        _id: orderId
    }, function (err, data) {
        if (data) {
            total_amount = data.totalAmount
        }
    })
    return total_amount
}catch (err) {
    console.log(err) 
}
}

async function get_non_grocery_amount(orderId) {
    let non_grocery_sum;
    try {await Order.findOne({
        _id: orderId
    }, function (err, data) {
            if (data.product[0].category != 'grocery') {
                non_grocery_sum = data.product[0].price
            }
    }).populate('product')
    return non_grocery_sum
}catch (err) {
    console.log(err) 
}
}

function get_fixed_discount(order_amount) {
    return Math.floor(order_amount / 100) * 5;
}

module.exports = {
    async get_order_summary(req, res) {
        const orderId = req.query.orderId;
        const user_discount_rate = await getDiscountRate(orderId);
        //console.log(user_discount_rate);
        const totalAmount = await getTotalAmount(orderId);
        const fixedDiscount = await get_fixed_discount(totalAmount);
        const non_grocery_sum = await get_non_grocery_amount(orderId);
        console.log(non_grocery_sum);
        const percentage_discount = non_grocery_sum * user_discount_rate;
        const net_amount = totalAmount - (fixedDiscount + percentage_discount);

        var order_data = [];
        order_data.push({
            total_amount: totalAmount,
            fixed_discount: fixedDiscount,
            non_grocery_sum: non_grocery_sum,
            user_discount_rate: user_discount_rate,
            percentage_discount: percentage_discount,
            net_amount: net_amount
        })
        return res.status(HttpStatus.OK).json({
            success: true,
            data: order_data
        })
    }

}