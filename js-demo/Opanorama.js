!(function(t) {
  function i(n) {
    if (e[n]) return e[n].exports;
    var a = (e[n] = { i: n, l: !1, exports: {} });
    return t[n].call(a.exports, a, a.exports, i), (a.l = !0), a.exports;
  }
  var e = {};
  (i.m = t),
    (i.c = e),
    (i.d = function(t, e, n) {
      i.o(t, e) ||
        Object.defineProperty(t, e, {
          configurable: !1,
          enumerable: !0,
          get: n
        });
    }),
    (i.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return i.d(e, "a", e), e;
    }),
    (i.o = function(t, i) {
      return Object.prototype.hasOwnProperty.call(t, i);
    }),
    (i.p = ""),
    i((i.s = 0));
})([
  function(t, i, e) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function a(t, i) {
      if (!(t instanceof i))
        throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(i, "__esModule", { value: !0 });
    var o = (function() {
        function t(t, i) {
          for (var e = 0; e < i.length; e++) {
            var n = i[e];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, n.key, n);
          }
        }
        return function(i, e, n) {
          return e && t(i.prototype, e), n && t(i, n), i;
        };
      })(),
      s = e(1),
      r = n(s),
      h = e(2),
      c = n(h),
      l = (function() {
        function t(i) {
          a(this, t),
            (this._config = Object.assign(
              {
                url: "",
                container: document.body,
                radius: 500,
                fov: 90,
                offsetLongitude: 0,
                offsetLatitude: 0,
                supportTouch: !0,
                supportOrient: !0,
                onFrame: function(t, i) {
                  return { lon: t, lat: i };
                }
              },
              i
            )),
            (this._config.width = i.container.clientWidth),
            (this._config.height = i.container.clientHeight),
            (i = this._config),
            (this._fix = {
              lat: i.offsetLatitude || 0,
              lon: i.offsetLongitude || 180,
              isFixed: i.offsetLatitude || i.offsetLongitude
            }),
            (this._touch = this._orient = { lat: 0, lon: 0 }),
            this._initStage(),
            this.resize(),
            this._animate(),
            this._initControl();
        }
        return (
          o(t, [
            {
              key: "update",
              value: function() {
                var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                (this._config = Object.assign({}, this._config, t)),
                  (t.width || t.height) &&
                    (this.renderer.setSize(
                      this._config.width,
                      this._config.height
                    ),
                    (this.camera.aspect =
                      this._config.width / this._config.height)),
                  t.fov && (this.camera.fov = t.fov),
                  this.camera.updateProjectionMatrix(),
                  this.resize();
              }
            },
            {
              key: "resize",
              value: function() {
                this.camera.lookAt(this.camera.target),
                  this.renderer.render(this.scene, this.camera);
              }
            },
            {
              key: "_initStage",
              value: function() {
                var t = this._config,
                  i = t.container,
                  e = t.width,
                  n = t.height,
                  a = t.url,
                  o = t.fov,
                  s = t.radius;
                (this.camera = new THREE.PerspectiveCamera(o, e / n, 1, 1100)),
                  (this.camera.target = new THREE.Vector3(0, 0, 0)),
                  (this.scene = new THREE.Scene());
                var r = new THREE.SphereBufferGeometry(s, 60, 40);
                r.scale(-1, 1, 1);
                var h = new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(a)
                  }),
                  c = new THREE.Mesh(r, h);
                this.scene.add(c),
                  (this.renderer = new THREE.WebGLRenderer()),
                  this.renderer.setPixelRatio(window.devicePixelRatio),
                  this.renderer.setSize(e, n),
                  (this.canvas = this.renderer.domElement),
                  i.appendChild(this.canvas),
                  window.addEventListener(
                    "resize",
                    (this._bindResize = this._onResize.bind(this))
                  );
              }
            },
            {
              key: "_onResize",
              value: function() {
                var t = this._config.container;
                this.update({ width: t.clientWidth, height: t.clientHeight });
              }
            },
            {
              key: "_initControl",
              value: function() {
                var t = this,
                  i = this._config;
                if (i.supportTouch) {
                  var e = void 0;
                  this._toucher = new c.default({
                    container: i.container,
                    radius: i.radius,
                    onChange: function(i) {
                      var n = i.lon,
                        a = i.lat,
                        o = i.scale;
                      o &&
                        ((e = t._config.fov / o),
                        (e = Math.min(120, Math.max(e, 60))),
                        t.update({ fov: e })),
                        void 0 !== n &&
                          void 0 !== a &&
                          (t._fix.lat + t._orient.lat + a > 90
                            ? (t._fix.lat = 90 - t._orient.lat - a)
                            : t._fix.lat + t._orient.lat + a < -90 &&
                              (t._fix.lat = -90 - t._orient.lat - a),
                          (t._touch = { lon: n, lat: a }));
                    }
                  });
                }
                i.supportOrient &&
                  (this._orienter = new r.default({
                    onChange: function(i) {
                      var e = i.lat,
                        n = i.lon,
                        a = t._fix;
                      a.isFixed ||
                        (t._fix = {
                          lat: a.lat - e,
                          lon: a.lon - n,
                          isFixed: !0
                        }),
                        Math.abs(t._orient.lat - e) >= 90 ||
                          (t._fix.lat + t._touch.lat + e > 90
                            ? (t._fix.lat = 90 - t._touch.lat - e)
                            : t._fix.lat + t._touch.lat + e < -90 &&
                              (t._fix.lat = -90 - t._touch.lat - e),
                          (t._orient = { lat: e, lon: n }));
                    }
                  }));
              }
            },
            {
              key: "destroy",
              value: function() {
                this._toucher && this._toucher.unbind(),
                  this._orienter && this._orienter.destroy(),
                  this._bindResize &&
                    window.removeEventListener("resize", this._bindResize),
                  cancelAnimationFrame(this._intFrame);
              }
            },
            {
              key: "_animate",
              value: function() {
                var t = this._config,
                  i = this._touch.lat + this._fix.lat + this._orient.lat,
                  e = this._touch.lon + this._fix.lon + this._orient.lon,
                  n = t.onFrame(e, i) || {};
                (e += n.lon || 0),
                  (i += n.lat || 0),
                  (i = Math.max(-89, Math.min(89, i))),
                  (i = THREE.Math.degToRad(i)),
                  (e = THREE.Math.degToRad(e)),
                  (this.camera.target.x = 500 * Math.cos(i) * Math.cos(e)),
                  (this.camera.target.y = 500 * Math.sin(i)),
                  (this.camera.target.z = 500 * Math.cos(i) * Math.sin(e)),
                  this.resize(),
                  (this._intFrame = requestAnimationFrame(
                    this._animate.bind(this)
                  ));
              }
            }
          ]),
          t
        );
      })();
    (i.default = l), (window.Opanorama = l);
  },
  function(t, i, e) {
    "use strict";
    function n(t, i) {
      if (!(t instanceof i))
        throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(i, "__esModule", { value: !0 });
    var a = (function() {
        function t(t, i) {
          for (var e = 0; e < i.length; e++) {
            var n = i[e];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, n.key, n);
          }
        }
        return function(i, e, n) {
          return e && t(i.prototype, e), n && t(i, n), i;
        };
      })(),
      o = (function() {
        function t(i) {
          n(this, t),
            (this._config = Object.assign(
              { onChange: function() {}, onOrient: function() {} },
              i
            )),
            (this.lon = this.lat = 0),
            (this.moothFactor = 10),
            (this.boundary = 320),
            (this.direction = window.orientation || 0),
            this.bind();
        }
        return (
          a(t, [
            {
              key: "bind",
              value: function() {
                window.addEventListener(
                  "deviceorientation",
                  (this._bindChange = this._onChange.bind(this))
                ),
                  window.addEventListener(
                    "orientationchange",
                    (this._bindOrient = this._onOrient.bind(this))
                  );
              }
            },
            {
              key: "destroy",
              value: function() {
                window.removeEventListener(
                  "deviceorientation",
                  this._bindChange,
                  !1
                ),
                  window.removeEventListener(
                    "orientationchange",
                    this._bindOrient,
                    !1
                  );
              }
            },
            {
              key: "_onOrient",
              value: function(t) {
                (this.direction = window.orientation),
                  this._config.onOrient(t),
                  (this.lastLon = this.lastLat = void 0);
              }
            },
            {
              key: "_mooth",
              value: function(t, i) {
                return void 0 === i
                  ? t
                  : (Math.abs(t - i) > this.boundary &&
                      (i = i > this.boundary ? 0 : 360),
                    (t = i + (t - i) / this.moothFactor));
              }
            },
            {
              key: "_onChange",
              value: function(t) {
                switch (this.direction) {
                  case 0:
                    (this.lon = -(t.alpha + t.gamma)), (this.lat = t.beta - 90);
                    break;
                  case 90:
                    (this.lon = t.alpha - Math.abs(t.beta)),
                      (this.lat = t.gamma < 0 ? -90 - t.gamma : 90 - t.gamma);
                    break;
                  case -90:
                    (this.lon = -(t.alpha + Math.abs(t.beta))),
                      (this.lat = t.gamma > 0 ? t.gamma - 90 : 90 + t.gamma);
                }
                (this.lon =
                  this.lon > 0 ? this.lon % 360 : (this.lon % 360) + 360),
                  (this.lastLat = this.lat = this._mooth(
                    this.lat,
                    this.lastLat
                  )),
                  (this.lastLon = this.lon = this._mooth(
                    this.lon,
                    this.lastLon
                  )),
                  this._config.onChange({ lon: this.lon, lat: this.lat });
              }
            }
          ]),
          t
        );
      })();
    i.default = o;
  },
  function(t, i, e) {
    "use strict";
    function n(t, i) {
      if (!(t instanceof i))
        throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(i, "__esModule", { value: !0 });
    var a = (function() {
        function t(t, i) {
          for (var e = 0; e < i.length; e++) {
            var n = i[e];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, n.key, n);
          }
        }
        return function(i, e, n) {
          return e && t(i.prototype, e), n && t(i, n), i;
        };
      })(),
      o = (function() {
        function t(i) {
          n(this, t),
            (this.config = Object.assign(
              {
                radius: 50,
                container: document.body,
                onStart: function() {},
                onMove: function() {},
                onEnd: function() {},
                onChange: function() {}
              },
              i
            )),
            (this.lat = this.lon = 0),
            (this.lastX = this.lastY = 0),
            (this.lastDistance = 0),
            (this.startX = this.startY = 0),
            (this.speed = { lat: 0, lon: 0 }),
            (this.deceleration = 0.5),
            (this.factor = 50 / this.config.radius),
            this.bind();
        }
        return (
          a(t, [
            {
              key: "bind",
              value: function() {
                var t = this.config.container;
                t.addEventListener(
                  "touchstart",
                  (this._bindStart = this._onStart.bind(this))
                ),
                  t.addEventListener(
                    "touchmove",
                    (this._bindMove = this._onMove.bind(this))
                  ),
                  t.addEventListener(
                    "touchend",
                    (this._bindEnd = this._onEnd.bind(this))
                  );
              }
            },
            {
              key: "unbind",
              value: function() {
                var t = this.config.container;
                t.removeEventListener("touchstart", this._bindStart),
                  t.removeEventListener("touchmove", this._bindMove),
                  t.removeEventListener("touchend", this._bindEnd);
              }
            },
            {
              key: "_onStart",
              value: function(t) {
                var i = t.changedTouches[0];
                (this.startX = this.lastX = i.clientX),
                  (this.startY = this.lastY = i.clientY),
                  (this.startTime = Date.now()),
                  this.config.onStart(t),
                  (this.speed = { lat: 0, lon: 0 }),
                  (this.lastDistance = void 0);
              }
            },
            {
              key: "_onMove",
              value: function(t) {
                t.preventDefault();
                var i = t.changedTouches[0];
                switch (t.changedTouches.length) {
                  case 1:
                    this.lastDistance ||
                      ((this.lon += (this.lastX - i.clientX) * this.factor),
                      (this.lat += (i.clientY - this.lastY) * this.factor),
                      (this.lastX = i.clientX),
                      (this.lastY = i.clientY),
                      this.config.onChange({ lat: this.lat, lon: this.lon }));
                    break;
                  case 2:
                    var e = t.changedTouches[1],
                      n =
                        Math.abs(i.clientX - e.clientX) +
                        Math.abs(i.clientY - e.clientY);
                    void 0 === this.lastDistance && (this.lastDistance = n);
                    var a = n / this.lastDistance;
                    a &&
                      (this.config.onChange({ scale: a }),
                      (this.lastDistance = n));
                }
                this.config.onMove(t);
              }
            },
            {
              key: "_onEnd",
              value: function(t) {
                var i = (Date.now() - this.startTime) / 10;
                (this.speed = {
                  lat: (this.startY - this.lastY) / i,
                  lon: (this.startX - this.lastX) / i
                }),
                  this._inertance(),
                  this.config.onEnd(t);
              }
            },
            {
              key: "_subSpeed",
              value: function(t) {
                return (
                  0 !== t &&
                    (t > 0
                      ? (t -= this.deceleration) < 0 && (t = 0)
                      : (t += this.deceleration) > 0 && (t = 0)),
                  t
                );
              }
            },
            {
              key: "_inertance",
              value: function() {
                var t = this.speed;
                (t.lat = this._subSpeed(t.lat)),
                  (t.lon = this._subSpeed(t.lon)),
                  (this.lat -= t.lat),
                  (this.lon += t.lon),
                  this.config.onChange({
                    isUserInteracting: !1,
                    speed: t,
                    lat: this.lat,
                    lon: this.lon
                  }),
                  0 === t.lat && 0 === t.lon
                    ? (this._intFrame && cancelAnimationFrame(this._intFrame),
                      (this._intFrame = 0))
                    : (this._intFrame = requestAnimationFrame(
                        this._inertance.bind(this)
                      ));
              }
            }
          ]),
          t
        );
      })();
    i.default = o;
  }
]);
//# sourceMappingURL=Opanorama.js.map?b0b195444e0c3ad8a21c