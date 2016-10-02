import {Component, Input}		from '@angular/core';
import {Autocomplete}				from 'modules/autocomplete/autocomplete';
import {VoterService}				from 'modules/voter-service/voter-service';
import {Router}							from '@angular/router';

@Component({
	selector:					'search-bar',
	directives:				[Autocomplete],
	template:					`
		<input [autocomplete]="autoObj" class="form-control" [placeholder]="placeholder">
	`,
	styles:						[`
		input {margin-bottom: 10px;}
		.ui-autocomplete-loading {background:url('img/indicator.gif') no-repeat right center}
	`]
})

export class SearchBar {
	@Input() placeholder = "Search";
	autoObj = {
		source: (req, res) => {this.populateAuto(req.term, res);},
		minLength: 5,
		select:	(event, ui) => {
			this.router.navigate(['/contact-profile', ui.item.value]);
			$(event.target).val(null);
			return false;
		}
	};
	
	constructor(private voter: VoterService, private router: Router) {
		this.voter = voter;
	}
	populateAuto = (string, cb) => {
		this.voter.getVoterName(string).map(res => res.map(item => {
			return  {label: item.FirstName + " " + item.LastName, value: item.ClientId};
		})).subscribe(x => cb(x););
	}
}