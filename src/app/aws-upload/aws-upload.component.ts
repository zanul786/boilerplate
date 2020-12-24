import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AwsUploadService } from '../aws-upload.service';


@Component({
  selector: 'app-aws-upload',
  templateUrl: './aws-upload.component.html',
  styleUrls: ['./aws-upload.component.css']
})
export class AwsUploadComponent implements OnInit {
  fileUpload = {
    file : null,
    isCompleted : false,
    isStarted : false
  }

  constructor(private awsUploadService : AwsUploadService) { }

  ngOnInit(): void {
  }

  handleAwsUpload = async (event)=>{
    try {
      if (event.target.files.length) {
        this.fileUpload.file = event.target.files[0];
        this.fileUpload.isCompleted = false,
        this.fileUpload.isStarted = true;
      }
      const uploadDetails = await this.awsUploadService.uploadToS3(this.fileUpload.file);
      if(uploadDetails){
        this.fileUpload.file = uploadDetails.Location;
        this.fileUpload.isCompleted = true;
        console.log(this.fileUpload.file);
        Swal({
          type: "success",
          title: "Successfully uploaded to aws",
          text: 'Successfully uploaded to aws',
        });
      }
    } catch (error) {
      this.fileUpload.isCompleted = false;
      this.fileUpload.isStarted = false;
      Swal({
        type: "error",
        title: ` ${error}!`,
        text: 'Something went wrong',
      });
      throw error
    }
  }
}
