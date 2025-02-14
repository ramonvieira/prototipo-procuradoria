'use strict';

angular.module('bthtimepicker', []).constant('timepickerConfig', {
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  showMeridian: false,
  meridians: null,
  readonlyInput: false,
  mousewheel: true,
  arrowkeys: true,
  showSpinners: true,
  dateFormat: 'hh:mm:ss',
})
.controller('BthTimepickerController', ['$scope', '$attrs', '$parse', '$log', '$locale', 'timepickerConfig', 'dateFilter', function($scope, $attrs, $parse, $log, $locale, timepickerConfig, dateFilter) {
  var selected = new Date(),
      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
      meridians = angular.isDefined($attrs.meridians) ? $scope.$parent.$eval($attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS;
  var currentDate;

  this.init = function( ngModelCtrl_, inputs ) {
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;

    ngModelCtrl.$formatters.unshift(function (modelValue) {
      return modelValue ? new Date( modelValue ) : null;
    });

    var hoursInputEl = inputs.eq(0),
        minutesInputEl = inputs.eq(1),
        secondsInputEl = inputs.eq(2)
        ;

    var mousewheel = angular.isDefined($attrs.mousewheel) ? $scope.$parent.$eval($attrs.mousewheel) : timepickerConfig.mousewheel;
    if ( mousewheel ) {
      this.setupMousewheelEvents( hoursInputEl, minutesInputEl,secondsInputEl );
    }

    var arrowkeys = angular.isDefined($attrs.arrowkeys) ? $scope.$parent.$eval($attrs.arrowkeys) : timepickerConfig.arrowkeys;
    if (arrowkeys) {
      this.setupArrowkeyEvents( hoursInputEl, minutesInputEl,secondsInputEl );
    }

    $scope.readonlyInput = angular.isDefined($attrs.readonlyInput) ? $scope.$parent.$eval($attrs.readonlyInput) : timepickerConfig.readonlyInput;
    this.setupInputEvents( hoursInputEl, minutesInputEl,secondsInputEl );

  };

  var hourStep = timepickerConfig.hourStep;
  if ($attrs.hourStep) {
    $scope.$parent.$watch($parse($attrs.hourStep), function(value) {
      hourStep = parseInt(value, 10);
    });
  }

  var minuteStep = timepickerConfig.minuteStep;
  if ($attrs.minuteStep) {
    $scope.$parent.$watch($parse($attrs.minuteStep), function(value) {
      minuteStep = parseInt(value, 10);
    });
  }

  var secondStep = timepickerConfig.secondStep;
  if ($attrs.secondStep) {
    $scope.$parent.$watch($parse($attrs.secondStep), function(value) {
      secondStep = parseInt(value, 10);
    });
  }
/*
  $scope.showHours = timepickerConfig.showHours;
  if ($attrs.showHours) {
    $scope.$parent.$watch($parse($attrs.showHours), function(value) {
      $scope.showHours = value;
    });
  }

  $scope.showSeconds = timepickerConfig.showSeconds;
  if ($attrs.showSeconds) {
    $scope.$parent.$watch($parse($attrs.showSeconds), function(value) {
      $scope.showSeconds = value;
    });
  }
*/

  $scope.dateFormat = timepickerConfig.dateFormat;
  if ($attrs.dateFormat) {
    $scope.$parent.$watch($parse($attrs.dateFormat), function(value) {
      $scope.dateFormat = value;
      $scope.showSeconds = $scope.dateFormat.indexOf('ss') >= 0;
      $scope.showHours = $scope.dateFormat.indexOf('HH') >= 0;
    });
  }

  // 12H / 24H mode
  $scope.showMeridian = timepickerConfig.showMeridian;
  if ($attrs.showMeridian) {
    $scope.$parent.$watch($parse($attrs.showMeridian), function(value) {
      $scope.showMeridian = !!value;

      if ( ngModelCtrl.$error.time ) {
        // Evaluate from template
        var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate(), seconds = getSecondsFromTemplate();
        if (angular.isDefined( hours ) && angular.isDefined( minutes ) && angular.isDefined( seconds )) {
          selected.setHours( hours );
          refresh();
        }
      } else {
        updateTemplate();
      }
    });
  }

  // Get $scope.hours in 24H mode if valid
  function getHoursFromTemplate ( ) {
    var hours = parseInt( $scope.hours, 10 );
    var valid = ( $scope.showMeridian ) ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
    if ( !valid ) {
      return undefined;
    }

    if ( $scope.showMeridian ) {
      if ( hours === 12 ) {
        hours = 0;
      }
      if ( $scope.meridian === meridians[1] ) {
        hours = hours + 12;
      }
    }
    return hours;
  }

  function getMinutesFromTemplate() {
    var minutes = parseInt($scope.minutes, 10);
    return ( minutes >= 0 && minutes < 60 ) ? minutes : undefined;
  }

  function getSecondsFromTemplate() {
    var seconds = parseInt($scope.seconds, 10);
    return ( seconds >= 0 && seconds < 60 ) ? seconds : undefined;
  }

  function pad( value ) {
    return ( angular.isDefined(value) && value.toString().length < 2 ) ? '0' + value : value.toString();
  }

  // Respond on mousewheel spin
  this.setupMousewheelEvents = function( hoursInputEl, minutesInputEl, secondsInputEl ) {
    var isScrollingUp = function(e) {
      if (e.originalEvent) {
        e = e.originalEvent;
      }
      //pick correct delta variable depending on event
      var delta = (e.wheelDelta) ? e.wheelDelta : -e.deltaY;
      return (e.detail || delta > 0);
    };

    hoursInputEl.bind('mousewheel wheel', function(e) {
      $scope.$apply( (isScrollingUp(e)) ? $scope.incrementHours() : $scope.decrementHours() );
      e.preventDefault();
    });

    minutesInputEl.bind('mousewheel wheel', function(e) {
      $scope.$apply( (isScrollingUp(e)) ? $scope.incrementMinutes() : $scope.decrementMinutes() );
      e.preventDefault();
    });

    secondsInputEl.bind('mousewheel wheel', function(e) {
      $scope.$apply( (isScrollingUp(e)) ? $scope.incrementSeconds() : $scope.decrementSeconds() );
      e.preventDefault();
    });

  };

  // Respond on up/down arrowkeys
  this.setupArrowkeyEvents = function( hoursInputEl, minutesInputEl, secondsInputEl ) {
    hoursInputEl.bind('keydown', function(e) {
      if ( e.which === 38 ) { // up
        e.preventDefault();
        $scope.incrementHours();
        $scope.$apply();
      }
      else if ( e.which === 40 ) { // down
        e.preventDefault();
        $scope.decrementHours();
        $scope.$apply();
      }
    });

    minutesInputEl.bind('keydown', function(e) {
      if ( e.which === 38 ) { // up
        e.preventDefault();
        $scope.incrementMinutes();
        $scope.$apply();
      }
      else if ( e.which === 40 ) { // down
        e.preventDefault();
        $scope.decrementMinutes();
        $scope.$apply();
      }
    });

    secondsInputEl.bind('keydown', function(e) {
      if ( e.which === 38 ) { // up
        e.preventDefault();
        $scope.incrementSeconds();
        $scope.$apply();
      }
      else if ( e.which === 40 ) { // down
        e.preventDefault();
        $scope.decrementSeconds();
        $scope.$apply();
      }
    });

  };

  this.setupInputEvents = function( hoursInputEl, minutesInputEl, secondsInputEl ) {
    if ( $scope.readonlyInput ) {
      $scope.updateHours = angular.noop;
      $scope.updateMinutes = angular.noop;
      $scope.updateSeconds = angular.noop;
      return;
    }

    var invalidate = function(invalidHours, invalidMinutes, invalidSeconds) {
      ngModelCtrl.$setViewValue( null );
      ngModelCtrl.$setValidity('time', false);
      if (angular.isDefined(invalidHours)) {
        $scope.invalidHours = invalidHours;
      }
      if (angular.isDefined(invalidMinutes)) {
        $scope.invalidMinutes = invalidMinutes;
      }
      if (angular.isDefined(invalidSeconds)) {
        $scope.invalidSeconds = invalidSeconds;
      }
    };

    $scope.updateHours = function() {
      var hours = getHoursFromTemplate();

      if ( angular.isDefined(hours) ) {
        selected.setHours( hours );
        refresh( 'h' );
      } else {
        invalidate(true);
      }
    };

    hoursInputEl.bind('blur', function(e) {
      if ( !$scope.invalidHours && $scope.hours < 10) {
        $scope.$apply( function() {
          $scope.hours = pad( $scope.hours );
        });
      }
    });

    $scope.updateMinutes = function() {
      var minutes = getMinutesFromTemplate();

      if ( angular.isDefined(minutes) ) {
        selected.setMinutes( minutes );
        refresh( 'm' );
      } else {
        invalidate(undefined, true);
      }
    };

    minutesInputEl.bind('blur', function(e) {
      if ( !$scope.invalidMinutes && $scope.minutes < 10 ) {
        $scope.$apply( function() {
          $scope.minutes = pad( $scope.minutes );
        });
      }
    });

    $scope.updateSeconds = function() {
      var seconds = getSecondsFromTemplate();

      if ( angular.isDefined(seconds) ) {
        selected.setSeconds( seconds );
        refresh( 's' );
      } else {
        invalidate(undefined, true);
      }
    };

    secondsInputEl.bind('blur', function(e) {
      if ( !$scope.invalidSeconds && $scope.seconds < 10 ) {
        $scope.$apply( function() {
          $scope.seconds = pad( $scope.seconds );
        });
      }
    });

  };

  this.render = function() {

    var date = ngModelCtrl.$viewValue;
    var dtInvalid = false;

    if ( isNaN(date) ) {
      var fullHour = ngModelCtrl.$modelValue;
      var hour = fullHour.substr(0,2), minute = fullHour.substr(3,2), second = fullHour.substr(6,2);

      dtInvalid = minute < 0 || minute > 59 ||second < 0 || second > 59;
      date = new Date( '1970', '01', '01', hour, minute, second,'0' );

      if ( isNaN(date) ) {
        ngModelCtrl.$setValidity('time', false);
        $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
      } else {
        if ( date ) {
          selected = date;
        }
      }
    } else {
        if ( date ) {
          selected = date;
          refresh();
        }
    }
    makeValid();
    updateTemplate();
    if (date !== null) refresh();
  };

  // Call internally when we know that model is valid.
  function refresh( keyboardChange ) {
    makeValid();
    var display = dateFilter(new Date(selected), $scope.dateFormat);
    ngModelCtrl.$setViewValue( display );
    updateTemplate( keyboardChange );
  }

  function makeValid() {
    ngModelCtrl.$setValidity('time', true);
    $scope.invalidHours = false;
    $scope.invalidMinutes = false;
    $scope.invalidSeconds = false;
  }

  function updateTemplate( keyboardChange ) {
    var hours = selected.getHours(), minutes = selected.getMinutes(), seconds = selected.getSeconds();

    if ( $scope.showMeridian ) {
      hours = ( hours === 0 || hours === 12 ) ? 12 : hours % 12; // Convert 24 to 12 hour system
    }

    $scope.hours = keyboardChange === 'h' ? hours : pad(hours);
    if (keyboardChange === 'h' || keyboardChange === 's' || keyboardChange === undefined) {
      $scope.minutes = pad(minutes);
    }

    if (keyboardChange === 'h' || keyboardChange === 'm' || keyboardChange === undefined) {
      $scope.seconds = pad(seconds);
    }

    $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
  }

  function addSeconds( seconds ) {
    var dt = new Date( selected.getTime() + seconds  );
    selected.setHours( dt.getHours(), dt.getMinutes(), dt.getSeconds() );
    refresh();
  }
  
  $scope.showSpinners = angular.isDefined($attrs.showSpinners) ?
    $scope.$parent.$eval($attrs.showSpinners) : timepickerConfig.showSpinners;
  
  $scope.incrementHours = function() {
    addSeconds( hourStep * 3600000 );
  };
  $scope.decrementHours = function() {
    addSeconds( - hourStep * 3600000 );
  };
  $scope.incrementMinutes = function() {
    addSeconds( minuteStep * 60000);
  };
  $scope.decrementMinutes = function() {
    addSeconds( - minuteStep * 60000);
  };
  $scope.incrementSeconds = function() {
    addSeconds( secondStep * 1000);
  };
  $scope.decrementSeconds = function() {
    addSeconds( - secondStep * 1000 );
  };
  $scope.toggleMeridian = function() {
    addSeconds( 12 * 3600000 * (( selected.getHours() < 12 ) ? 1 : -1) );
  };

  $scope.select = function (date) {
      if (date == 'now') {
          var now = new Date();
          if (angular.isDate(ngModelCtrl.$modelValue)) {
              date = new Date(ngModelCtrl.$modelValue);
              date.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
              date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
          } else {
              date = now;
          }
      }
      $scope.dateSelection(date);
      if (date!==null) {
        refresh()
      }
  };

  $scope.dateSelection = function (dt) {
      if (currentDate && currentDate !== null && ($scope.date !== null || dt || dt != null)) {
        // dt will not be undefined if the now or today button is pressed
        if (dt && dt != null) {
            currentDate.setHours(dt.getHours());
            currentDate.setMinutes(dt.getMinutes());
            currentDate.setSeconds(dt.getSeconds());
            currentDate.setMilliseconds(dt.getMilliseconds());
            dt = new Date(currentDate);
        } else {
            currentDate.setHours($scope.date.getHours());
            currentDate.setMinutes($scope.date.getMinutes());
            currentDate.setSeconds($scope.date.getSeconds());
            currentDate.setMilliseconds($scope.date.getMilliseconds());
        }
      }
      if (angular.isDefined(dt)) {
         $scope.date = dt;
      }

      // store currentDate
      currentDate = $scope.date;

      ngModelCtrl.$setViewValue($scope.date);
      ngModelCtrl.$render();

  };


}]).directive('bthTimepicker', ['$document','$position', function ( $document, $position ) {
  return {
    restrict: 'EA',
    require: ['bthTimepicker', '?^ngModel'],
    controller:'BthTimepickerController',
    replace: true,
    scope: {
            isOpen: "=?",
            showButtonBar: "=?",
            nowText: '@',
            clearText: '@',
            closeText: '@',
            enableTime: '@',
            nowText: '@',
            clearText: '@',
            closeText: '@'
    },
    templateUrl: 'common/directives/bthtimepicker/bthtimepicker.html',
    link: function(scope, element, attrs, ctrls) {
      var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if ( ngModelCtrl ) {
        timepickerCtrl.init( ngModelCtrl, element.find('input') );
      }

      scope.nowText = scope.nowText || 'Agora';
      scope.clearText = scope.clearText || 'Limpar';
      scope.closeText = scope.closeText || 'Fechar';

      scope.getText = function (key) {
          return scope[key + 'Text'];
      };

      scope.close = function () {
          scope.isOpen = false;
          element[0].focus();
      };
    }
  };
}]);
