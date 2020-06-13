export class Upload {
  file: File;
  fileName: string;
  fileUrl: string;
  progress: number;

  constructor(file: File) {
    this.file = file;
  }
}
