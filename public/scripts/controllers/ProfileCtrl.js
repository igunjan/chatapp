angular.module('ProfileCtrl', []).controller('ProfileController', function ($scope,$location, Upload, $http, Lightbox,$compile, $timeout, $rootScope) {

 $rootScope.userimg;
 $rootScope.user
    $scope.img3 = [
        { source: 'images/cht/img1.jpg' },
         { source: 'images/cht/img3.jpg' },
         { source: 'images/cht/img2.jpg' },
         { source: 'images/cht/img2.jpg' },
        //  { source: 'images/cht/img4.jpg' },
    ];

 
   $http.get('/getprofile').success(function (response) {
        if (response)
        $scope.user = response.username;
        $scope.des = response.description;
        $scope.userage = response.age;
        $scope.loc = response.address;
        $scope.userimg = response.profileimg;
        $scope.data = response._id;
    });
    
//  var socket = io();
//       $('#btngpchat').click(function(){
//         socket.emit('chat message', $('#inputText').val());
//         $('#inputText').val('');
//         console.log('s')
//         return false;
//       });
//       socket.on('chat message', function(msg){
//           angular.element('#messages').append('<div class="row"><div class="col-xs-2"><img src="images/temp/{{userimg}}" class="img-thumbnail img-responsive img-circle" style="width:70px;"></div></div>');
//       });

    $scope.logout = function(){
        $http.get('/logout');
    }
    
     
       $http.get('/count').success(function (response) {
        if (response){
            $scope.count = response;
        }
    });
      $scope.UpdateUser = function () {
        var updatedatades = {
            id:$scope.data,
            description: $scope.des
        }
        $http.put('/updatedes', updatedatades).success(function (data, headers) {
                    if (data)
                    console.log(data);		
                      $('#myModal3').modal('hide');
                    });
    }   

    $scope.myprofile = function(){
        $scope.hide = false;
        $scope.show =false;
        $('.nav a[href="#tab1"]').tab('show');
    } 



    $http.get('/getactiveusers').success(function (response) {
        if (response)
            console.log(response);
        $scope.getusers = [];
        $scope.getusers = response;
    });

    
        $scope.usertabs = [];
  

    $scope.openuser = function (_id) {

        var data = {
            _id: _id
        };
        console.log(data);
        var config = {
            params: data,
            headers: { 'Accept': 'application/json' }
        };
             $http.get('/getuser', config).success(function (response) {
            if (response)
            $scope.username = response.username;
            $scope.description = response.description;
            $scope.age = response.age;
            $scope.address = response.address;
            $scope.profileimg = response.profileimg;
            
        });

             $timeout(function () {
            $http.get('/getparuserimages',config).success(function (response) {
                if (response)
                    console.log(response);
                $scope.getparuserimages = [];
                $scope.getparuserimages = response;                
            })
        }, 1000)

           $timeout(function () {
            $http.get('/getparuservideos',config).success(function (response) {
                if (response)
                    console.log(response);
                $scope.getparuservideos = [];
                $scope.getparuservideos = response;                
            })
        }, 1000)
    }
        

    
        $scope.openprivatecht = function(){

        $scope.hide = true;
        $scope.show =true;
          $('#myModal4').modal('hide');
         $('.nav a[href="#tab0"]').tab('show');
        }

    $scope.removeuser = function(){
        // $("#li3").display = "none";
    }

    $scope.submit = function () {

          var id = {
            userid: $scope.data
        }
        Upload.upload({
            url: '/imagewall',
            data: {
                file: $scope.file,
                userid: id
            }
        }).then(function (resp) {
            console.log(resp);
            console.log('Success' + resp.config.data.file.name + 'uploaded. Response: ' + resp.config.data.file.name);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        }).finally(function () {
            cfpLoadingBar.complete();
        });

        $timeout(function () {
            $http.get('/getimages').success(function (response) {
                if (response)
                    console.log(response);
                $scope.getimages = [];
                $scope.getimages = response;
                $('#myModal').modal('hide');
                $scope.file = "";
            })
        }, 1000)

    }
    
    $scope.remimage= function(idx){
         var imagedelete = $scope.getimages[idx];
        //  console.log(person_to_delete);
        //    $http.delete('/deletevideo', person_to_delete).then(function(err,headers, res){
        //       
        //    });
             $scope.getimages.splice(idx, 1);
    }


    $scope.uploadFiles = function (file, errFiles) {
        var id = {
            userid: $scope.data
        }
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/videowall',
                data: {
                    file: file,
                    userid: id
                }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.VideoUrlget = file.result.VideoUrl;
                    $scope.path = file.result.url;
                    // $scope.path = $sce.trustAsResourceUrl(path)
                    var videotag = '<video ng-src="{{path}}" controls autoplay width="240" height="175"></video>';
                var tempvideo = $compile(videotag)($scope);
                angular.element(document.getElementById('videoid')).append(tempvideo);
                //     console.log(file.result.VideoUrl);
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;

            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    }




    $scope.videoupload = function () {
            //   var id = {
            //     userid: $scope.data
            // }
        
            $http.get('/getvideos').success(function (response) {
                if (response)
                $scope.getvideos = [];
                $scope.getvideos = response;
                console.log($scope.getvideos);
                    $('#myModal2').modal('hide');
            });
            $("#videoid").empty();
            // document.getElementById("videoid").remove();
    }

    
        $scope.remvideo= function(idx){
         var videodelete = $scope.getvideos[idx];
        //   var config = {
        //     params: videodelete,
        //     headers: { 'Accept': 'application/json' }
        // };

        //  console.log(videodelete);
        //    $http.delete('/deletevideo' + videodelete._id);
           $scope.getvideos.splice(idx, 1);
           
    }


    // function randomDate(start, end) {
    //     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // }

    // $http.get('https://api.randomuser.me/0.4/?results=20').success(function (data) {
    //     $scope.users = data.results;
    //     $('#userList').show();
    // }).error(function (data, status) {
    //     alert('get data error!');
    // });
    // $scope.randomDate = function () {
    //     var start = new Date(2013, 1, 2);
    //     var end = new Date();
    //     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // }

    // $scope.doPost = function () {
    //     $http.get('https://api.randomuser.me/0.4/').success(function (data) {
    //         var newUser = data.results[0];
    //         newUser.user.text = $('#inputText').val();
    //         // newUser.date = new Date();
    //         $scope.users.push(newUser);
    //         $('.chtcontent').scrollTop($('.chtcontent')[0].scrollHeight - $('.chtcontent')[0].clientHeight);
    //     }).error(function (data, status) {
    //         alert('get data error!');
    //     });
    //     document.getElementById('#inputText').value = "";
    // }

    $("ul.nav-pills a").click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $("ul.list-inline a").click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $scope.tagline = 'To the moon and back!';





    $scope.videos = [
        {
            'type': 'video',
            'url': 'images/temp/videos/SampleVideo_1280x720_1mb.mp4',
            'thumbUrl': 'http://res.cloudinary.com/salmansajid/video/upload/v1475232747/SampleVideo_1280x720_1mb_wwjrdp.jpg'
        },
        {
            'url': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Kamp_Alexisdorf_3.jpg',
            'thumbUrl': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Kamp_Alexisdorf_3.jpg/120px-Kamp_Alexisdorf_3.jpg'
        },
        {
            'type': 'video',
            'url': 'http://res.cloudinary.com/salmansajid/video/upload/v1475233533/SampleVideo_176x144_1mb_adprmn.3gp',
            'thumbUrl': 'http://res.cloudinary.com/salmansajid/video/upload/v1475232747/SampleVideo_1280x720_1mb_wwjrdp.jpg'
        }
    ];

    $scope.Lightbox = Lightbox;

    $scope.img5 = [
        {
            'type': 'video',
            'url': 'images/videos/SampleVideo_1280x720_1mb.mp4',

        },
        // {
        //     'type': 'video',
        //     'url': 'http://res.cloudinary.com/salmansajid/video/upload/v1475232747/SampleVideo_1280x720_1mb_wwjrdp.mp4',
        //     'source': 'http://res.cloudinary.com/salmansajid/video/upload/v1475232747/SampleVideo_1280x720_1mb_wwjrdp.jpg'
        // },
        {
            'source': 'images/cht/img5.jpg',
            'url': 'images/cht/img5.jpg'
        },
        { 'source': 'images/cht/img4.jpg' }
    ];

});








