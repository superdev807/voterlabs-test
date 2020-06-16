import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnhanceService } from '../_services/enhance.service';
import { Person, EnhancedPerson } from '../_models';

@Component({
  selector: 'csv-reader',
  templateUrl: './csvreader.component.html',
  styleUrls: ['./csvreader.component.css'],
})
export class CsvReaderComponent implements OnInit {
  fileName = 'Import CSV';
  csvData = [];
  fields = [];
  epeople: Array<EnhancedPerson> = [];
  fileUpload: FormGroup;
  progressVal = 0;

  constructor(private formBuilder: FormBuilder, private enhanceService: EnhanceService) {}

  ngOnInit() {
    this.fileUpload = this.formBuilder.group({
      file: ['', Validators.required],
    });
  }

  public convert_chunk(chunks): Promise<any> {
    return this.enhanceService.getEnhancedPeople(chunks).toPromise();
  }

  public async convert() {
    if (!this.csvData.length || this.epeople.length) return;
    let chunkCnt = Math.ceil(this.csvData.length / 10);
    for (let i = 0; i < chunkCnt; ++i) {
      const response = await this.convert_chunk(
        this.csvData.slice(i * 10, Math.min((i + 1) * 10, this.csvData.length))
      );
      response.map((row, index) => {
        this.epeople[i * 10 + index] = new EnhancedPerson();
        this.epeople[i * 10 + index].person = this.csvData[i * 10 + index];
        this.epeople[i * 10 + index].verified_address = row.verified_address;
        this.epeople[i * 10 + index].verified_voter = row.verified_voter;
        this.epeople[i * 10 + index].verified_identity = row.verified_identity;
        this.epeople[i * 10 + index].name_bucket = row.name_bucket;
        this.epeople[i * 10 + index].matrix_name = row.matrix_name;
        this.epeople[i * 10 + index].exact_name_matrix_match = row.exact_name_matrix_match;
        this.epeople[i * 10 + index].match_exact_name_matrix_match = row.match_exact_name_matrix_match;
        this.epeople[i * 10 + index].name_matrix_cluster_match = row.name_matrix_cluster_match;
        this.epeople[i * 10 + index].match_name_matrix_cluster_match = row.match_name_matrix_cluster_match;
      });
      this.progressVal = Math.floor(((i * 10 + response.length) * 100) / this.csvData.length);
    }
  }

  public changeListener(files: FileList) {
    if (files && files.length > 0) {
      this.progressVal = 0;
      this.csvData = [];
      this.epeople = [];
      let file: File = files.item(0);
      this.fileName = file.name;
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        let mapData = csv.split('\n');
        mapData.map((data, index) => {
          let csvRow = data.split(';');
          if (csvRow.length === 9) {
            if (index === 0) {
              csvRow.map((field) => {
                this.fields.push(field);
              });
            } else {
              let person = new Person();
              csvRow.map((field, index) => {
                person[this.fields[index]] = field;
              });
              this.csvData.push(person);
            }
          }
        });
      };
    }
  }
}
