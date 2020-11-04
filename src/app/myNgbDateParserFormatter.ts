import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { isNumber, toInteger, padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Injectable()
export class MyNgbDateParserFormatter extends NgbDateParserFormatter {
	datePipe = new DatePipe('en-US');
	trDate:any;
	trMonth:any;
	constructor(
		private dateFormatString: string) {
		super();
	}
	format(date: NgbDateStruct): string {
		if (date === null) {
			return '';
		}
		try {
			this.trMonth= this.getMonthNames(date.month);
			this.trDate = date.day + " - " + this.trMonth + " - " + date.year;
			return  this.trDate ;
			return this.datePipe.transform(new Date(date.year, date.month - 1, date.day), this.dateFormatString);
		} catch (e) {
			return '';
		}
	}
	
	parse(value: string): NgbDateStruct {
		let returnVal: NgbDateStruct;
		if (!value) {
			returnVal = null;
		} else {
			try {
				let dateParts = this.datePipe.transform(value, 'M-d-y').split('-');
				returnVal = { year: parseInt(dateParts[2]), month: parseInt(dateParts[0]), day: parseInt(dateParts[1]) };
			} catch (e) {
				returnVal = null;
			}
		}
		return returnVal;
	}
 
	getMonthNames(id: number) {
		switch (id) {
		  case 1:
			return "Ocak";
		  case 2:
			return "Şubat";
		  case 3:
			return "Mart";
		  case 4:
			return "Nisan";
		  case 5:
			return "Mayıs";
		  case 6:
			return "Haziran";
		  case 7:
			return "Temmuz";
		  case 8:
			return "Ağustos";
		  case 9:
			return "Eylül";
		  case 10:
			return "Ekim";
		  case 11:
			return "Kasım";
		  case 12:
			return "Aralık";
		  default:
			return "*Ay*";
		}
	  }

}