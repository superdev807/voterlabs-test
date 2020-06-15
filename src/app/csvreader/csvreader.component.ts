import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnhanceService } from '../_services/enhance.service';
import { Person } from '../_models';

@Component({
  selector: 'csv-reader',
  templateUrl: './csvreader.component.html',
  styleUrls: ['./csvreader.component.css'],
})
export class CsvReaderComponent implements OnInit {
  fileName = 'Import CSV';
  csvData = [];
  fileUpload: FormGroup;

  constructor(private formBuilder: FormBuilder, private enhanceService: EnhanceService) {}

  ngOnInit() {
    this.fileUpload = this.formBuilder.group({
      file: ['', Validators.required],
    });
  }

  public convert_chunk(chunks, chunk_num) {
    this.enhanceService.getEnhancedPeople(chunks).subscribe({
      next: (data) => {
        data.map((row, index) => {
          this.csvData[chunk_num * 10 + index].nameBucket = row.name_bucket;
          this.csvData[chunk_num * 10 + index].matrixName = row.matrix_name;
          this.csvData[chunk_num * 10 + index].exactName = row.exact_name;
        });
      },
      error: (error) => console.log('api error', error),
    });
  }

  public convert() {
    let chunkCnt = Math.floor(this.csvData.length / 10);
    this.convert_chunk(this.csvData.slice(0, 10), 0);
  }

  public changeListener(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      this.fileName = file.name;
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        let mapData = csv.split('\n');
        mapData.map((data) => {
          let csvRow = data.split(';');
          this.csvData.push({
            id: csvRow[0],
            timestamp: csvRow[1],
            fname: csvRow[2],
            lname: csvRow[3],
            address_1: csvRow[4],
            city: csvRow[5],
            state: csvRow[6],
            zip: csvRow[7],
          });
        });
      };
    }
  }
}
