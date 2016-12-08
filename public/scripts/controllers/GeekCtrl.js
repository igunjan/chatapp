angular.module('GeekCtrl', []).controller('GeekController', function ($scope, $rootScope, $compile, $http, Geek, Upload, $window, $timeout, cfpLoadingBar) {
  

    $scope.CreateUser = function () {
        var data = {
            username: $scope.username,
            description: $scope.description,
            age: $scope.age
        }
        Geek.setData(data);
    }

    $scope.opencamera = function(){
        
        var btnhtml = '<webcam channel="channel" on-streaming="onSuccess()" on-error="onError(err)" on-stream="onStream(stream)"></webcam>';
        var temp = $compile(btnhtml)($scope);
        angular.element(document.getElementById('idd')).append(temp);
        $scope.show = false;
    }
      $scope.upload = function (file) {
            Upload.upload({
                url: '/images',
                data: { file: file }
            }).then(function (resp) {
            console.log(resp);
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.config.data.file.name);
                $scope.image = resp.config.data.file.name;
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            }).finally(function() {
                cfpLoadingBar.complete();
            });
        };

    $scope.submit = function () {
        $scope.upload($scope.file);
        $('#myModal').modal('hide');
    }

    // var _video = null,
    //     patData = null;

    // $scope.patOpts = {x: 0, y: 0, w: 20, h: 20};

    // // Setup a channel to receive a video property
    // // with a reference to the video element
    // // See the HTML binding in main.html
    // $scope.channel = {};

    // $scope.webcamError = false;
    // $scope.onError = function (err) {
    //     $scope.$apply(
    //         function() {
    //             $scope.webcamError = err;
    //         }
    //     );
    // };

    // $scope.onSuccess = function () {
    //     // The video element contains the captured camera data
    //     _video = $scope.channel.video;
    //     $scope.$apply(function() {
    //         $scope.patOpts.w = _video.width;
    //         $scope.patOpts.h = _video.height;
    //         //$scope.showDemos = true;
    //     });
    // };

    // $scope.onStream = function (stream) {
    //     // You could do something manually with the stream.
    // };
    //  var patCanvas = document.querySelector('#snapshot');
    // var ctxPat = patCanvas.getContext('2d');
	// $scope.makeSnapshot = function() {
    //     if (_video) {
    //         if (!patCanvas) return;
    //         patCanvas.width = _video.width;
    //         patCanvas.height = _video.height;
 
    //         var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
    //         ctxPat.putImageData(idata, 0, 0);  
    //         //  sendSnapshotToServer(patCanvas.toDataURL());
    //          console.log(patCanvas.toDataURL());      
    //         patData = idata;
    //          var list = document.getElementById("idd");
    //             list.removeChild(list.childNodes[0]);
    //             // $scope.$destroy();
    //     }
    // };
    
    
    // $scope.downloadSnapshot = function downloadSnapshot(dataURL) {
    //     window.location.href = dataURL;
    // };
    
    // var getVideoData = function getVideoData(x, y, w, h) {
    //     var hiddenCanvas = document.createElement('canvas');
    //     hiddenCanvas.width = _video.width;
    //     hiddenCanvas.height = _video.height;
    //     var ctx = hiddenCanvas.getContext('2d');
    //     ctx.drawImage(_video, 0, 0, _video.width, _video.height);
    //     return ctx.getImageData(x, y, w, h);
    // };

  
  
    // var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
    //     $scope.snapshotData = imgBase64;
    // };

       

      
});