import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Upload } from '../models';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath: string = 'companies'
  private uploadRef: any
  private uploads: Observable<Upload[]>
  private uploadKey: string
  public downloadURL

  constructor(
    private db: AngularFireStorage
  ) { }

  publishUploads(upload: Upload, uid: string) {
    const name = upload.file.name.toLowerCase().substring(0, upload.file.name.indexOf('.')).replace(/[^a-zA-Z0-9]/g, '')
    const filePath = `${this.basePath}/${uid}/${name}`
    const fileRef = this.db.ref(filePath)
    const task = this.db.upload(filePath, upload.file)

    return task.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => uploadSnapshot.ref.getDownloadURL())
  }

}
