'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])


.controller('View1Ctrl', function ($scope, $http) 
{
    $scope.goCats = false;

    $scope.articles = [{web_url: ""}];
    $scope.topics = [{name: ""}];

    var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
    var matches, substrRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};
 
    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
      'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
      'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
      'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
     
    $('#the-basics .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'states',
      displayKey: 'value',
      source: substringMatcher(states)
    });




    var articleSearchKey = "4cb004734653f50693955b17bbde27ff:6:69801032";

    var beginDate = "20120101";
    var endDate = "20120101";
    var articleSearchKey = "4cb004734653f50693955b17bbde27ff:6:69801032";
    var urlCall = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=romney&begin_date=" + beginDate + "&end_date=" + endDate + "&fl=web_url,snippet,headline&api-key=" + articleSearchKey;



    function _init() {

        $http({method: 'GET', url: 'view1/twitterdata.json'})
        .success(function(data, status, headers, config) {
          alert(data.topics[0].topic);

          $scope.topics = data.topics;
        })
        .error(function(data, status, headers, config) {
          alert('error');
        });

        $.ajax({
            type: "GET",
            dataType: "json",
            url: urlCall,
            success: function(data) {
              // alert(data.response.docs.length);
              // alert(JSON.stringify(data));
              // alert(data.response.docs[1].web_url);
              // alert(data.response.docs[1].snippet);

              var articleList = [];
              var items = data.response.docs.length;

              var i = 0;
              for (i = 0; i < items; i++) {
                var item = {web_url: data.response.docs[i].web_url, 
                    snippet: data.response.docs[i].snippet,
                    headline: data.response.docs[i].headline
                };
                console.log(JSON.stringify(item));
                articleList.push(item);

                $scope.articles = articleList;
              }
            }
          });


      $(function () { 
        $('#chode').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            series: [{
                name: 'Jane',
                data: [1, 0, 4]
            }, {
                name: 'John',
                data: [5, 7, 3]
            }]
        });
    });
    }


    _init();

});