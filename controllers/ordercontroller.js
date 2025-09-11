const {Order} = require("../models/orders");
const User = require("../models/users");
const { sendEmail } = require('../utils/mail');
const mongoose=require('mongoose')
const GetAllOrders = async (req, res) => {
    try {
        let ordersList = await Order.find();
        if (ordersList.length > 0) return res.status(200).json(ordersList);
        else return res.status(400).send("There are no orders yet");
    } catch (err) {
        return res.status(500).send("Server error");
    }
};

const Review = async (req, res) => {
    try {
        let { email, numOfstars, description } = req.body;
        let { id } = req.params;
        if (!id) return res.status(400).send("Bad request");
        if (!email || !numOfstars || !description) return res.status(400).send("All fields are required");

        let user = await User.findOne({ email });
        if (!user) return res.status(404).send("User not found");

        if(user.review) return res.status(400).send("user can not review more than one time")

        let order=await Order.findOne({id})
        if(!order) return res.status(400).send("order not found")

        let orderUser = await Order.findOne({ user: user._id });
        if (!orderUser) return res.status(400).send("There is no order for this user");

        
        numOfstars = Number(numOfstars);
        let emailText = '';
        if (numOfstars <= 2) emailText = 'Sorry about this, we will try to make it better';
        else if (numOfstars === 3) emailText = 'Thanks for reviewing';
        else emailText = 'Thanks! We appreciate your high rating';

        await sendEmail(user.email, 'Review Feedback', emailText + '\n' + description);

        user.review = true;
        await user.save();

        return res.status(200).send("Email sent successfully");
    } catch (err) {
        return res.status(500).send("Server error");
    }
};



const AddOrder = async (req, res) => {
    try {
        const { user, items, totalPrice, status, deliveredAt } = req.body;

        if (!user || !items || !totalPrice) {
            return res.status(400).json({ message: "user, items and totalPrice are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        for (let i = 0; i < items.length; i++) {
            if (!mongoose.Types.ObjectId.isValid(items[i].product)) {
                return res.status(400).json({ message: `Invalid product ID at index ${i}` });
            }
        }

        const newOrder = new Order({
            user,
            items,
            totalPrice,
            status: status || "Pending",
            deliveredAt
        });

        await newOrder.save();
        return res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports = { Review, GetAllOrders,AddOrder };
