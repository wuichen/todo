var myApp = angular.module('todoApp', ['ngRoute']);

myApp.controller('todoController', ['$scope',
    function ($scope) {
        $scope.saved = localStorage.getItem('todos');


        if (localStorage.getItem('todos') !== null) {
            $scope.todos = JSON.parse($scope.saved);
        } else {
            $scope.todos = [{
                text: 'put something into todo list!',
                done: false,
                dateTime: 'now!!'
            }];
            localStorage.setItem('todos', JSON.stringify($scope.todos));
        }
        //datetime try
        $scope.newDateTime = "";
        $('#datetimepicker').datetimepicker({
            onChangeDateTime: function(dp, $input) {
                $scope.newDateTime = $input.val()
                //alert(newDateTime)
            }
        });

        $scope.markAll = false;

        $scope.submit = function(){
            if($scope.todoText){
                $scope.todos.push({
                    text: $scope.todoText,
                    done: false,
                    dateTime: $scope.newDateTime
                });
                $scope.todoText = '';
                localStorage.setItem('todos', JSON.stringify($scope.todos));
                $scope.newDateTime = "";
            }
        }
        /*
        $scope.addTodo = function() {

            if ($scope.todoText){
                $scope.todos.push({
                    text: $scope.todoText,
                    done: false,
                    dateTime: $scope.newDateTime
                });
                $scope.todoText = '';
                localStorage.setItem('todos', JSON.stringify($scope.todos));
                $scope.newDateTime = "";
            }
        };*/
        $scope.hasTodo = function(){
            return $scope.todos.length > 0;
        }
        $scope.update = function(done){
            localStorage.setItem('todos', JSON.stringify($scope.todos));

        }

        $scope.toggleEditMode = function(event, todo) {
            $(event.target).closest('li').toggleClass('editing');
            localStorage.setItem('todos', JSON.stringify($scope.todos));

            $('.changeDateTime').datetimepicker({
                onChangeDateTime: function (dp, $input) {
                    todo.dateTime = $input.val();
                }
            });
        };

        $scope.remaining = function(){
            var count = 0;
            angular.forEach($scope.todos, function(todo){
                if (!todo.done) {
                    count++;
                }
            });
            return count;
        };

        $scope.hasDone = function(){
            return ($scope.todos.length != $scope.remaining());
        }

        $scope.toggleMarkAll = function(){
            angular.forEach($scope.todos, function(todo){
                todo.done = $scope.markAll;
            });
            localStorage.setItem('todos', JSON.stringify($scope.todos));
        };

        $scope.clear = function(){
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function(todo){
                if (!todo.done) {
                    $scope.todos.push(todo);
                }
            });
            localStorage.setItem('todos', JSON.stringify($scope.todos));
        };
    }
]);
