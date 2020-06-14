import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'csv-reader',
  templateUrl: './csvreader.component.html',
  styleUrls: ['./csvreader.component.css'],
})
export class CsvReaderComponent implements OnInit {
  fileName = 'Import CSV';
  fileUpload: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fileUpload = this.formBuilder.group({
      file: ['', Validators.required],
    });
  }

  public changeListener(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      this.fileName = file.name;
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        console.log('>>>', e.type);
        let csv: string = reader.result as string;
        console.log(csv);
      };
    }
  }
}
