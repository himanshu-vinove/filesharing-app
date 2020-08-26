import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  filesList: any = [];
  sharedWithMe: any = [];
  uploadfile = true;
  fileId = '';
  shared = false;
  modalRef: BsModalRef;
  images;
  multipleImages:any  = [];
  constructor(private http: HttpClient , private toast: ToastrService,
    private modalService: BsModalService,
private router:Router , private userService: UserService  ){}

  ngOnInit(): void { 
    this.fetchUploadFiles();
  }

 
  selectMultipleImage(event) :any{
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

 

  onMultipleSubmit(form) : any{
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
     
    }
    form.reset();

    this.http.post<any>('http://localhost:3000/api/files/fileupload', formData).subscribe(
      (res) =>{ console.log(res)
        this.fetchUploadFiles();},
      (err) => console.log(err)
    );
   alert('File uploaded sucessfully');

  }

  fetchUploadFiles(): any {
    this.http
      .get<any>('http://localhost:3000/api/files/getuploadedfile')
      .subscribe(
        (files) => {
          this.filesList = files;
        },
        (err) => console.log(err)
      );
  }

  toggleformat(shared): any {
    if (shared === 'false'){
      this.uploadfile = false;
      }
      else{
        this.uploadfile =true;
      }
  }
 

  //open model
  openModel(fileId, form): any {
    this.modalRef = this.modalService.show(form, {
      animated: true,
      class: 'modal-lg',
    });
    this.fileId = fileId;
  }

  shareFile(event: Event, form: HTMLFormElement): any {
    event.preventDefault();
    let email = (<HTMLInputElement>form.elements.namedItem('email')).value;
    if (!email) {
      return this.toast.error('Email can\'t be empty', 'Error', {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      });;
    }
    this.userService.shareFile(this.fileId, { email }).subscribe((data) => {
      this.sharedWithMe = data;
    });
    this.modalRef.hide();
    return false;
  }

  fetchSFile(): any {
    this.userService.fetchSFile().subscribe((data) => {
      this.sharedWithMe = data;
    })
  }
}
