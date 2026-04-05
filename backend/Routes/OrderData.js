const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

router.post('/orderData', async (req, res) => {
    try {
        const orderData = Array.isArray(req.body.order_data) ? req.body.order_data : []
        // Persist each order as [Order_date marker, ...items] to keep history grouping simple.
        const formattedOrder = [{ Order_date: req.body.order_date }, ...orderData]
        const existingOrder = await Order.findOne({ email: req.body.email })

        if (!existingOrder) {
            await Order.create({
                email: req.body.email,
                order_data: [formattedOrder]
            })
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: formattedOrder } }
            )
        }

        return res.status(200).json({ success: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        const data = await Order.findOne({ email: req.body.email })
        return res.status(200).json({ orderData: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching orders' })
    }
});

module.exports = router;