angular.module('starter.controllers', [])

//Login controller
.controller('LoginCtrl', function($scope, auth, $state, store) {
    auth.signin({
      closable: false,
    // This asks for the refresh token
    // So that the user never has to log in again
    authParams: {
      scope: 'openid offline_access'
    }
  }, function(profile, idToken, accessToken, state, refreshToken) {
    store.set('profile', profile);
    store.set('token', idToken);
    store.set('refreshToken', refreshToken);
    $state.go('tour');
  }, function(error) {
    console.log("There was an error logging in", error);
  });
})
//Side menu controller
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
//Controller for the tabs
.controller('TabsCtrl', function($scope, User) {
  $scope.favCount = User.favoriteCount;

  $scope.enteringFavorites = function(){
    User.newFavorites = 0;
  }
})
//Home Page controller
.controller('HomeCtrl', function($scope, auth, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, EventsService, $state, store, CommentsService, $rootScope) {

  $scope.data = {}

   // This is the help button on the items page alert
   $scope.showPopup = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Like what you see?',
       template: 'Press the order now button'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
  }

  var message = {
    rating: 5
  };

  //This is the start of the comments
  $scope.comments = CommentsService;

  $scope.comment = {};



  $scope.comment = angular.copy(message);

  //Sends the comments
  $scope.addComment = function(comment) {
    $scope.comments.$add({content: comment});
    //we reset the text input field to an empty string
    $scope.comment.theComment = "";

  };

  //This is the function that displays the message when comments have been sent
  $scope.sendComments = function() {

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
    $ionicModal.fromTemplateUrl('templates/comments.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //logout function
  $scope.logout = function() {
   auth.signout();
   store.remove('token');
   store.remove('profile');
   store.remove('refreshToken');
   $state.go('login');
 }

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    if ($scope.modal) {
      $scope.modal.remove();
    }
  });

  var events = EventsService.$asArray();
  events.$loaded().then(function () {
    $scope.today = events[new Date().getDay()];
  });

})



