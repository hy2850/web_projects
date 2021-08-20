const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber')

// Getting all
router.get('/', async (req, res)=>{
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message }) // it's our fault
    }
})
// Getting One
router.get('/:id', getSubscriber, (req, res)=>{
    res.json(res.subscriber)
    //res.send(res.subscriber.name)
    //res.send(res.params.id)
    //req.params.id
})
// Creating one
router.post('/', async (req, res)=>{
    console.log(req.body)
    const subscriber = new Subscriber({ 
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber) // we created something
    }catch(err){
        res.status(400).json({ message:err.message }) // user gave us bad data, so failed
    }
})
// Updating One
// put 쓰면 모두 업데이트 돼서 X
router.patch('/:id', getSubscriber, async (req, res)=>{
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }

    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
// Deleting One
router.delete('/:id', getSubscriber, async (req, res)=>{
    try{
        await res.subscriber.remove()
        res.json({message: 'Deleted Subscriber'})
    }catch(err){
        res.status(500).json({message : err.message})
    }
})

// middle-ware function to get subscriber info
async function getSubscriber(req, res, next){
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null){
            return res.status(404).json({message : 'Cannot find subscriber'}) // Couldn't find the target
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }

    res.subscriber = subscriber
    next()
}

module.exports = router