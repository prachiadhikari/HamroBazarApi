const express = require('express');
const Trending = require('../models/trendingads');

const router = express.Router();

router.post('/addTrendingads', (req, res, next) => {
    
        Trending.create({
            name:req.body.name,
            price:req.body.price,
            type:req.body.type,
            image: req.body.image
        }).then((trending) => {
            res.json({ status: "Trending ads add success!" });
        }).catch(next);
    })

router.get('/',(req, res, next) => {
    Trending.find({},(err,trendingads)=>{
        if(err){
            res.json(next)
        }
        res.json(trendingads)
    });
})
        

            


module.exports = router;
