(function() {

    var app = angular.module('pttTrend', ['ngRoute','angular.backtop']);

    app.factory('feeds', ['$http', '$location', function($http, $location) {
        var feeds = {
            posts:[],
            postcount:0
        }

        feeds.likes = function(){
            return $http.get('/api/likes').success(function(data){
                feeds.posts=[];
                data.forEach(function(post){
                    feeds.posts.push(post);
                })
            })
        }

        feeds.likesgrowth = function(){
            return $http.get('/api/likesgrowth').success(function(data){
                feeds.posts=[];
                data.forEach(function(post){
                    feeds.posts.push(post);
                })
            })
        }

        feeds.more = function(category,count,cb){
            return $http.get('/api/more/'+ category + '/'+ count).success(function(data){
                data.forEach(function(post){
                    feeds.posts.push(post);
                })
                return cb();
            })
        }

        feeds.comments = function(){
            return $http.get('/api/comments').success(function(data){
                feeds.posts=[];
                data.forEach(function(post){
                    feeds.posts.push(post);
                })
            })
        }

        feeds.commentsgrowth = function(){
            return $http.get('/api/commentsgrowth').success(function(data){
                feeds.posts=[];
                data.forEach(function(post){
                    feeds.posts.push(post);
                })
            })
        }

        feeds.getcount = function(){
            return $http.get('/api/postcount').success(function(data){
                feeds.postcount = data;
            })
        }

        feeds.delete = function(id){
            return $http.delete('/api/delete/' + id).success(function(data){
                console.log(data);
            })
        }


        return feeds;
    }]);

    app.controller('likesCtrl', ['$scope', 'feeds', function($scope, feeds) {
        var count = 1 ;

        $scope.postcount = feeds.postcount;
        $scope.posts = feeds.posts;
        $scope.more = function(){
            amplitude.getInstance().logEvent('MORE_LIKES_COUNT_'+count);
            $scope.isLoading = true;
            feeds.more('likes',count,function(){
                $scope.isLoading = false;
            });
            count ++;
        }
        $scope.delete = function(id){
            feeds.delete(id);
        }
        $scope.isLoading = false;
        $scope.auth = false;
    }]);

    app.controller('commentsCtrl', ['$scope', 'feeds', function($scope, feeds) {
        var count = 1 ;

        $scope.postcount = feeds.postcount;
        $scope.posts = feeds.posts;
        $scope.more = function(){
            amplitude.getInstance().logEvent('MORE_COMMENTS_COUNT_'+count);
            $scope.isLoading = true;
            feeds.more('comments',count,function(){
                $scope.isLoading = false;
            });
            
            count ++;
        }
        $scope.delete = function(id){
            feeds.delete(id);
        }
        $scope.isLoading = false;
        $scope.auth = false;
    }]);

    app.controller('likesgrowthCtrl', ['$scope', 'feeds', function($scope, feeds) {
        var count = 1 ;

        $scope.postcount = feeds.postcount;
        $scope.posts = feeds.posts;
        $scope.more = function(){
            amplitude.getInstance().logEvent('MORE_LIKESGROWTH_COUNT_'+count);
            $scope.isLoading = true;
            feeds.more('likesgrowth',count,function(){
                $scope.isLoading = false;
            });
            
            count ++;
        }
        $scope.delete = function(id){
            feeds.delete(id);
        }
        $scope.isLoading = false;
        $scope.auth = false;
    }]);

    app.controller('commentsgrowthCtrl', ['$scope', 'feeds', function($scope, feeds) {
        var count = 1 ;

        $scope.postcount = feeds.postcount;
        $scope.posts = feeds.posts;
        $scope.more = function(){
            amplitude.getInstance().logEvent('MORE_COMMENTSGROWTH_COUNT_'+count);
            $scope.isLoading = true;
            feeds.more('commentsgrowth',count,function(){
                $scope.isLoading = false;
            });
            
            count ++;
        }
        $scope.delete = function(id){
            feeds.delete(id);
        }
        $scope.isLoading = false;
        $scope.auth = false;
    }]);




    app.config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/partials/likes.html',
            controller: 'likesCtrl',
            resolve: {
                likes: function(feeds) {
                    return feeds.likes();
                },
                postcount: function(feeds){
                    return feeds.getcount();
                }
            }
        }).when('/comments', {
            templateUrl: '/partials/comments.html',
            controller: 'commentsCtrl',
            resolve: {
                comments: function(feeds) {
                    return feeds.comments();
                }
            }
        }).when('/likesgrowth', {
            templateUrl: '/partials/likesgrowth.html',
            controller: 'likesgrowthCtrl',
            resolve: {
                likesgrowth: function(feeds) {
                    return feeds.likesgrowth();
                }
            }
        }).when('/commentsgrowth', {
            templateUrl: '/partials/commentsgrowth.html',
            controller: 'commentsgrowthCtrl',
            resolve: {
                commentsgrowth: function(feeds) {
                    return feeds.commentsgrowth();
                }
            }
        }).otherwise({
            redirectTo: '/'
        });
    })

})();
