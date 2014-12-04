//TODO build tabs using directives
//TODO build some http stuff in using promises and time out from seperate JSON

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider',function($routeProvider){ //don't have to add first argument
    $routeProvider.when("/",
        {
            templateUrl:"partials/allVideos.html",
            controller:'vidsCtrl'
            //could add some resolve stuff into the the root to wait for data etc. best to assign custom controller
            //$location.path("/path") for changing path!
        }
    ).when("/singleVideo/:id",
        {
            templateUrl:"partials/singleVideo.html",
            controller:'singleVidCtrl'
        }
    )
    .otherwise(
        {
            redirectTo: '/',
            templateUrl:"allVideos.html"

        }
    )
}]).factory('videos', ['$http', '$q', function ($http,$q) { //this order is picky

    //A promise can be in 3 states: pending, fulfilled or rejected. (resolved is an older term used by Q, which means either fulfilled or rejected).

    var videos1 = [
        {
            id:'1',
            title: 'Intersteller',
            year: '2014',
            director: 'Christopher Nolan',
            url: 'images/intersteller.jpg',
            review: "It is in the nature of science fiction to aspire to more, to ascend fearlessly toward the sublime. You could think of “Interstellar,” which has a lot to say about gravity, as the anti-“Gravity.” That movie, which would fit inside this one twice, stripped away the usual sci-fi metaphysics, presenting space travel as an occasion for quiet wonder and noisy crisis management. Mr Nolan takes the universe and eternity itself as his subject and his canvas, brilliantly exploiting cinema’s ability to shift backward and sideways in time (through flashbacks and cross cuts), even as it moves relentlessly forward.",
            rating:'1'
        },
        {
            id:'2',
            title: 'Terminator',
            year: '1989',
            director: 'James Cameron',
            url: 'images/terminator.jpg',
            rating:'2'
        },
        {
            id:'3',
            title: 'Kung fu Hustle',
            year: '2005',
            director: 'Chinese man',
            url: 'images/kung_fu_hustle.jpg',
            rating:'3'
        },
        {
            id:'4',
            title: 'Star Wars',
            year: '1979',
            director: 'Irvine Something',
            url: 'images/star_wars.jpg',
            rating:'4'
        },
        {
            id: '5',
            title: 'Iron Man',
            year: '2010',
            director: 'Irvine Something',
            url: 'images/iron_man.jpg',
            rating:'5'
        },
        {
            id:'6',
            title: 'Fury',
            year: '2014',
            director: 'Irvine Something',
            url: 'images/fury.jpg',
            rating:'4'
        }
    ];
    //return videos1;

    return {
        getVideos: function() {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get('videos.json')
                .then(function(response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function(response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        }
    };


}]);

myApp.filter('findStart', function(){

    //searchText.title is bound to the input
    //does the input and repeat mean we have access to both
    //how do we access items and input?

    return function(input){ //this will be each items in the repeat list, second should be argument

        //console.log(input);
        var filtered = [];
        var item = ['Terminator', 'Intersteller', 'Kung Fu Hustle', 'Star Wars', 'Star Wars: Revenge of the Sith'];

        for(var i = 0; i < item.length; i++ ) {//check each video
            if (input.substr(0, input.length).toLowerCase() === item[i].substr(0,input.length).toLowerCase()) {
                console.log(input.substr(0, i));
                console.log(item[0].substr(0,i));
                filtered.push(item[i]);
            }
        }

        return filtered;
        //return input.replace(/\w\S*/g, function(txt){
        //    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        //    }
        //);

        //var filtered = [];
        //for(var i = 0; i < videos.length; i++){
        //    //var item = items[i];
        //    ////if this items title doesn't start with the input remove it
        //    //if(/input/i.test(item.title.substring(0,input.length))){
        //    //    //filtered.push(item);
        //    //}
        //}
    }

});

myApp.controller('vidsCtrl', ['$scope', 'videos', function ($scope, videos) {

    $scope.test = "";

    var videoCount = [];

    // This service's function returns a promise, but we'll deal with that shortly
    videos.getVideos()
        // then() called when son gets back
        .then(function(data) {
            // promise fulfilled
            if (data) {
                showVideos(data);
            } else {
                console.log('didnt match if');
            }
        }, function(error) {
            // promise rejected, could log the error with: console.log('error', error);
            console.log('error');
        });

    function showVideos (data){
        $scope.videos = data;
        videoCount = $scope.videos.length;
    }

    //promise.then(
    //    function(payload){
    //        $scope.listingData = payload.data;
    //    },
    //    function(errorPayload) {
    //        console.log('failure loading movie', errorPayload);
    //    }
    //);


    //var deferred = $q.defer();
    //var fetchUser = function () {
    //// After async calls, call deferred.resolve with the response value
    //    $http.get('videos.json');
    //    deferred.resolve(user);
    //// In case of error, call
    //    deferred.reject('Reason for failure');
    //};
    //// Similarly, fetchUserPermissions and fetchUserListData are handled
    //deferred.promise.then(fetchUser)
    //    .then(fetchUserPermissions)
    //    .then(fetchUserListData)
    //    .then(function (list) {
    //// Do something with the list of data
    //    }, function (errorReason) {
    //
    //    });
    //

}]);

myApp.controller('singleVidCtrl', ['$scope', 'videos', '$routeParams', function($scope, videos, $routeParams){
    $scope.params = {
        id: $routeParams.id
    };

    $scope.videos = videos;
    var videoCount = $scope.videos.length;

    console.log($scope.videos[0].id, $scope.params.id);

    var getVideo = function(videoObj,paramObj){
        console.log(videoObj.length);
        for(var i = 0, ilen=videoObj.length; i < ilen; i++){

            if(videoObj[i].id == paramObj.id){
                console.log(videoObj[i].id);
                return videoObj[i];

            }
        }

    };

    $scope.requestedVideo = getVideo($scope.videos,$scope.params);
    console.log($scope.requestedVideo);
}]);

myApp.controller('TabsDemoCtrl', function ($scope) {
    $scope.tabs = [
        { title:"Dynamic Title 1", content:"Dynamic content 1" },
        { title:"Dynamic Title 2", content:"Dynamic content 2" }
    ];

    $scope.alertMe = function() {
        setTimeout(function() {
            alert("You've selected the alert tab!");
        });
    };
});
