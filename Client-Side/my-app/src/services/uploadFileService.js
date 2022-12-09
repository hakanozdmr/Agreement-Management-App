import httpCommon from "./http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("files", file);
    return httpCommon.put("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles(fileName) {
    return httpCommon.get("/files/"+fileName);
  }
}

export default new UploadFilesService();