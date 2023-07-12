const express = require('express');
const router = express.Router();

const tickets = [
    {
        id: 1,
        name: "One Day Pass",
        price: 10000,
        transportation: "mrt"
    },
    {
        id: 2,
        name: "One Day Pass",
        price: 15000,
        transportation: "lrt"
    },
    {
        id: 3,
        name: "One Day Pass",
        price: 12000,
        transportation: "krl"
    },
    {
        id: 4,
        name: "One Day Pass",
        price: 10000,
        transportation: "tjkt"
    },
    {
        id: 5,
        name: "One Week Pass",
        price: 49000,
        transportation: "mrt"
    },
    {
        id: 6,
        name: "One Week Pass",
        price: 70000,
        transportation: "lrt"
    },
    {
        id: 7,
        name: "One Week Pass",
        price: 60000,
        transportation: "krl"
    },
    {
        id: 8,
        name: "One Week Pass",
        price: 50000,
        transportation: "tjkt"
    },
    {
        id: 9,
        name: "One Month Pass",
        price: 200000,
        transportation: "mrt"
    },
    {
        id: 10,
        name: "One Month Pass",
        price: 300000,
        transportation: "lrt"
    },
    {
        id: 11,
        name: "One Month Pass",
        price: 250000,
        transportation: "krl"
    },
    {
        id: 12,
        name: "One Month Pass",
        price: 200000,
        transportation: "tjkt"
    }
]

router.get("/:id/tickets", (req, res) => {
    const id = req.params.id;
    const ticket = tickets.filter(ticket => ticket.transportation == id);
    if (ticket) {
        res.status(200).json({success: true, data: ticket});
    } else {
        res.status(203).json({success: false, message: "Ticket not found" });
    }
})

module.exports = router;