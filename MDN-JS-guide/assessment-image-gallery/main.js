const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */
const images = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];

/* Declaring the alternative text for each image file */
const altTexts = [
  "Image 1 description",
  "Image 2 description",
  "Image 3 description",
  "Image 4 description",
  "Image 5 description",
];

/* Looping through images */
for (let index = 0; index < images.length; index++) {
  const image = images[index];
  const imageAltText = altTexts[index];

  const newImage = document.createElement("img");
  newImage.setAttribute("src", `images/${image}`);
  newImage.setAttribute("alt", imageAltText);
  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", (evt) => {
    displayedImage.setAttribute("src", evt.target.getAttribute("src"));
  });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", () => {
  const currentClass = btn.getAttribute("class");
  if (currentClass == "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
});
