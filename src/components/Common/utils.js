export const setValueToStorage = (key, value) => {
  try {
    return localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error while storing", error);
  }
};

export const getValueFromStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log("Error while storing", error);
  }
};

export function getEmergencyFoundImg(urlImg) {
  var img = new Image();
  img.src = urlImg;
  img.crossOrigin = "Anonymous";

  var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");

  canvas.height = img.naturalHeight;
  canvas.width = img.naturalWidth;
  ctx.drawImage(img, 0, 0);

  var b64 = canvas.toDataURL("image/png");
  return b64;
}

export function areEqual(arr1, arr2) {
  for (var index = 0; index < arr1.length; index++) {
    if (arr1[index] !== arr2[index]) {
      return false;
    }
  }
  return true;
}
