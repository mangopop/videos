//TODO build tabs using directives
//TODO build search function for home page

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider',function($routeProvider){ //don't have to add first argument
    $routeProvider.when("/",
        {
            templateUrl:"partials/allVideos.html",
            controller:'vidsCtrl'
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
}]).factory('videos', [function () {
    var videos = [
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

    return videos;
}]);

myApp.controller('vidsCtrl', ['$scope', 'videos', function ($scope, videos) {

    $scope.videos = videos;
    var videoCount = $scope.videos.length;

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
