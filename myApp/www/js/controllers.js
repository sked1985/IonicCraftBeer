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

//tour controller. This controls the slide show at the very start of the application
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

//Side menu controller. This controls the swiping of the applications menu.
.controller('NavCtrl', function($scope, auth, $state, store, $ionicSideMenuDelegate) {

  //This code shows the menu when you toggle the icon on the left
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  //This is required to display the user profile picture in the side menu
  $scope.auth = auth;
  $scope.data = {};
})
//Controller for the tabs.
.controller('TabsCtrl', function($scope) {
})
//Home Page controller. This is the main controller in the application. Very important.
.controller('HomeCtrl', function($scope, $cordovaSocialSharing, auth, $http, $timeout, $ionicModal, $ionicActionSheet, $ionicLoading, $ionicPopup, EventsService, $state, store, CommentsService, $rootScope) {

      //This code uses auth0 to identify a user when they send a comment to the craft beer bar.
      $scope.auth = auth;
      $scope.postReviewer = auth.profile.name;
      $scope.postReviewerPic = auth.profile.picture;
      $scope.data = {};

      //This is the start of the comments
      var message = {
        rating: 5
      };

      //connects the comments to the comments service
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

      //Closes the about page
      $scope.cancelAbout = function () {
        $scope.modal.hide();
      }

      //Opens the about page
      $scope.openAbout = function() {
        $ionicModal.fromTemplateUrl('templates/about.html', {
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
             { text: '<i class="icon ion-social-twitter calm"></i> Share on Twitter' },
             { text: '<i class="icon ion-social-facebook royal"></i> Share on Facebook' },
             { text: '<i class="icon ion-ios7-information-outline dark"></i>&nbsp;More information'}
           ],
           destructiveText: 'Cancel',
           buttonClicked: function (index) {
            if (index === 0) {
              $cordovaSocialSharing.canShareVia("twitter", "Check it out").then(function(result) {
                $cordovaSocialSharing.shareViaTwitter("Check out this amazing drink, It` delicious'!!!!!!!'https://craftbeerproject.firebaseapp.com'");
            }, function(error) {
                alert("Cannot share on Twitter. Have you the application instlled?");
            });
            }
            if (index === 1) {
              $cordovaSocialSharing
          .shareViaFacebook("Check out this amazing drink, It` delicious'!!!!!!!'https://craftbeerproject.firebaseapp.com'")
          .then(function(result) {
            // Success!
          }, function(err) {
            alert("Cannot share on Facebook. Have you the application installed?");
          });
            }
            if (index === 2) {
              $scope.showModal();
            }
            return true;
          }
        });
      };
      //This shows the info modal on the items page
      $scope.showModal = function() {
        $ionicModal.fromTemplateUrl('templates/info-chart.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
      //Hides the info modal
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
      //Closes the sandwichchat page
      $scope.cancelSandwichChat = function () {
        $scope.modal.hide();
      }
      //Opens the sandwichat page
      $scope.openSandwichChat = function() {
        $ionicModal.fromTemplateUrl('templates/sandwichchat.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };

      //logout function om profile page
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
      //Loads the Upcoming Events into an array and then displays them to the user on the home page
      var events = EventsService.$asArray();
      events.$loaded().then(function () {
        $scope.today = events[new Date().getDay()];
      });

})
//End of home page controller
//Events controller. This displays all the events from the database on the upcoming events page.
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
//Beer Image gallery controller
.controller('BaltikaCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {
  	$scope.aImages = [{
      	'src' : 'img/bare.png',
      	'msg' : ''
    	}, {
        'src' : 'img/beer-bottle1.png',
        'msg' : ''
      }, {
        'src' : 'img/corona3.png',
        'msg' : ''
    }];
    $ionicModal.fromTemplateUrl('image-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    //Opens the image modal
    $scope.openModal = function() {
      $scope.modal.show();
      $ionicSlideBoxDelegate.update();
    };
    //Close the image modal
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

//ciders Image gallery controller
.controller('BulmersCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {
  	$scope.aImages = [{
      	'src' : 'img/ciders.png',
      	'msg' : 'We have a wide selection'
    	}, {
        'src' : 'img/ciders1.png',
        'msg' : 'Perfect in Autumn'
      }, {
        'src' : 'img/ciders3.png',
        'msg' : 'Mage with the freshest apples'
    }];
    $ionicModal.fromTemplateUrl('image-modal2.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
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
.controller('GuinnessCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate){
  	$scope.aImages = [{
      	'src' : 'img/2268695-GuinessPint.png',
      	'msg' : 'Best of Guinness '
    	}, {
        'src' : 'img/trouble1.png',
        'msg' : 'Craft stouts available'
      }, {
        'src' : 'img/BelgianStout.png',
        'msg' : 'Try it now'
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
      	'src' : 'img/cocktail3-md.png',
      	'msg' : 'Beautiful Cocktails '
    	}, {
        'src' : 'img/passioncaipirinhaPNG.png',
        'msg' : 'Tasty in the Summer'
      }, {
        'src' : 'img/mardigrasPNG.png',
        'msg' : 'Ask our staff'
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
      	'src' : 'img/Coffee_with_Hearts_Transparent_PNG_Picture.png',
      	'msg' : 'Delicious coffee available'
    	}, {
        'src' : 'img/paper-coffee-cup-512x512.png',
        'msg' : 'Feel free to have it to go'
      }, {
        'src' : 'img/Coffee_bean_transparent.png',
        'msg' : 'Made with the finest coffee beans'
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
//Sandwiches Image gallery controller
.controller('SandwichesCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {
  	$scope.aImages = [{
      	'src' : 'img/Grilled-Chicken-Sandwich.png',
      	'msg' : 'Tasty'
    	}, {
        'src' : 'img/UzxWHoq.png',
        'msg' : 'Made with the freshest ingredients'
      }, {
        'src' : 'img/buter21.png',
        'msg' : 'Goes great with a beer'
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

//Order now controller. This is responsible for sending the users order to Firebase.
.controller('OrderCtrl', function ($scope, auth, $cordovaLocalNotification, $ionicListDelegate, $ionicLoading, $ionicModal, $ionicPopup, MenuService, OrderService) {

      //This code is used to identify the user who submits the order
      $scope.auth = auth;
      $scope.postCustomer = auth.profile.name;
      $scope.postCustomerPic = auth.profile.picture;

      //This is the code that allows a user to select a table before ordering
      $scope.devList =[
       {name: "Table 1", id:"1"},
       {name: "Table 2", id:"2"},
       {name: "Table 3", id:"3"},
       {name: "Table 4", id:"4"},
    ];

      //Connects the order to the order service
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
      //Displays a message telling the user their order will be ready in 5 minutes
          $ionicPopup.alert({
            title: 'Order submitted',
            template: 'Your order will be delieved to your table in 5 minutes',
            type: 'button-energized',
          }).then(function (code) {
            $scope.modal.hide();
            console.log("This is logged" , $scope.order);
          });
          //Activates a notification in the users phone that tells the user their order is on its way
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
          //This function allows prssing the add button to add the item to the final order
          $scope.add = function (item) {
            $ionicListDelegate.closeOptionButtons();
            $scope.order.items.push(angular.copy(item));
            $scope.order.total += item.price;
          };
          //This function allows prssing the remove button to remove the item from the final order
          $scope.remove = function (index) {
            $scope.order.total -= $scope.order.items[index].price;
            $scope.order.items.splice(index, 1);
          };
          //This displays the loading icon befor the informayion is pulled in from firebase
          $ionicLoading.show({
            template: '<span class="icon spin ion-loading-d"></span> Loading menu'
          });
          //This displays the menu on the order page
          $scope.menu = MenuService.$asArray();
          $scope.menu.$loaded().then(function () {
            $ionicLoading.hide();
          });
})
//End of the order controller
//Image gallery on the main menu
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
      //Displays the video on the image page
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
    //This displays who sent the message
    $scope.auth = auth;
    $scope.postAuthor = auth.profile.name;
    $scope.postAuthorPic = auth.profile.picture;

  //This is the scope of the message page
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
//Popular controller
.controller('popularController', ["$scope", "FavoritesService", function($scope, FavoritesService ) {
    //Set messages to the favorites service
    $scope.messages = FavoritesService;
    //Initialize message object
    $scope.message = {};
    //Add message to the firebase data
    $scope.addMessage = function(message) {
      $scope.messages.$add({content: message});
      //we reset the text input field to an empty string
      $scope.message.theMessage = "";
    };
}])
//Beer chat controller
.controller('chatController', ["$scope", "beerChat", function($scope, beerChat ) {
  //Sets the messages to the beerchat service
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
//Stout chat controller
.controller('chatController5', ["$scope", "sandwichChat", function($scope, sandwichChat ) {
    //Set messages to chatMessages factory which returns the firebase data
    $scope.messages = sandwichChat;
    //Initialize message object
    $scope.message = {};
    //Add message to the firebase data
    $scope.addMessage = function(message) {
      $scope.messages.$add({content: message});
      //we reset the text input field to an empty string
      $scope.message.theMessage = "";
    };
}])
//This is the start of the controller that allows the user to make a reservation
.controller('ReservationController', function($scope, $ionicPopup,   $location, $ionicModal, $templateCache, auth, ReservationService, $ionicPopup){
      //Set the current date on the datepicker
      $scope.currentDate = new Date();
      //This is the description at the top of the page
      $scope.description = "Please fill out the details below for your reservation. Thank you"
      //Connects the data on the reservation page to the reservation service
      $scope.reservations = ReservationService;
      //The reservation form details captured here
      $scope.user = {
        Name: "",
        Age: "",
        contactnumber: "",
        bookeremail: "",
        type: "18th",
        people: 50,
        entertainment: "Band",
        food: "No",
        partyDate: "",
        vegeterian: "Yes",
        extras: ""
      }
      //Invite details captured here
      $scope.invite ={
        FirstName:"",
        LastName:"",
        telephone:""
      }
      //Toggle on reservation
      $scope.settingsList = [
        { text: "Vegeterian?", checked: false }
      ];
      //Toggle on invite
      $scope.inviteList = [
        { text: "Send Invitation by Text?", checked: false }
      ];
      $scope.inviteList1 = [
        { text: "Send Invitation by Email?", checked: false }
      ];
      //This sends the reservation up into Firebase
      $scope.sendReservation = function(user){
        $scope.reservations.$add({content: $scope.user});
        //Displays the message that confirms reservation has been made
        var confirmPopup = $ionicPopup.confirm({
            title: 'Reservation submitted',
            template: 'We will send you a message to confirm your booking. Would you like to invite friends?',
            cancelText:'No',
            okText: 'Yes'
            })
            confirmPopup.then(function (code) {
              if(code){
                console.log('Yes');
                $scope.modal.hide();
                $scope.modal.remove();
                $scope.showModal();
              }else{
                console.log('No');
                $scope.modal.hide();
                $scope.modal.remove();
              }
            });
      }
        //This is the modal that shows the invite friends page
        $scope.showModal = function() {
          $ionicModal.fromTemplateUrl('templates/invite.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
          });
        };
        //Closes the modal on the invite friends
        $scope.hideModal = function () {
          $scope.modal.hide();
        };
        //This opens the final reservation page
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
     //This is the function that displays the message when Invite have been sent
     $scope.sendInvite = function() {
       console.log("This is logged");
       // Send comment
       $ionicPopup.alert({
         title: 'Sent!',
         template: 'Your invitation has been sent!',
         okText: 'Close'
       }).then(function (modal) {
     // Login with code
     $scope.modal.hide();
   });
};
});
//End of the applications controllers
