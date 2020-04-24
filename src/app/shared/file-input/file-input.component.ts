import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.less'],
})
export class FileInputComponent implements OnInit {
  @Input() passedPlaceholder: string;
  @Output() fileSelected = new EventEmitter<object>();
  placeholder: string = 'CHOOSE FILE';

  constructor() {}

  ngOnInit(): void {}

  handleClick(e: Event) {
    e.preventDefault();
    const chooseFileButton = e.target as HTMLButtonElement;
    const fileInput = chooseFileButton.nextSibling as HTMLInputElement;

    fileInput.click();
  }

  handleChange(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const fileName = fileInput.value.replace(/^.*?([^\\/]*)$/, '$1');
    const fileFullName = fileInput.value;
    const file = fileInput.files[0];

    if (fileName) {
      this.placeholder = fileName;
    } else {
      this.placeholder = this.passedPlaceholder || 'CHOOSE FILE';
    }

    this.fileSelected.emit({ file, fileFullName });
  }
}
