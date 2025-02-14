(function() {

'use strict';
 
angular.module('uiSwitch', []).directive('switch', function(){
	return {
		restrict: 'AE',
		replace: true,
		transclude: true,
		template: function(element, attrs) {
			var html = '';
			html += '<span class=\"switch ' + (attrs.class ? ' ' + attrs.class : '') + '\" ng-class=\"{ checked: '+ attrs.ngModel +' == '+ (attrs.ngTrueValue||true) +' ? true : false}\"';
			html +=   attrs.ngModel ? ' ng-click=\"' + attrs.ngModel + '=' + attrs.ngModel + ' == ' + (attrs.ngTrueValue||true) + '?' + (attrs.ngFalseValue||false) + ':' + (attrs.ngTrueValue||true) + (attrs.ngChange ? '; ' + attrs.ngChange + '()\"' : '\"') : '';
			html += ' >';
			html +=   '<small></small>';
			html +=   '<input type=\"checkbox\" ng-true-value=\"' + (attrs.ngTrueValue||true) + '\" ng-false-value=\"'+(attrs.ngFalseValue||false)+'\"';
			html +=     attrs.id ? ' id=\"' + attrs.id + '\"' : '';
			html +=     attrs.name ? ' name=\"' + attrs.name + '\"' : '';
			html +=     attrs.ngModel ? ' ng-model=\"' + attrs.ngModel + '\"' : '';
			html +=     ' style=\"visibility:hidden;\" />';
			html +=     '<span class=\"switch-text\">'; /*adding new container for switch text*/
			html +=     attrs.on ? '<span class=\"on\">'+attrs.on+'</span>' : ''; /*switch text on value set by user in directive html markup*/
			html +=     attrs.off ? '<span class=\"off\">'+attrs.off + '</span>' : ' ';  /*switch text off value set by user in directive html markup*/
			html += '</span>';
			return html;
		}
	}
});

})();