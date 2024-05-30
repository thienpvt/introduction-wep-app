export default {
  convertFileToBase64(file:File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function () {
        const result = reader.result;

        if (typeof result === "string") {
          const base64String = result.split(",")[1]; // Lấy phần base64 từ chuỗi data URL

          resolve(base64String);
        } else {
          reject(new Error("Unsupported result type."));
        }
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  },
};
