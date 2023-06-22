// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app=angular.module('starter', ['ionic']);


app.controller('currencyController',function($scope,$http){
  $scope.currencies=[];

  //query latest list of currencies and their rates
  $http({
    method:'GET',
    url:'https://api.apilayer.com/fixer/latest',
    headers:{
      'apikey':'1yJg56aYgDPSAwO5mMhmq7I8AMxje8Zs'
    } // b591f48bf077873aede5ab3732a2eaee
  }).then(function(response){
    //console.log(response);
    if((response.data).hasOwnProperty('error')||response.status!=200){
      alert('An error occurred');
    }else{
      $scope.currencies=Object.entries(response.data.rates); //set rates for drop downs
    }
  });

  $scope.convert=function(){
     var from=JSON.parse(document.getElementById('fromCurrency').value);
    var to=JSON.parse(document.getElementById('toCurrency').value);
    var amount=document.getElementById('amount').value;  //conversion amount
    if(amount !=''){
      var result;
      $http({
        method:'GET',
        url:`https://api.apilayer.com/fixer/convert&to=${to[0]}&from=${from[0]}&amount=${amount}`,
        headers:{
          'apikey':'1yJg56aYgDPSAwO5mMhmq7I8AMxje8Zs'
        } // b591f48bf077873aede5ab3732a2eaee
      }).then(function(response){
        console.log(response);
        if((response.data).hasOwnProperty('error')||response.status!=200){
          alert('An error occurred');
        }else{
              //get conversion
          //console.log(response.data.result);
            result=response.data.result;
          //conversion result to 2 decimal places
          document.getElementById('convertedAmount').innerHTML = amount+' '+ from[0]+' = '+result?.toFixed(2)+' '+to[0];        //display result of query/conversion

        }
      });
    }else{
      alert('Amount can not be empty');
    }
    //calculate conversion
   
  }
  


});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})
