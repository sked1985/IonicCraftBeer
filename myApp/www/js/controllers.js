angular.module('starter.controllers', [])

//Login controller
.controller('LoginCtrl', function($scope, auth, $state, store) {
  function doAuth() {
    auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    },function(profile,token, accessToken, state, refreshToken){
      store.set('profile',profile);
      store.set('token',token);
      store.set('refreshToken',refreshToken);
      $state.go('tour');
    },function(){
      console.log('This is fucked');
    });
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });
  doAuth();
})

//tour controller
.controller('TourCtrl', function ($scope, $location, $ionicPopup, auth, store, $state) {

  //This is the popup that asks the user what age they are
  $scope.login1 = function () {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Please confirm?',
      template: 'Are you 18 years Old?',
      cancelText:'No',
      okText: 'Yes'
    })
    //Code that grants the user access to app if they click yes
    confirmPopup.then(function(code) {
      if(code) {
        console.log('Yes');
        $location.url('/tab/home');
      } else {
        console.log('No');
          var alertPopup = $ionicPopup.alert({
            title: 'Sorry',
            template: 'You have to be 18 to use this app'
      });
      //If the user chooses no log them out
        alertPopup.then(function(res) {
        console.log('');
        auth.signout();
        store.remove('token');
        store.remove('profile');
        store.remove('refreshToken');
        $state.go('login');

    });
      }
    });
  }

})

