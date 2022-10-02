(function () {

  describe('MicroPlugin', function () {

    describe('mixin()', function () {

      it('should add "define" method', function () {
        var Lib = function () { };
        MicroPlugin.mixin(Lib);
        assert.equal(typeof Lib.define, 'function');
      });

      it('should add "require" method to prototype', function () {
        var Lib = function () { };
        MicroPlugin.mixin(Lib);
        assert.equal(typeof Lib.prototype.require, 'function');
      });

      it('should add "initializePlugins" method to prototype', function () {
        var Lib = function () { };
        MicroPlugin.mixin(Lib);
        assert.equal(typeof Lib.prototype.initializePlugins, 'function');
      });

    });

    describe('#initializePlugins()', function () {

      describe('format: array of plugin names', function () {

        it('should load plugins with options empty', function () {
          var Lib = function () {
            this.initializePlugins(['a', 'b']);
          };
          MicroPlugin.mixin(Lib);

          var loaded = 0;
          Lib.define('a', function (options) { loaded++; assert.deepEqual(options, {}); });
          Lib.define('b', function (options) { loaded++; assert.deepEqual(options, {}); });

          new Lib();
          assert.equal(loaded, 2);
        });

        it('should not load plugins that are not listed', function () {
          var Lib = function () {
            this.initializePlugins(['a', 'b']);
          };
          MicroPlugin.mixin(Lib);

          var loaded = false;
          Lib.define('a', function (options) { });
          Lib.define('b', function (options) { });
          Lib.define('c', function (options) { loaded = true; });

          new Lib();
          assert.equal(loaded, false);
        });

        it('should only execute plugins once, even if listed more than once', function () {
          var Lib = function () {
            this.initializePlugins(['a', 'a']);
          };
          MicroPlugin.mixin(Lib);

          var counter = 0;
          Lib.define('a', function (options) { counter++; });

          new Lib();
          assert.equal(counter, 1);
        });

      });

      describe('format: hash of plugin options', function () {

        it('should load plugins with correct options', function () {
          var Lib = function () {
            this.initializePlugins({
              'a': { test: 'hello_a' },
              'b': { test: 'hello_b' }
            });
          };
          MicroPlugin.mixin(Lib);

          var loaded = 0;
          Lib.define('a', function (options) { loaded++; assert.equal(options.test, 'hello_a'); });
          Lib.define('b', function (options) { loaded++; assert.equal(options.test, 'hello_b'); });

          new Lib();
          assert.equal(loaded, 2);
        });

        it('should not load plugins that are not listed', function () {
          var Lib = function () {
            this.initializePlugins({
              'a': { test: 'hello_a' },
              'b': { test: 'hello_b' }
            });
          };
          MicroPlugin.mixin(Lib);

          var loaded = false;
          Lib.define('a', function (options) { });
          Lib.define('b', function (options) { });
          Lib.define('c', function (options) { loaded = true; });

          new Lib();
          assert.equal(loaded, false);
        });

      });


      describe('format: array of plugin options', function () {

        it('should load plugins with correct options', function () {
          var Lib = function () {
            this.initializePlugins([
              { name: 'a', options: { test: 'hello_a' } },
              { name: 'b', options: { test: 'hello_b' } }
            ]);
          };
          MicroPlugin.mixin(Lib);

          var loaded = 0;
          Lib.define('a', function (options) { loaded++; assert.deepEqual(options, { test: 'hello_a' }); });
          Lib.define('b', function (options) { loaded++; assert.deepEqual(options, { test: 'hello_b' }); });

          new Lib();
          assert.equal(loaded, 2);
        });

        it('should not load plugins that are not listed', function () {
          var Lib = function () {
            this.initializePlugins([
              { name: 'a', options: { test: 'hello_a' } },
              { name: 'b', options: { test: 'hello_b' } }
            ]);
          };
          MicroPlugin.mixin(Lib);

          var loaded = false;
          Lib.define('a', function (options) { });
          Lib.define('b', function (options) { });
          Lib.define('c', function (options) { loaded = true; });

          new Lib();
          assert.equal(loaded, false);
        });

        it('should only execute plugins once, even if listed more than once', function () {
          var Lib = function () {
            this.initializePlugins([
              { name: 'a', options: { test: 'hello_a' } },
              { name: 'a', options: { test: 'hello_a' } },
              { name: 'a', options: { test: 'hello_a' } }
            ]);
          };
          MicroPlugin.mixin(Lib);

          var counter = 0;
          Lib.define('a', function (options) { counter++; });

          new Lib();
          assert.equal(counter, 1);
        });

      });

    });

    describe('#require()', function () {

      it('should throw error if requested plugin not defined', function () {
        var Lib = function () { this.initializePlugins(); };
        MicroPlugin.mixin(Lib);

        assert.throws(function () {
          var instance = new Lib();
          instance.require('a');
        });
      });

      it('should throw error if circular dependency exists', function () {
        var Lib = function () { this.initializePlugins(); };
        MicroPlugin.mixin(Lib);

        Lib.define('a', function () { this.require('b'); });
        Lib.define('b', function () { this.require('a'); });

        assert.throws(function () {
          var instance = new Lib();
          instance.require('b');
        }, /dependency/);
      });

      it('should not execute plugin code more than once', function () {
        var Lib = function () { this.initializePlugins(); };
        MicroPlugin.mixin(Lib);

        var counter = 0;
        Lib.define('a', function () { counter++; });
        Lib.define('b', function () { this.require('a'); });

        var instance = new Lib();
        instance.require('a');
        instance.require('a');
        instance.require('b');

        assert.equal(counter, 1);
      });

      it('should return plugin exports', function () {
        var Lib = function () { this.initializePlugins(); };
        MicroPlugin.mixin(Lib);

        Lib.define('a', function () { return 'test'; });
        Lib.define('b', function () { return { test: true }; });
        Lib.define('c', function () { return false; });
        Lib.define('d', function () { });

        var instance = new Lib();
        assert.equal(instance.require('a'), 'test');
        assert.equal(instance.require('a'), 'test');
        assert.equal(instance.require('b').test, true);
        assert.equal(instance.require('c'), false);
        assert.equal(typeof instance.require('d'), 'undefined');
      });

    });

  });

})();
