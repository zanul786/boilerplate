"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var security_service_1 = require("./security.service");
describe('SecurityService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [security_service_1.SecurityService]
        });
    });
    it('should be created', testing_1.inject([security_service_1.SecurityService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=security.service.spec.js.map