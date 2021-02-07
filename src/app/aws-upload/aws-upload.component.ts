import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { environment } from "../../environments/environment";
import { AwsUploadService } from "../aws-upload.service";
@Component({
  selector: "app-aws-upload",
  templateUrl: "./aws-upload.component.html",
  styleUrls: ["./aws-upload.component.scss"],
})
export class AwsUploadComponent implements OnInit {
  files: any[] = [];

  constructor(private awsUploadService: AwsUploadService) {}

  ngOnInit(): void {}
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      item.isUploadCompleted = false;
      item.uploadLocation = "";
      this.files.push(item);
    }
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  handleUpload() {
    for (let i = 0; i < this.files.length; i++) {
      this.awsUploadService
        .getSignedUrlS3(this.files[i]["name"], this.files[i]["type"])
        .subscribe(
          ({ url, keyFile }) => {
            this.awsUploadService
              .uploadfileAWSS3(url, this.files[i]["type"], this.files[i])
              .subscribe(
                (data) => {
                  if (data["type"] === 1) {
                    this.files[i]["progress"] =
                      (data["loaded"] / data["total"]) * 100;
                  }
                  if (data["type"] === 4) {
                    this.files[i]["isUploadCompleted"] = true;
                    this.files[i][
                      "uploadLocation"
                    ] = `https://${environment.S3_BUCKET_NAME}.s3.${environment.S3_Region}.amazonaws.com/${keyFile}`;
                  }
                },
                (error) => {
                  this.files[i].isUploadCompleted = false;
                  throw error;
                }
              );
          },
          (error) => {
            this.files[i].isUploadCompleted = false;
            throw error;
          }
        );
    }
  }

  deleteFile(index) {
    this.files = this.files.filter((ele, i) => i !== index);
  }
}
