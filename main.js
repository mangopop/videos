var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider.when("/",
        {
            templateUrl:"showVideos.html",
            controller:'vidsCtrl'
        }
    )
});

myApp.factory('videos', [function () {
    var videos = [
        {
            title: 'Intersteller',
            year: '2014',
            director: 'Christopher Nolan',
            url: 'images/intersteller.jpg',
            rating:'1'
        },
        {
            title: 'Terminator',
            year: '1989',
            director: 'James Cameron',
            url: 'images/terminator.jpg',
            rating:'2'
        },
        {
            title: 'Kung fu Hustle',
            year: '2005',
            director: 'Chinese man',
            url: 'images/kung_fu_hustle.jpg',
            rating:'3'
        },
        {
            title: 'Star Wars',
            year: '1979',
            director: 'Irvine Something',
            url: 'images/star_wars.jpg',
            rating:'4'
        },
        {
            title: 'Iron Man',
            year: '2010',
            director: 'Irvine Something',
            url: 'images/iron_man.jpg',
            rating:'5'
        },
        {
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