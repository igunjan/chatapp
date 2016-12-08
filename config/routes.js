var multer = require('multer');
var UserModel = require('./model/usermodel');
var ImageModel = require('./model/imagemodel');
var VideoModel = require('./model/videomodel');
var session = require('express-session');


module.exports = function(app) {
	 
   app.use(session({secret: 'cruiseapp',resave: true,saveUninitialized: true})); 

		var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/temp')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
    // console.log(file.mimetype);
    // cb(null, Date.now()) //Appending .jpg
  }
})

var upload = multer({ storage: storage });
var str;
app.post('/images', upload.single('file'), function (req, res) {
  console.log("DP: ");
  if(req.file){
    str = req.file.originalname;
  }
    res.send(str);
});

app.post('/imagewall', upload.single('file'), function (req, res) {
  var image;
  console.log("POSTIMG: ");
  console.log(req.body);
  if(req.file){
    var imagename = 'images/temp/'+req.file.originalname;
    console.log(imagename);
  }
  image = new ImageModel ({
    userid: req.body.userid.userid,
    url: imagename,
  });
  image.save(function (err, docs) {
    if (!err) {
      console.log(docs);
    } else {
      return console.log(err);
    }
    res.json(docs)
  });
    
});



app.post('/videowall', upload.single('file'), function (req, res) {
  var image;
  console.log("POSTvideo: ");
  console.log(req.body);
  if(req.file){
    var videoname = 'images/temp/'+req.file.originalname;
    console.log(videoname);
  }
  video = new VideoModel ({
    type : 'video',
    userid: req.body.userid.userid,
    url: videoname,
  });
  video.save(function (err, docs) {
    if (!err) {
      console.log(docs);
    } else {
      return console.log(err);
    }
    res.json(docs)
  });
    
});


app.post('/geek', function (req, res) {
  sess=req.session;
  var user;
  console.log("POSTUSER: ");
  console.log(req.body);
  user = new UserModel({
    username: req.body.username,
    description: req.body.description,
    age: req.body.age,
    address: req.body.address,
    profileimg: str,
    status: true

  });
  user.save(function (err, res) {
    if (!err) {
      console.log('Created');
    } else {
      return console.log(err);
    }
  });
  sess.sessdata =user._id;
  console.log(sess.sessdata); 
  return res.send(user);  
});


app.get('/getprofile', function (req, res) {
  console.log('GETPROFILE');
  UserModel.findById(sess.sessdata, function (err, docs) {
    if (!err) {
      console.log(docs);
    } else {
      return console.log(err);
    }
    res.json(docs);
  });
});

app.get('/logout',function(req,res){
console.log(sess.sessdata);
    sess = req.session;
    sess.sessdata = "";
    sess.destroy(function(err) {
        if(err){
           console.log(sess.sessdata + 'not destroy');
            res.json(sess.sessdata);
        }else{
            res.json(sess.sessdata);
            console.log(sess.sessdata + ' destroy');
        }
    });
});

app.get('/count', function (req, res) {
  console.log('Count');
  UserModel.count({}, function (err, docs) {
    if (!err) {
      console.log(docs);
    } else {
      return console.log(err);
    }
    res.json(docs);
  });
});

app.put('/updatedes', function (req, res) {
  var user;
  console.log("PUTDes: ");
  console.log(req.body);
      UserModel.update({_id:req.body.id},{description:req.body.description}, function(err, result, docs){
        if(err){
            console.log(err);
        }
        console.log(result);
        console.log(docs);
        res.json(docs)
}) 
});
app.get('/getimages', function (req, res) {
  console.log("GETIMAGE: "); 
  ImageModel.find({'userid' : sess.sessdata}, function (err, docs) {
    if (!err) {
      console.log(docs)
    }
    res.json(docs);
  });  
}); 


app.get('/getvideos', function (req, res) {
  console.log("GETVideo: "); 
  VideoModel.find({'userid' : sess.sessdata}, function (err, docs) {
    if (!err) {
      console.log(docs)
    }
    res.json(docs);
  });  
});

// app.delete('/deletevideo'+req.params, function(req, res){
//     console.log('deletevodio');
//     console.log(req.params);
//     VideoModel.remove(req.params, function(err, result){
//       if(!err){
//         console.log(result);
//       }
//     });
// });

app.get('/getactiveusers', function (req, res) {
  console.log("GETACTIVEUSER: "); 
  UserModel.find({status: true}).sort({"_id":"-1"}).exec(function (err, docs) {
    if (!err) {
      console.log(docs);
    } else {
      return console.log(err);
    }
    res.json(docs);
  });
}); 

app.get('/getuser', function (req, res) {
  console.log('GETUSER');
  UserModel.findById(req.query._id, function (err, docs) {
    if (!err) {
      console.log(docs);
    } else {
      return console.log(err);
    }
    res.json(docs);
  });
});

app.get('/getparuserimages', function (req, res) {
  console.log("GETIMAGE: "); 
  ImageModel.find({'userid' : req.query._id}, function (err, docs) {
    if (!err) {
      console.log(docs)
    }
    res.json(docs);
  });  
});


app.get('/getparuservideos', function (req, res) {
  console.log("GETVideo: "); 
  VideoModel.find({'userid' : req.query._id}, function (err, docs) {
    if (!err) {
      console.log(docs)
    }
    res.json(docs);
  });  
});






// application -------------------------------------------------------------
};