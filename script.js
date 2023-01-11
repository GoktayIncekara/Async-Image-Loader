const images = document.querySelector(".images");
let image;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = (imgPath) => {
  return new Promise(function (resolve, reject) {
    const image = document.createElement("img");
    image.src = imgPath;
    image.addEventListener("load", function () {
      images.append(image);
      resolve(image);
    });
    image.addEventListener("error", function () {
      reject(new Error("Image not found!"));
    });
  });
};

/* createImage("img/img-1.jpg")
  .then((img) => {
    image = img;
    return wait(2);
  })
  .then(() => {
    image.style.display = "none";
    return createImage("./img/img-2.jpg");
  })
  .then((img) => {
    image = img;
    return wait(2);
  })
  .then(() => {
    image.style.display = "none";
  })
  .catch((err) => console.error(err.message)); */

//Turn the above statement with async/await form which is better.
const loadNPause = async function () {
  try {
    let image = await createImage("img/img-1.jpg");
    await wait(2);
    image.style.display = "none";
    image = await createImage("./img/img-2.jpg");
    await wait(2);
    image.style.display = "none";
  } catch (error) {
    console.error(error.message);
  }
};

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => createImage(img));
    const imgsEl = await Promise.all(imgs);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (error) {
    console.error(error.message);
  }
};

//loadNPause();
loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