//Controller for the discover items tabs
  .controller('DiscoverCtrl', function($scope, $timeout, User, $ionicPopup) {

    // An alert dialog
      $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
      title: 'Welcome to the Discover Page!',
      type: 'button-positive',
      template: 'Favorite the ones you like, Skip the ones you hate! Enjoy'
      });
      alertPopup.then(function(res) {
      console.log('Thank you for liking');
      });
      };


    // our first three songs
    $scope.songs = [
       {
          "title":"Fishers",
          "artist":"Beer",
          "image_small":"http://i38.tinypic.com/zx8d1i.jpg",
          "image_large":"http://i38.tinypic.com/zx8d1i.jpg"
       },
       {
          "title":"Guinness",
          "artist":"Stout",
          "image_small":"http://www.redfm.ie/wp-content/uploads/2014/08/guinness1.jpg",
          "image_large":"http://www.redfm.ie/wp-content/uploads/2014/08/guinness1.jpg"
       },
       {
          "title":"Trouble Brewing",
          "artist":"Stout",
          "image_small":"http://thegreenmanstudio.com/wp-content/uploads/2011/11/darkarts.jpg",
          "image_large":"http://thegreenmanstudio.com/wp-content/uploads/2011/11/darkarts.jpg"
       },
       {
          "title":"Club",
          "artist":"Sandwich",
          "image_small":"http://i.huffpost.com/gen/1107767/images/o-CLUB-SANDWICH-facebook.jpg",
          "image_large":"http://i.huffpost.com/gen/1107767/images/o-CLUB-SANDWICH-facebook.jpg"
       },
       {
          "title":"Americano",
          "artist":"Coffee",
          "image_small":"https://ardyssrecipes.files.wordpress.com/2012/12/black_coffee_cup_nice-1680x1050.jpg",
          "image_large":"https://ardyssrecipes.files.wordpress.com/2012/12/black_coffee_cup_nice-1680x1050.jpg"
       },
       {
          "title":"BLT",
          "artist":"Sandwich",
          "image_small":"http://i38.http://upload.wikimedia.org/wikipedia/commons/f/f1/BLT_sandwich_(1).jpg.com/zx8d1i.jpg",
          "image_large":"http://i38.http://upload.wikimedia.org/wikipedia/commons/f/f1/BLT_sandwich_(1).jpg.com/zx8d1i.jpg"
       },
       {
          "title":"Fishers",
          "artist":"Beer",
          "image_small":"https://s-media-cache-ak0.pinimg.com/originals/32/21/6c/32216ccffb6f3f2184a54ce11f537a11.jpg",
          "image_large":"https://s-media-cache-ak0.pinimg.com/originals/32/21/6c/32216ccffb6f3f2184a54ce11f537a11.jpg"
       },
       {
          "title":"Whiskey Sour",
          "artist":"Cocktails",
          "image_small":"http://www.betcheslovethis.com/files/uploads/images/whiskeys.jpg",
          "image_large":"http://www.betcheslovethis.com/files/uploads/images/whiskeys.jpg"
       },
       {
          "title":"Baltika",
          "artist":"Beer",
          "image_small":"http://3.bp.blogspot.com/-rpQ7MkjZURE/T8EoQYBjQJI/AAAAAAAADdk/OKIC67DYSOk/s1600/Zombie+Dust.jpg",
          "image_large":"http://3.bp.blogspot.com/-rpQ7MkjZURE/T8EoQYBjQJI/AAAAAAAADdk/OKIC67DYSOk/s1600/Zombie+Dust.jpg"
       },
       {
          "title":"Dungarven",
          "artist":"Beer",
          "image_small":"http://drinkwiththewench.com/wp-content/uploads/2013/01/12244_10102418352089945_1869374664_n.jpg",
          "image_large":"http://drinkwiththewench.com/wp-content/uploads/2013/01/12244_10102418352089945_1869374664_n.jpg"
       }
    ];

    $scope.currentSong = angular.copy($scope.songs[0]);

    $scope.sendFeedback = function (bool) {
      if(bool) User.addSongToFavorites($scope.currentSong);

     // set variable for the correct animation sequence
     $scope.currentSong.rated = bool;
     $scope.currentSong.hide = true;

     $timeout(function() {
       // $timeout to allow animation to complete before changing to next song
       // set the current song to one of our three songs
       var randomSong = Math.round(Math.random() * ($scope.songs.length - 1));

       // update current song in scope
       $scope.currentSong = angular.copy($scope.songs[randomSong]);

     }, 250);
   }

   $scope.removeSong = function(song, index){
     User.removeSongFromFavorites(song, index);
   }

})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User) {

  $scope.favorites = User.favorites;

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
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'Swipe me to the left. Tap/click to close'
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
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



//ActionSheet controller
.controller('ActionCtrl', ['$scope', '$ionicActionSheet',  function ($scope, $ionicActionSheet) {

  $scope.showOptions = function () {
     var sheet = $ionicActionSheet.show({
       buttons: [
         {text: 'Toggle Favorite'},
         {text: 'Set as Primary'},
         {text: 'Sunrise Sunset Chart'}
       ],
       cancelText: 'Cancel',
       buttonClicked: function (index) {
         if (index === 0) {
           Locations.toggle($stateParams);
         }
         if (index === 1) {
           Locations.primary($stateParams);
         }
         if (index === 2) {
           $scope.showModal();
         }
         return true;
       }
     });
   };

  }
])

//Order now controller
.controller('FoodCtrl', function ($scope, $ionicListDelegate, $ionicLoading, $ionicModal, $ionicPopup, MenuService) {

  $scope.forward = {};

  $scope.sendOrder = function () {
    $ionicPopup.alert({
      title: 'Order submitted',
      template: 'Your order will be delieved to your table in 5 minutes',
    }).then(function (code) {
      $scope.modal.hide();
      console.log("This is logged" , $scope.forward);
    });
  }

  $scope.openPreview = function() {
    $ionicModal.fromTemplateUrl('templates/preview.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.cancelPreview = function () {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    if ($scope.modal) {
      $scope.modal.remove();
    }
  });

  $scope.order = {
    items: [],
    total: 0
  };

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

//Image gallery
.controller('MediaCtrl', function($scope, $ionicModal) {
$scope.allImages = [{
      'src' : 'img/blt.jpg'
  }, {
      'src' : 'img/del2.jpg'
  },{
      'src' : 'img/curim.jpg'
  }, {
      'src' : 'img/cider2.jpg'
  }];

  $scope.allImages1 = [{
        'src' : 'img/cider.jpg'
    }, {
        'src' : 'img/blt2.jpg'
    },{
        'src' : 'img/bulmers.jpg'
    }, {
        'src' : 'img/del4.jpg'
    }];

    $scope.allImages2 = [{
          'src' : 'img/coffee.jpg'
      }, {
          'src' : 'img/cocktail2.jpg'
      },{
          'src' : 'img/del3.jpg'
      }, {
          'src' : 'img/dun.jpg'
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
//Swipe Cards Review functionality
.controller('CardsCtrl', function($scope) {
    var cardTypes = [
        { image: 'img/beer.jpg', title: 'Baltika'},
        { image: 'img/del7.jpg', title: 'Fantastic?'},
        { image: 'img/bagel.jpg', title: 'Bagel'},
        { image: 'img/del1.jpg', title: 'Did you like?'},
        { image: 'img/del2.jpg', title: 'Tasty, No?'},
        { image: 'img/del3.jpg', title: 'Swipe left if no'},
        { image: 'img/del4.jpg', title: 'Surely you like this?'},
        { image: 'img/del5.jpg', title: 'Freshly made'},
        { image: 'img/del6.jpg', title: 'delish'},
        { image: 'img/beer.jpg', title: 'Baltika'},
        { image: 'img/del7.jpg', title: 'Fantastic?'},
        { image: 'img/bagel.jpg', title: 'Bagel'},
        { image: 'img/del1.jpg', title: 'Did you like?'},
        { image: 'img/del2.jpg', title: 'Tasty, No?'},
        { image: 'img/del3.jpg', title: 'Swipe left if no'},
        { image: 'img/del4.jpg', title: 'Surely you like this?'},
        { image: 'img/del5.jpg', title: 'Freshly made'},
        { image: 'img/del6.jpg', title: 'delish'}
    ];

    $scope.cards = [];

    $scope.addCard = function(i) {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }

    for(var i = 0; i < 18; i++) $scope.addCard();

    $scope.cardSwipedLeft = function(index) {
        console.log('Left swipe');
    }

    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe');
    }

    $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
        console.log('Card removed');
    }
})
//End of swipe card functionality
//Countdown controller
.controller('AppCtrl', function($scope, $timeout) {
    $scope.moveButtons = function() {
        var buttons = document.getElementById('buttons');

        move(buttons)
        .ease('in-out')
        .y(200)
        .duration('0.5s')
        .end();
    };
    $scope.blink = function(){
      var bg = document.getElementById('contentBG');

      var highlightBack = move(bg)
      .set('background','#FFFFFF')
      .duration('0.2s')
      .end();

      var highlight = move(bg)
      .set('background', '#B9F6CA')
      .duration('0.2s')
      .then(highlightBack)
      .end();
    };
    $scope.timer = function(){
      if($scope.timerTimeout){
        $timeout.cancel($scope.timerTimeout);
      }
    $scope.time=0;
    $scope.timerTimeout = $timeout(onTimerTimeout,0);
  };
  function onTimerTimeout(){
    $scope.time++;
    var timer = document.getElementById('myTimer');

    move(timer)
    .ease('snap')
    .set('opacity',1)
    .scale(1.4)
    .duration('0s')
    .end();

    move(timer)
    .ease('out')
    .x(150)
    .rotate(140)
    .scale(.1)
    .set('opacity',0)
    .duration('1s')
    .end();
    $scope.timerTimeout = $timeout(onTimerTimeout,1000);
  };
});
