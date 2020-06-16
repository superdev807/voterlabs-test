import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngbd-dropdown-form',
  templateUrl: './dropdown-form.html',
  styleUrls: ['./dropdown-form.css'],
})
export class NgbdDropdownForm {
  @Input() epeople;

  startTime = '';
  endTime = '';
  fileName = 'output.csv';

  public exportEntire() {
    this.rawFilterExport(null, null, this.fileName);
  }

  public exportByDate() {
    this.rawFilterExport(this.startTime, this.endTime, this.fileName);
  }

  public rawFilterExport(start, end, fileName) {
    let str = '';
    let entire = false;
    let startDate, endDate;
    if (!start && !end) entire = true;
    else {
      startDate = new Date(start);
      endDate = new Date(end);
    }
    this.epeople &&
      this.epeople.map((individual) => {
        const currentDate = new Date(individual.person.timestamp);
        if (entire || (!entire && endDate >= currentDate && currentDate >= startDate)) {
          str += individual.person.id + ';';
          str += individual.person.timestamp + ';';
          str += individual.person.fname + ';';
          str += individual.person.lname + ';';
          str += individual.person.address_1 + ';';
          str += individual.person.city + ';';
          str += individual.person.state + ';';
          str += individual.person.zip + ';';
          str += individual.verified_address + ';';
          str += individual.verified_voter + ';';
          str += individual.verified_identity + ';';
          str += individual.name_bucket + ';';
          str += individual.matrix_name + ';';
          str += individual.exact_name_matrix_match + ';';
          str += individual.match_exact_name_matrix_match + ';';
          str += individual.name_matrix_cluster_match + ';';
          str += individual.match_name_matrix_cluster_match + ';';
        }
        str += '\n';
      });

    let blob = new Blob(['\ufeff' + str], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {
      //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', fileName);
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
}
