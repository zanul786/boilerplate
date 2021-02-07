import { Injectable } from "@angular/core";
import * as S3 from "aws-sdk/clients/s3";
import { environment } from "../environments/environment";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { throwError as observableThrowError, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AwsUploadService {
  BASE_URL = `/api/aws`;
  constructor(private http: HttpClient) {}

  getSignedUrlS3 = (fileName, fileType) => {
    const PATH = `${this.BASE_URL}/get-aws-url`;
    let params = new HttpParams()
      .set("fileName", fileName)
      .set("fileType", fileType);
    return this.http.get(PATH, { params }).pipe(
      map((res: any) => res),
      catchError((error: any) =>
        observableThrowError(error.error || "Server error")
      )
    );
  };

  uploadfileAWSS3(fileuploadurl, contenttype, file) {
    const headers = new HttpHeaders({
      "Content-Type": contenttype,
      "anonymous-request": "",
    });
    const req = new HttpRequest("PUT", fileuploadurl, file, {
      headers: headers,
      reportProgress: true,
    });
    return this.http.request(req);
  }
}