//Side menu controller
.controller('NavCtrl', function($scope, auth, $state, store, $ionicSideMenuDelegate) {


  //This code uses auth0 to identify a user
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };


  $scope.auth = auth;
  $scope.data = {};
})
//Controller for the tabs
.controller('TabsCtrl', function($scope, User) {
  $scope.favCount = User.favoriteCount;

  $scope.enteringFavorites = function(){
    User.newFavorites = 0;
  }
})
//Home Page controller
.controller('HomeCtrl', function($scope, $cordovaSocialSharing, auth, $http, $timeout, $ionicModal, $ionicActionSheet, $ionicLoading, $ionicPopup, EventsService, $state, store, CommentsService, $rootScope) {

  //Shares data via Twitter
  $scope.shareViaTwitter = function(message, image, link) {
       $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
           $cordovaSocialSharing.shareViaTwitter(message, image, link);
       }, function(error) {
           alert("Cannot share on Twitter");
       });
   }

   //Shares data via twitter on items page
   $scope.shareViaTwitter1 = function(message, image, link) {
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        }, function(error) {
            alert("Cannot share on Twitter");
        });
    }

  //This code uses auth0 to identify a user
  $scope.auth = auth;
  $scope.postReviewer = auth.profile.name;
  $scope.postReviewerPic = auth.profile.picture;

  $scope.data = {};

   // This is the help button on the items page alert
   $scope.showPopup = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Like what you see?',
       template: 'Press the order now button'
     });
     alertPopup.then(function(res) {
       console.log('');
     });
  }


  //This is the start of the comments
  var message = {
    rating: 5
  };


  $scope.comments = CommentsService;

  $scope.comment = {};

  $scope.comment = angular.copy(message);

  //Sends the comments
  $scope.addComment = function(comment) {
    $scope.comments.$add({message: $scope.comment,
                          Reviewer:$scope.postReviewer,
                          ReviewerPic:$scope.postReviewerPic});
    //we reset the text input field to an empty string
    $scope.comment.theComment = "";

  };

  //This is the function that displays the message when comments have been sent
  $scope.sendComments = function() {

    console.log("This is logged" , $scope.comment);
    // Send comment
    $scope.cancelComments();
    $ionicPopup.alert({
      title: 'Thank you!',
      template: 'We appreciate your comments!',
      okText: 'Close'

    });
  };

  //Closes the comments page
  $scope.cancelAbout = function () {

    $scope.modal.hide();
  }



  //Opens the comments page

  $scope.openAbout = function() {
    $ionicModal.fromTemplateUrl('templates/about.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //Closes the comments page
  $scope.cancelComments = function () {

    $scope.modal.hide();
  }



  //Opens the comments page

  $scope.openComments = function() {
    $ionicModal.fromTemplateUrl('templates/comments.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //This is the code that displays the action sheet on the items page
  $scope.showOptions = function () {
   var sheet = $ionicActionSheet.show({
     titleText: 'Choose an action',
     buttons: [
         { text: '<i class="icon ion-social-twitter"></i> Share on Twitter' },
         { text: '<i class="icon ion-social-facebook"></i> Share on Facebook' },
         { text: 'More information'}
       ],
       destructiveText: 'Cancel',

       buttonClicked: function (index) {
        if (index === 0) {
          $cordovaSocialSharing.canShareVia("twitter", "Check it out").then(function(result) {
            $cordovaSocialSharing.shareViaTwitter("Check out this amazing drink, It` delicious'!!!!!!!'http://craftbeer.com");
        }, function(error) {
            alert("Cannot share on Twitter");
        });
        }
        if (index === 1) {
          $cordovaSocialSharing
      .shareViaFacebook("Check out this amazing drink, It` delicious'!!!!!!!'http://craftbeer.com")
      .then(function(result) {
        // Success!
      }, function(err) {
        alert("Cannot share on Facebook");
      });
        }
        if (index === 2) {
          $scope.showModal();
        }
        return true;
      }
    });
  };

  $scope.showModal = function() {
    $ionicModal.fromTemplateUrl('templates/info-chart.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };


  $scope.hideModal = function () {
    $scope.modal.hide();
  };


  //Closes the beerchat page
  $scope.cancelBeerChat = function () {

    $scope.modal.hide();
  }



  //Opens the beerchat page
  $scope.openBeerChat = function() {
    $ionicModal.fromTemplateUrl('templates/beerchat.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //Closes the ciderchat page
  $scope.cancelCiderChat = function () {

    $scope.modal.hide();
  }



  //Opens the ciderchat page
  $scope.openCiderChat = function() {
    $ionicModal.fromTemplateUrl('templates/ciderchat.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //Closes the stoutchat page
  $scope.cancelStoutChat = function () {

    $scope.modal.hide();
  }



  //Opens the stoutchat page
  $scope.openStoutChat = function() {
    $ionicModal.fromTemplateUrl('templates/stoutchat.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //Closes the coffeechat page
  $scope.cancelCoffeeChat = function () {

    $scope.modal.hide();
  }



  //Opens the coffeechat page
  $scope.openCoffeeChat = function() {
    $ionicModal.fromTemplateUrl('templates/coffeechat.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //Closes the coffeechat page
  $scope.cancelCocktailChat = function () {

    $scope.modal.hide();
  }



  //Opens the coffeechat page
  $scope.openCocktailChat = function() {
    $ionicModal.fromTemplateUrl('templates/cocktailchat.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };



  //logout function
  $scope.logOut = function () {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Please confirm?',
      template: 'Are you  sure you want to logout?',
      cancelText:'Cancel',
      okText: 'Logout'
    })
    //Confirm to logout code
    confirmPopup.then(function(code) {
      if(code) {
        console.log('Yes');
        auth.signout();
        store.remove('token');
        store.remove('profile');
        store.remove('refreshToken');
        $state.go('login');
      } else {
        console.log('No');
      }
    });
  }

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    if ($scope.modal) {
      $scope.modal.remove();
    }
  });

  //Loads the Upcoming Events into an array and then displays them
  var events = EventsService.$asArray();
  events.$loaded().then(function () {
    $scope.today = events[new Date().getDay()];
  });

})

//Events controller
.controller('EventsCtrl', function ($scope, EventsService) {

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var day = new Date().getDay();
  var index = 0;
  $scope.events = EventsService.$asArray();

  $scope.events.$loaded().then(function () {
    while (day != index && index < 7) {
      $scope.events.push($scope.events.shift());
      index++;
    }
  });
})

//Baltika Image gallery controller
.controller('BaltikaCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'img/bare.png',
      	'msg' : ''
    	}, {
        'src' : 'img/beerImage.png',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];



    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])

//Bulmers Image gallery controller
.controller('BulmersCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'This was easier than expected'
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];

    $ionicModal.fromTemplateUrl('image-modal2.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])

//Guinness Image gallery controller
.controller('GuinnessCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'Pint of Guinness '
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];

    $ionicModal.fromTemplateUrl('image-modal3.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])
//Guinness Image gallery controller
.controller('CocktailsCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'Beautiful Cocktails '
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];

    $ionicModal.fromTemplateUrl('image-modal4.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])
//Coffees Image gallery controller
.controller('CoffeesCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'Pictures of delicious coffee'
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];

    $ionicModal.fromTemplateUrl('image-modal5.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])
//Coffees Image gallery controller
.controller('SandwichesCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'Tasty'
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];

    $ionicModal.fromTemplateUrl('image-modal6.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])

//Order now controller
.controller('FoodCtrl', function ($scope, auth, $cordovaLocalNotification, $ionicListDelegate, $ionicLoading, $ionicModal, $ionicPopup, MenuService, OrderService) {


  $scope.auth = auth;
  $scope.postCustomer = auth.profile.name;
  $scope.postCustomerPic = auth.profile.picture;


  $scope.devList =[
   {name: "Table 1", id:"1"},
   {name: "Table 2", id:"2"},
   {name: "Table 3", id:"3"},
   {name: "Table 4", id:"4"},
];


  $scope.orders = OrderService;

  $scope.order = {
    items: [],
    total: 0,
    table: []
  };

  //This sends the order displays the submitted order message
  $scope.sendOrder = function (order) {
    $scope.orders.$add({content: $scope.order,
  //Posts name and picture of the user who sent order
      Customer:$scope.postCustomer,
      CustomerPic:$scope.postCustomerPic});

    $ionicPopup.alert({
      title: 'Order submitted',
      template: 'Your order will be delieved to your table in 5 minutes',
    }).then(function (code) {
      $scope.modal.hide();
      console.log("This is logged" , $scope.order);
    });
    var alarmTime = new Date();
       alarmTime.setSeconds(alarmTime.getSeconds() + 5);
       $cordovaLocalNotification.add({
           id: "1234",
           date: alarmTime,
           message: "Your order should be arriving any second now. Enjoy!!",
           title: "Thank you for the order",
           autoCancel: true
       }).then(function () {
           console.log("The notification has been set");
       });
  }

  //This opens the preview order page
  $scope.openPreview = function() {
    $ionicModal.fromTemplateUrl('templates/preview.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //This cancels the preview order page
  $scope.cancelPreview = function () {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    if ($scope.modal) {
      $scope.modal.remove();
    }
  });



  $scope.add = function (item) {
    $ionicListDelegate.closeOptionButtons();
    $scope.order.items.push(angular.copy(item));
    $scope.order.total += item.price;
  };

  $scope.remove = function (index) {
    $scope.order.total -= $scope.order.items[index].price;
    $scope.order.items.splice(index, 1);
  };

  $ionicLoading.show({
    template: '<span class="icon spin ion-loading-d"></span> Loading menu'
  });

  $scope.menu = MenuService.$asArray();
  $scope.menu.$loaded().then(function () {
    $ionicLoading.hide();
  });

})
//End of the order controller
//Image gallery

.controller('MediaCtrl', function($scope, $ionicModal) {

  $scope.allImages = [{
      'src' : 'img/club.jpg'
  }, {
      'src' : 'img/come.jpg'
  },
    {
      'src' : 'img/baltika1.jpg'
  }];

  $scope.allImages1 = [{
        'src' : 'img/bulmers2.jpg'
    }, {
        'src' : 'img/cappuccino.jpg'
    },{
        'src' : 'img/del4.jpg'
    }];

    $scope.allImages2 = [{
          'src' : 'img/cocktail.jpg'
      }, {
          'src' : 'img/dun.jpg'
      },{
          'src' : 'img/guinness2.jpg'
      }];

      $scope.allImages3 = [{
            'src' : 'img/cocktail.jpg'
        }, {
            'src' : 'img/dun.jpg'
        },{
            'src' : 'img/guinness2.jpg'
        }];


$scope.showImages = function(index) {
      $scope.activeSlide = index;
      $scope.showModal('templates/image-popover.html');
  }

  $scope.clipSrc = 'img/coffee.MOV';

$scope.playVideo = function() {
    $scope.showModal('templates/video-popover.html');
}

$scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
      });
  }
  // Close the modal
  $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
  };
})
//End of image gallery
//Staff comments controller
.controller('staffController', function($scope, auth, $ionicModal, $ionicPopup, $state, store, StaffCommentsService, $rootScope) {

  $scope.auth = auth;
  $scope.postAuthor = auth.profile.name;
  $scope.postAuthorPic = auth.profile.picture;

  var message = {
  rating: 5
};

//This is the start of the comments
$scope.comments = StaffCommentsService;

$scope.comment = {};

$scope.comment = angular.copy(message);

//Sends the comments
$scope.addComment = function(comment) {
  $scope.comments.$add({message: $scope.comment,
                        postAuthor:$scope.postAuthor,
                        postAuthorPic:$scope.postAuthorPic});
  //we reset the text input field to an empty string
  $scope.comment.theComment = "";

};

//This is the function that displays the message when comments have been sent
$scope.sendComments = function() {

  console.log("This is logged" , $scope.comment);
  // Send comment
  $scope.cancelComments();
  $ionicPopup.alert({
    title: 'Thank you!',
    template: 'We appreciate your comments!',
    okText: 'Close'

  });
};

//Closes the comments page
$scope.cancelComments = function () {

  $scope.modal.hide();
}



//Opens the comments page

$scope.openComments = function() {
  $ionicModal.fromTemplateUrl('templates/staffcomments.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });
};

})
//Beer chat controller
.controller('chatController', ["$scope", "beerChat", function($scope, beerChat ) {


  $scope.messages = beerChat;
    //Set messages to chatMessages factory which returns the firebase data
    var alternate,
      isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

      //Initialize message object
      $scope.message = {};
      $scope.data = {};
      $scope.myId = '12345';

    //Add message to the firebase data
    $scope.addMessage = function(message) {

      alternate = !alternate;

      userId: alternate ? '12345' : '54321';

      $scope.messages.$add({content: message});


      //we reset the text input field to an empty string
      text:$scope.message.theMessage = "";

    };

}])
//End of beer chat controller
//Cider chat controller
.controller('chatController1', ["$scope", "ciderChat", function($scope, ciderChat ) {
    //Set messages to chatMessages factory which returns the firebase data
    $scope.messages = ciderChat;

    //Initialize message object
    $scope.message = {};

    //Add message to the firebase data
    $scope.addMessage = function(message) {
      $scope.messages.$add({content: message});
      //we reset the text input field to an empty string
      $scope.message.theMessage = "";
    };

}])
//end of cider chat
//Stout chat controller
.controller('chatController2', ["$scope", "stoutChat", function($scope, stoutChat ) {
    //Set messages to chatMessages factory which returns the firebase data


    $scope.messages = stoutChat;

    //Initialize message object
    $scope.message = {};

    //Add message to the firebase data
    $scope.addMessage = function(message) {
      $scope.messages.$add({content: message});
      //we reset the text input field to an empty string
      $scope.message.theMessage = "";
    };
}])

//Stout chat controller
.controller('chatController3', ["$scope", "coffeeChat", function($scope, coffeeChat ) {
    //Set messages to chatMessages factory which returns the firebase data


    $scope.messages = coffeeChat;

    //Initialize message object
    $scope.message = {};

    //Add message to the firebase data
    $scope.addMessage = function(message) {
      $scope.messages.$add({content: message});
      //we reset the text input field to an empty string
      $scope.message.theMessage = "";
    };
}])

//Stout chat controller
.controller('chatController4', ["$scope", "cocktailChat", function($scope, cocktailChat ) {
    //Set messages to chatMessages factory which returns the firebase data


    $scope.messages = cocktailChat;

    //Initialize message object
    $scope.message = {};

    //Add message to the firebase data
    $scope.addMessage = function(message) {
      $scope.messages.$add({content: message});
      //we reset the text input field to an empty string
      $scope.message.theMessage = "";
    };
}])

.controller('ReservationController', function($scope, $ionicModal, $templateCache, auth, ReservationService, $ionicPopup){

      $scope.currentDate = new Date();

      $scope.description = "Please fill out the details below for your reservation. Thank you"

      $scope.reservations = ReservationService;

      $scope.user = {
        Name: "Joe Bloggs",
        Age: 18,
        email: "example@example.com",
        rating: 50,
        choice: "Band",
        food: "No",
        date: [],
        vegeterian: "Yes",
        message: "We need......."

      }




      $scope.settingsList = [
        { text: "Vegeterian?", checked: false }
      ];

      $scope.sendReservation = function(user){
        $scope.reservations.$add({content: $scope.user});

        $ionicPopup.alert({
            title: 'Reservation submitted',
            template: 'We will send you a message to confirm your booking',
            }).then(function (code) {
              $scope.modal.hide();
              console.log("This is logged" , $scope.user);
            });
      }


      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal){
        $scope.modal = modal
      })

      $scope.openModal = function(){
        console.log("Success")

        $scope.modal.show()
      }

      $scope.closeModal = function(){
        $scope.modal.hide()
      }

      $scope.$on('$destroy', function() {
       $scope.modal.remove()
     });

});
