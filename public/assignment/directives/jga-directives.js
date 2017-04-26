/**
 * Created by Nancy Hong on 24-Feb-17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('sortableDirective', sortableDir);

    function sortableDir() {
        return function (scope, element, attrs) {
            var startIndex, endIndex;
            $(element).sortable({
                start:function (event, ui) {
                    startIndex = ui.item.index();
                },
                stop:function (event, ui) {
                    endIndex = ui.item.index();
                    console.log("endIndex from dir: " + endIndex)
                    console.log("start from dir " + startIndex);
                    if(attrs.onStop) {
                        // scope.model[attrs.onStop] = 'orderChanged'
                        scope.$apply(attrs.onStop);
                        //     function(self) {
                        //     self[attrs.onStop](startIndex, endIndex)
                        // });
                    }
                }
            }).disableSelection();
            scope: {startIndex: "="}
            attrs: "orderChanged"
        };
        // return {
        //     scope: {startIndex: "=", endIndex: "="},
        //     link: function(scope, element) {
        //         element.sortable({
        //             start:function (event, ui) {
        //                 startIndex = ui.item.index();
        //             },
        //             stop:function (event, ui) {
        //                 endIndex = ui.item.index();
        //                 console.log("endIndex from dir: " + endIndex)
        //                 // if(attrs.onStop) {
        //                 //     scope.$apply(function(self) {
        //                 //         self[attrs.onStop](startIndex, endIndex)
        //                 //     });
        //                 // }
        //             }
        //         })
        //     }
        // }
        // return function (scope, element, attrs) {
        //
        //     var startIndex, endIndex;
        //     $(element).sortable({
        //         start:function (event, ui) {
        //             startIndex = ui.item.index();
        //         },
        //         stop:function (event, ui) {
        //             endIndex = ui.item.index();
        //             console.log("endIndex from dir: " + endIndex)
        //             if(attrs.onStop) {
        //                 scope.$apply(function(self) {
        //                     self[attrs.onStop](startIndex, endIndex)
        //                 });
        //             }
        //         }
        //     }).disableSelection();
        //
        //     scope: {
        //         orderChanged: '=method';
        //     }
        // };
    }
})();






        // function linkFunc(scope, element) {
        //     element.sortable({
        //         // axis: 'y'
        //         start: function(e, ui) {
        //             // creates a temporary attribute on the element with the old index
        //             $(this).attr('data-previndex', ui.item.index());
        //         },
        //         update: function(e, ui) {
        //             // gets the new and old index then removes the temporary attribute
        //             newIndex = ui.item.index();
        //             oldIndex = $(this).attr('data-previndex');
        //             //$(this).removeAttr('data-previndex');
        //             console.log("oldIndex dire: " + oldIndex);
        //
        //         }
        //
        //     });
        //
        // }
        // function linkFunc(scope, element) {
        //     element.sortable({
        //         stop: function(event, ui) {
        //             newIndex = ui.item.index();
        //             console.log("new ind" + newIndex);
        //         }
        //     });
        // }

        // console.log("oldINex directive : " + newIndex);
        //
        // return {
        //     scope: {},
        //     controller: "widgetListController",
        //     controllerAs: "vm",
        //     bindToController: {
        //         newIndex: '='
        //     },
        //     link: linkFunc,
        // };

