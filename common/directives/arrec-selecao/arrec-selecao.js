/**
 * Created by darjane.silva on 27/01/2016.
 */
(function() {
    'use strict';

    var HTML_DRAGGABLE = '<div class="selector" title="Clique, segure e arraste para copiar esta linha">';
    var HTML_HIGHLIGHT = '<div class="highlight"><div class="square"></div></div></div>';
    var HTML_DASHED = '<div class="dashed"></div>';

    var CLASS_FIRST_CELL = 'inicial';

    angular.module('arrecadacao.common')
        .directive('arrecSelecao', ArrecSelecao);

    function ArrecSelecao() {
        return {
            restrict: 'A',
            link: postLink,

            scope: {
                callback: '=arrecSelecao'
            }
        };

        function postLink(scope, element) {
            var drag = createDraggableElement();

            var highlight = $(HTML_HIGHLIGHT);

            var dashed = $(HTML_DASHED).css({
                'margin-top': 0,
                'border-top': '1px dashed black'
            });
            var tamanhoCell;
            highlight.append(drag);

            element.on('focus', 'input', onInputFocus);
            element.on('focusout', escondeSelecao);

            scope.$on('$destroy', destroy);

            function createDraggableElement() {
                return $(HTML_DRAGGABLE)
                    .draggable({
                        containment: element,
                        revert: true,
                        axis: 'x',
                        start: onDragStart,
                        drag: onDrag,
                        stop: onDragStop
                    });
            }

            function onDragStart() {
                dashed.css('visibility', 'visible');
                highlight.css('visibility', 'visible');
            }

            function onDrag(event, ui) {
                dashed.css('width', ((ui.position.left / highlight.width()).toFixed(0) * tamanhoCell) + 'px');
            }

            function onDragStop() {
                if (scope.$$destroyed) {
                    return;
                }
                var $td = highlight.parent();
                var $tr = $td.parent();

                var currentIndex = $td.prevAll().length;
                var blocoIndex = Number((dashed.width() / tamanhoCell).toFixed(0));
                blocoIndex--;
                // Como temos o bloco e precizamos do index da ultima celula foi multiplicado por dois
                var indexFinal = blocoIndex * 2;
                scope.$apply((scope.callback || angular.noop)($tr.prevAll().length, currentIndex, currentIndex + indexFinal));

                dashed.css('visibility', 'hidden');

                drag.css({
                    left: (highlight.width() - 5) + 'px'
                });

                $td.find('input').focus();
            }

            function onInputFocus(event) {
                var $target = $(event.target);

                var $td = $target.parent().parent();
                if (!$td.hasClass(CLASS_FIRST_CELL)) {
                    $td = $td.prev();
                }

                $td.prepend(dashed).prepend(highlight);

                var left = 0;
                var width = $td.outerWidth();
                tamanhoCell = width;
                highlight.css({
                    left: left + 'px',
                    width: width + 'px',
                    height: $td.outerHeight() + 'px',
                    visibility: 'visible'
                });

                drag.css({
                    left: (width - 5) + 'px',
                    visibility: 'visible'
                });

                dashed.css({
                    left: left + 'px',
                    width: width + 'px'
                });
            }

            function escondeSelecao() {
                highlight.css('visibility', 'hidden');
                drag.css('visibility', 'hidden');
                dashed.css('visibility', 'hidden');
            }

            function destroy() {
                drag.remove();
                highlight.remove();
                dashed.remove();

                drag = null;
                highlight = null;
                dashed = null;
            }
        }
    }
})();
