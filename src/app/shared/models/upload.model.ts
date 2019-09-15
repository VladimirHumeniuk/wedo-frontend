export class Upload {
  $key: string;
  file: File;
  fileName: string;
  fileUrl: string;
  progress: number;

  constructor(file: File) {
    this.file = file;
  }
}
