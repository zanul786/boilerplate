"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var security_component_1 = require("./security.component");
var router_1 = require("@angular/router");
var material_module_1 = require("../material.module");
var forms_1 = require("@angular/forms");
var security_service_1 = require("./security.service");
var ROUTES = [
    {
        path: 'security',
        component: security_component_1.SecurityComponent
    },
];
var SecurityModule = /** @class */ (function () {
    function SecurityModule() {
    }
    SecurityModule = __decorate([
        core_1.NgModule({
            imports: [
                material_module_1.MaterialModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(ROUTES)
            ],
            providers: [security_service_1.SecurityService],
            declarations: [security_component_1.SecurityComponent]
        })
    ], SecurityModule);
    return SecurityModule;
}());
exports.SecurityModule = SecurityModule;
//# sourceMappingURL=security.module.js.map