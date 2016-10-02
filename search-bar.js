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
var core_1 = require('@angular/core');
var autocomplete_1 = require('modules/autocomplete/autocomplete');
var voter_service_1 = require('modules/voter-service/voter-service');
var router_1 = require('@angular/router');
var SearchBar = (function () {
    function SearchBar(voter, router) {
        var _this = this;
        this.voter = voter;
        this.router = router;
        this.placeholder = "Search";
        this.autoObj = {
            source: function (req, res) { _this.populateAuto(req.term, res); },
            minLength: 5,
            select: function (event, ui) {
                _this.router.navigate(['/contact-profile', ui.item.value]);
                $(event.target).val(null);
                return false;
            }
        };
        this.populateAuto = function (string, cb) {
            _this.voter.getVoterName(string).map(function (res) { return res.map(function (item) {
                return { label: item.FirstName + " " + item.LastName, value: item.ClientId };
            }); }).subscribe(function (x) { return cb(x); });
            ;
        };
        this.voter = voter;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SearchBar.prototype, "placeholder", void 0);
    SearchBar = __decorate([
        core_1.Component({
            selector: 'search-bar',
            directives: [autocomplete_1.Autocomplete],
            template: "\n\t\t<input [autocomplete]=\"autoObj\" class=\"form-control\" [placeholder]=\"placeholder\">\n\t",
            styles: ["\n\t\tinput {margin-bottom: 10px;}\n\t\t.ui-autocomplete-loading {background:url('img/indicator.gif') no-repeat right center}\n\t"]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof voter_service_1.VoterService !== 'undefined' && voter_service_1.VoterService) === 'function' && _a) || Object, router_1.Router])
    ], SearchBar);
    return SearchBar;
    var _a;
}());
exports.SearchBar = SearchBar;
//# sourceMappingURL=search-bar.js.map