const express = require('express');
const router = express.Router();
const SubscriberModel = require('../models/subscriber')

// Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await SubscriberModel.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message }) // 500 : server error
    }
})

// Getting one
router.get('/:id', getSubscriberWithId, (req, res) => {
    res.send(res.subscriber)
    //res.send(res.subscriber.name)
    //res.send(res.params.id)
})

// Creating one
router.post('/', async (req, res) => {
    //console.log(req.body)
    const subscriber = new SubscriberModel({ 
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

// Updating one
// put 쓰면 바꾸고 싶은 데이터 말고도 다 바뀌므로 X (https://devuna.tistory.com/77)
router.patch('/:id', getSubscriberWithId, async (req, res) => {
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

// Deleting one
router.delete('/:id', getSubscriberWithId, async (req, res) => {
    try{
        await res.subscriber.remove()
        res.json({message: 'Deleted Subscriber'})
    }catch(err){
        res.status(500).json({message : err.message})
    }
})

// middle-ware function to get subscriber info
async function getSubscriberWithId(req, res, next){
    try{
        subscriber = await SubscriberModel.findById(req.params.id)
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