var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cms');

var Article = mongoose.model('article', { title: String,  body: String , url: String });

// var defaultarticle = new Article({ title: "blah",  body: "dfsd" , url: "http://" });
// defaultarticle.save(function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("input default");
//     }
// });



/* GET home page. */
router.get('/', function(req, res) {
    console.log("get");
    // Article.find({}, function(err, docs){
    //     if(err) throw err;
    //     res.status(200).json({data: docs});
        // console.log(articles);
        // res.render('admin/index', {articles : articles});
    // });
    Article.find({}, function(err, docs) {
        if(err) throw err
        // res.status(200).json({data: docs});
        res.render('admin/index', {articles: docs});

    });

    // res.render('admin/index', {});
});

router.get('/newpage/:id', function(req, res) {
    // Article.find({}, function(err, docs){
    //     if(err) throw err
    //     var articles = res.status(200).json({data: docs});
    //     res.render('admin/index', { title: 'Welcome to admin page', articles : articles.data});
    // });
    var id = req.params.id;
    console.log(req.params);
    Article.findById(id, function(err, doc){
        console.log(doc);
        var defaultarticle1 = { title: doc.title,  body: doc.body , url: doc.url };
        res.render('admin/newpage', {article: defaultarticle1});
    });

});


router.get('/viewpage/:id', function(req, res) {
    // Article.find({}, function(err, docs){
    //     if(err) throw err
    //     var articles = res.status(200).json({data: docs});
    //     res.render('admin/index', { title: 'Welcome to admin page', articles : articles.data});
    // });
    var id = req.params.id;
    console.log(req.params);
    Article.findById(id, function(err, doc){

        var defaultarticle1 = { title: doc.title,  body: doc.body , url: doc.url };
        res.render('admin/viewpage', {article: defaultarticle1});
    });

});


router.get('/newpage/', function(req, res) {
    // Article.find({}, function(err, docs){
    //     if(err) throw err
    //     var articles = res.status(200).json({data: docs});
    //     res.render('admin/index', { title: 'Welcome to admin page', articles : articles.data});

    var defaultarticle = { title: "",  body: "" , url: "" };
    res.render('admin/newpage', {article: defaultarticle});
});

router.post('/newpage', function(req, res) {
    var new_article = new Article({
        title: req.body.title,
        body: req.body.body,
        url: req.body.url
    });

    var id = req.body._id;
    console.log(id);
    new_article.save(function(err, doc) {
        if(err) throw err
        // res.status(200).json({data: doc});
        res.redirect("/admin/");
    });

});


router.post('/newpage/:id', function(req, res) {

    var id = req.params.id;
    Article.findByIdAndUpdate(id, {$set: {
            title: req.body.title,
            body: req.body.body,
            url: req.body.url
        }},
        function(err, doc) {
            if(err) throw err;
            res.redirect("/admin/");
        });


    // var new_article = new Article({
    //     title: req.body.title,
    //     body: req.body.body,
    //     url: req.body.url
    // });
    //
    // var id = req.body._id;
    // console.log(id);
    // new_article.save(function(err, doc) {
    //     if(err) throw err
    //     // res.status(200).json({data: doc});
    //
    // });

});


router.get('/delete/:id', function(req, res) {
    var id = req.params.id;
    Article.findByIdAndRemove(id, function(err) {
        if(err) throw err
        res.redirect('/admin/');
    });
});

// router.get('/update/:id', function(req, res) {
//     var id = req.params.id;
//     Article.findByIdAndUpdate(id, {$set: {
//             title: req.body.title,
//             body: req.body.body,
//             url: req.body.url
//         }},
//         {new: true},
//         function(err, doc) {
//             if(err) throw err;
//             res.render('admin/newpage', {article:doc});
//         });
//
// });


module.exports = router;
