import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'csv-reader',
  templateUrl: './csvreader.component.html',
  styleUrls: ['./csvreader.component.css'],
})
export class CsvReaderComponent implements OnInit {
  fileName = 'Import CSV';
  csvData = [];
  fileUpload: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fileUpload = this.formBuilder.group({
      file: ['', Validators.required],
    });
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
            RecordId: csvRow[0],
            Timestamp: csvRow[1],
            FName: csvRow[2],
            LName: csvRow[3],
            Address: csvRow[4],
            City: csvRow[5],
            State: csvRow[6],
            Zip: csvRow[7],
          });
        });
      };
    }
  }
}
