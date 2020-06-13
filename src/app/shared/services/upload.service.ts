import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Upload } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath: string = 'companies'

  constructor(
    private readonly fireStorage: AngularFireStorage
  ) { }

  public publishUploads(upload: Upload, cid: string): Promise<any> {
    const filePath = `${this.basePath}/${cid}`
    const fileRef = this.fireStorage.ref(filePath)
    const task = this.fireStorage.upload(filePath, upload.file)

    return task.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => uploadSnapshot.ref.getDownloadURL())
  }

  public removeImage(catalog: string, cid: string): Observable<any> {
    const filePath = `${catalog}/${cid}`
    const fileRef = this.fireStorage.ref(filePath)
    const task = fileRef.delete()

    return task
  }

}
