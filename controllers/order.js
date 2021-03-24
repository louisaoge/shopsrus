// models
const Order = require("../models/order");
const Product = require("../models/product");
const HttpStatus = require("../config/httpstatus");

async function isLoyalCustomer(orderId) {
  const loyalCus = 2;
  var twoYearsFromNow = new Date();
  twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() - loyalCus);
  let isLoyal = false;
  const query = await Order.findOne({
    _id: orderId,
  }).populate("customer");

  const cusId = query.customer[0]._id;

  const query2 = await Order.findOne({
    _id: orderId,
    customer: [cusId],
    reg_date: {
      $lte: twoYearsFromNow,
    },
  });
  if (query2) {
    isLoyal = true;
  } else {
    isLoyal = false;
  }
  return isLoyal;
}

async function getUserType(orderId) {
  let cusRoles = "";
  const query = await Order.findOne({
    _id: orderId,
  }).populate("customer");

  if (query.customer[0].roles) {
    cusRoles = query.customer[0].roles;
  }
  return cusRoles;
}

async function getDiscountRate(orderId) {
  const user_type = await getUserType(orderId);
  const isloyalist = await isLoyalCustomer(orderId);
  let discount_rate = 0;
  if (user_type == "employee") {
    discount_rate = 0.3;
  } else if (user_type == "affiliate") {
    discount_rate = 0.1;
  } else if (user_type == "customer" && isloyalist == true) {
    discount_rate = 0.05;
  } else {
    discount_rate = 0.0;
  }
  return discount_rate;
}

async function getTotalAmount(orderId) {
  let total_amount1 = 0;
  const query = await Order.findOne({
    _id: orderId,
  });

  if (query) {
    total_amount1 = query.totalAmount;
  }
  return total_amount1;
}

async function get_non_grocery_amount(orderId) {
  let non_grocery_sum = 0;
  const query = await Order.findOne({
    _id: orderId,
  }).populate("product");

  if (query.product[0].category != "grocery") {
    non_grocery_sum = query.product[0].price;
  }
  return non_grocery_sum;
}

function get_fixed_discount(order_amount) {
  return Math.floor(order_amount / 100) * 5;
}

module.exports = {
  async get_order_summary(req, res) {
    const orderId = req.query.orderId;
    const user_discount_rate = await getDiscountRate(orderId);
    const totalAmount = await getTotalAmount(orderId);
    const fixedDiscount = get_fixed_discount(totalAmount);
    const non_grocery_sum = await get_non_grocery_amount(orderId);
    const percentage_discount = non_grocery_sum * user_discount_rate;
    const net_amount = totalAmount - (fixedDiscount + percentage_discount);

    var order_data = [];
    order_data.push({
      total_amount: totalAmount,
      fixed_discount: fixedDiscount,
      non_grocery_sum: non_grocery_sum,
      user_discount_rate: user_discount_rate,
      percentage_discount: percentage_discount,
      net_amount: net_amount,
    });
    return res.status(HttpStatus.OK).json({
      success: true,
      data: order_data,
    });
  },
};
