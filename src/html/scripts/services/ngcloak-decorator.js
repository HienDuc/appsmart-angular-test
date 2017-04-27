
/**
 * Wraps ng-cloak so that, instead of simply waiting for Angular to compile, it waits until
 * Auth resolves with the remote Firebase services.
 *
 * <code>
 *    <div ng-cloak>Authentication has resolved.</div>
 * </code>
 */
app
  .config(['$provide', function($provide) {
    // adapt ng-cloak to wait for auth before it does its magic
    $provide.decorator('ngCloakDirective', ['$delegate',
      function($delegate) {
        var directive = $delegate[0];
        // make a copy of the old directive
        var _compile = directive.compile;
        directive.compile = function(element, attr) {
            _compile.call(directive, element, attr);
        };
        // return the modified directive
        return $delegate;
      }]);
  }]);
