'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function (
    $scope,
    articleList) 
{

    var articleSearchKey = "4cb004734653f50693955b17bbde27ff:6:69801032";

    var beginDate = "20120101";
    var endDate = "20120101";
    var articleSearchKey = "4cb004734653f50693955b17bbde27ff:6:69801032";
    var urlCall = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=romney&begin_date=" + beginDate + "&end_date=" + endDate + "&fl=web_url,snippet&api-key=" + articleSearchKey;


    $scope.articleList = [];

    function _init() {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: urlCall,
            success: function(data) {
              alert(data.response.docs.length);
              alert(JSON.stringify(data));
              alert(data.response.docs[1].web_url);
              alert(data.response.docs[1].snippet);

              var items = data.response.docs.length;

              var i = 0;
              for (i = 0; i < items; i++) {
                var item = {web_url: data.response.docs[i].web_url, snippet: data.response.docs[i].snippet};
                console.log(JSON.stringify(item));
                $scope.articleList.push(item);
              }
            }
          });
    }

    _init();

    // $(document).ready(function() {
    //   console.log("ready!");
    //   $.ajax({
    //     type: "GET",
    //     dataType: "json",
    //     url: urlCall,
    //     success: function(data) {
    //       alert(data.response.docs.length);
    //       alert(JSON.stringify(data));
    //       alert(data.response.docs[1].web_url);
    //       alert(data.response.docs[1].snippet);

    //       var items = data.response.docs.length;

    //       var i = 0;
    //       for (i = 0; i < items; i++) {
    //         var item = {web_url: data.response.docs[i].web_url, snippet: data.response.docs[i].snippet};
    //         console.log(JSON.stringify(item));
    //         articleList.push(item);
    //       }
    //     }
    //   });
    // });


    // var id_ = 'boxes-example';
    // var boxes_ = document.querySelectorAll('#' + id_ + ' .news-story-holder');
    // var dragSrcEl_ = null;
    // this.handleDragStart = function (e) {
    //     e.dataTransfer.effectAllowed = 'move';
    //     e.dataTransfer.setData('text/html', this.innerHTML);
    //     dragSrcEl_ = this;
    //     this.style.opacity = '0.5';
    //     // this/e.target is the source node.
    //     this.addClassName('moving');
    // };
    // this.handleDragOver = function (e) {
    //     if (e.preventDefault) {
    //         e.preventDefault(); // Allows us to drop.
    //     }
    //     e.dataTransfer.dropEffect = 'move';
    //     return false;
    // };
    // this.handleDragEnter = function (e) {
    //     this.addClassName('over');
    // };
    // this.handleDragLeave = function (e) {
    //     // this/e.target is previous target element.
    //     this.removeClassName('over');
    // };
    // this.handleDrop = function (e) {
    //     // this/e.target is current target element.

    //     if (e.stopPropagation) {
    //         e.stopPropagation(); // stops the browser from redirecting.
    //     }
    //     // Don't do anything if we're dropping on the same box we're dragging.
    //     if (dragSrcEl_ != this) {
    //         dragSrcEl_.innerHTML = this.innerHTML;
    //         this.innerHTML = e.dataTransfer.getData('text/html');
    //     }
    //     return false;
    // };
    // this.handleDragEnd = function (e) {
    //     // this/e.target is the source node.
    //     this.style.opacity = '1';

    //     [ ].forEach.call(boxes_, function (box) {
    //         box.removeClassName('over');
    //         box.removeClassName('moving');
    //     });
    // };

    // [ ].forEach.call(boxes_, function (box) {
    //     box.setAttribute('draggable', 'true');  // Enable boxes to be draggable.
    //     box.addEventListener('dragstart', this.handleDragStart, false);
    //     box.addEventListener('dragenter', this.handleDragEnter, false);
    //     box.addEventListener('dragover', this.handleDragOver, false);
    //     box.addEventListener('dragleave', this.handleDragLeave, false);
    //     box.addEventListener('drop', this.handleDrop, false);
    //     box.addEventListener('dragend', this.handleDragEnd, false);
    // });
}]);