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
    private fireStorage: AngularFireStorage
  ) { }

  publishUploads(upload: Upload, uid: string) {
    const name = upload.file.name.toLowerCase().substring(0, upload.file.name.indexOf('.')).replace(/[^a-zA-Z0-9]/g, '')
    const filePath = `${this.basePath}/${uid}/${name}`
    const fileRef = this.fireStorage.ref(filePath)
    const task = this.fireStorage.upload(filePath, upload.file)

    return task.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => uploadSnapshot.ref.getDownloadURL())
  }

}
