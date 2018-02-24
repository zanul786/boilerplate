webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var material_module_1 = __webpack_require__("../../../../../src/app/material.module.ts");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var user_service_1 = __webpack_require__("../../../../../src/app/user.service.ts");
var auth_module_1 = __webpack_require__("../../../../../src/app/auth/auth.module.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
            ],
            imports: [
                material_module_1.MaterialModule,
                auth_module_1.AuthModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
            ],
            providers: [user_service_1.UserService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "../../../../../src/app/auth/auth.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var register_component_1 = __webpack_require__("../../../../../src/app/auth/register/register.component.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/auth/login/login.component.ts");
var material_module_1 = __webpack_require__("../../../../../src/app/material.module.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
// Services
var auth_service_1 = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
var ROUTES = [
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    }
];
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            imports: [
                material_module_1.MaterialModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(ROUTES)
            ],
            declarations: [register_component_1.RegisterComponent, login_component_1.LoginComponent],
            providers: [auth_service_1.AuthService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;


/***/ }),

/***/ "../../../../../src/app/auth/auth.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        var _this = this;
        this.http = http;
        this.BASE_URL = "/api/auth";
        this.register = function (user) {
            var PATH = _this.BASE_URL + "/register";
            return _this.http.post(PATH, { user: user })
                .map(function (res) { return res.json(); });
        };
        this.login = function (user) {
            var PATH = _this.BASE_URL + "/login";
            return _this.http.post(PATH, { user: user })
                .map(function (res) { return res.json(); });
        };
    }
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;


/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n}\n\n.example-full-width {\n  width: 100%;\n}\n\n.card {\n  margin: 20vh auto;\n  width: 400px;\n  vertical-align: middle\n}\n\n.card .mat-card-header-text {\n  width: 100%\n}\n\na {\n  font-size: 10px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"card\">\n  <mat-card-header>\n    <mat-card-subtitle>Please enter your email and password.</mat-card-subtitle>\n  </mat-card-header>\n  <form class=\"login-form\" #user=\"ngForm\" name=\"user\" (ngSubmit)=\"submit(user)\">\n    <mat-form-field class=\"col-xs-12\">\n      <input name=\"email\" ngModel matInput type=\"text\" placeholder=\"email\">\n    </mat-form-field>\n\n    <mat-form-field class=\"col-xs-12\">\n      <input name=\"password\" ngModel matInput type=\"password\" placeholder=\"Password\">\n    </mat-form-field>\n    <div>\n      <button mat-raised-button color=\"primary\">Login</button>\n    </div>\n    <a routerLink=\"/register\">Don't have an account? Register here.</a>\n  </form>\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService) {
        var _this = this;
        this.authService = authService;
        this.submit = function (form) {
            _this.authService.login(form.value)
                .subscribe(function (data) {
                console.log('logged in', data);
            });
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/auth/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/auth/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "../../../../../src/app/auth/register/register.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n}\n\n.example-full-width {\n  width: 100%;\n}\n\n.card {\n  margin: 20vh auto;\n  width: 400px;\n  vertical-align: middle\n}\n\n.card .mat-card-header-text {\n  width: 100%\n}\n\na {\n  font-size: 10px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"card\">\n  <mat-card-header>\n    <mat-card-subtitle>Please enter your name, email and create a password.</mat-card-subtitle>\n  </mat-card-header>\n  <form class=\"login-form\" #user=\"ngForm\" name=\"user\" (ngSubmit)=\"submit(user)\">\n    <fieldset ngModelGroup=\"name\">\n      <mat-form-field class=\"col-xs-12\">\n        <input ngModel name=\"first\" matInput type=\"text\" placeholder=\"First Name\">\n      </mat-form-field>\n      <mat-form-field class=\"col-xs-12\">\n          <input ngModel name=\"last\" matInput type=\"text\" placeholder=\"Last Name\">\n        </mat-form-field>\n    </fieldset>\n    <mat-form-field class=\"col-xs-12\">\n      <input [(ngModel)]=\"user.email\" matInput type=\"text\" name=\"email\" placeholder=\"email\">\n    </mat-form-field>\n    <mat-form-field class=\"col-xs-12\">\n      <input [(ngModel)]=\"user.password\" matInput type=\"password\" name=\"password\" placeholder=\"Password\">\n    </mat-form-field>\n    <div>\n      <button type=\"submit\" mat-raised-button color=\"primary\">Register</button>\n    </div>\n    <a routerLink=\"/login\">Already have an account? Login here.</a>\n  </form>\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/auth/register/register.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(authService) {
        var _this = this;
        this.authService = authService;
        this.user = { name: {} };
        this.submit = function (form) {
            _this.user = form.value;
            _this.authService
                .register(_this.user)
                .subscribe(function (user) {
                console.log(user);
                _this.user = user;
            });
        };
    }
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            template: __webpack_require__("../../../../../src/app/auth/register/register.component.html"),
            styles: [__webpack_require__("../../../../../src/app/auth/register/register.component.css")]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;


/***/ }),

/***/ "../../../../../src/app/material.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var table_1 = __webpack_require__("../../../cdk/esm5/table.es5.js");
var animations_1 = __webpack_require__("../../../platform-browser/esm5/animations.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            exports: [
                table_1.CdkTableModule,
                material_1.MatAutocompleteModule,
                material_1.MatButtonModule,
                material_1.MatButtonToggleModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatStepperModule,
                material_1.MatDatepickerModule,
                material_1.MatDialogModule,
                material_1.MatExpansionModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatNativeDateModule,
                material_1.MatPaginatorModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatRadioModule,
                material_1.MatRippleModule,
                material_1.MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSliderModule,
                material_1.MatSlideToggleModule,
                material_1.MatSnackBarModule,
                material_1.MatSortModule,
                material_1.MatTableModule,
                material_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
                animations_1.BrowserAnimationsModule
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;


/***/ }),

/***/ "../../../../../src/app/user.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
var UserService = /** @class */ (function () {
    function UserService(authService) {
        var _this = this;
        this.authService = authService;
        this.ngOnInit = function () {
        };
        this.setUser = function (user) {
            _this.user = user;
        };
        this.unsetUser = function () {
            _this.user = null;
        };
    }
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;


/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__("../../../../../src/polyfills.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../../src/polyfills.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
Object.defineProperty(exports, "__esModule", { value: true });
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
__webpack_require__("../../../../core-js/es6/symbol.js");
__webpack_require__("../../../../core-js/es6/object.js");
__webpack_require__("../../../../core-js/es6/function.js");
__webpack_require__("../../../../core-js/es6/parse-int.js");
__webpack_require__("../../../../core-js/es6/parse-float.js");
__webpack_require__("../../../../core-js/es6/number.js");
__webpack_require__("../../../../core-js/es6/math.js");
__webpack_require__("../../../../core-js/es6/string.js");
__webpack_require__("../../../../core-js/es6/date.js");
__webpack_require__("../../../../core-js/es6/array.js");
__webpack_require__("../../../../core-js/es6/regexp.js");
__webpack_require__("../../../../core-js/es6/map.js");
__webpack_require__("../../../../core-js/es6/weak-map.js");
__webpack_require__("../../../../core-js/es6/set.js");
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following for the Reflect API. */
// import 'core-js/es6/reflect';
/** Evergreen browsers require these. **/
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
__webpack_require__("../../../../core-js/es7/reflect.js");
/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
__webpack_require__("../../../../zone.js/dist/zone.js"); // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map