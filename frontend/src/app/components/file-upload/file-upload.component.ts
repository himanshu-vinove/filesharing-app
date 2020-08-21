import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  filesList: any = [];


  images;
  multipleImages:any  = [];
  constructor(private http: HttpClient ,private router:Router  ){}

  ngOnInit(): void { 
    this.fetchUploadFiles();
  }

 
  selectMultipleImage(event) :any{
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

 

  onMultipleSubmit() : any{
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
     
    }

    this.http.post<any>('http://127.0.0.1:3000/api/files/fileupload', formData).subscribe(
      (res) =>{ console.log(res)
        this.fetchUploadFiles();},
      (err) => console.log(err)
    );
   alert('File uploaded sucessfully');

  }

  fetchUploadFiles(): any {
    this.http
      .get<any>('http://127.0.0.1:3000/api/files/getuploadedfile')
      .subscribe(
        (files) => {
          // console.log(files);
          this.filesList = files;
        },
        (err) => console.log(err)
      );
  }

}
