"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var posts_service_1 = require("./posts.service");
describe('PostsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [posts_service_1.PostsService]
        });
    });
    it('should be created', testing_1.inject([posts_service_1.PostsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=posts.service.spec.js.map