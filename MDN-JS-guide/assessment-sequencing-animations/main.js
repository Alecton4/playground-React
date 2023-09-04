const aliceTumbling = [
  { transform: "rotate(0) scale(1)" },
  { transform: "rotate(360deg) scale(0)" },
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: "forwards",
};

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

// Method 1: call back hell
alice1
  .animate(aliceTumbling, aliceTiming)
  .finished.then((value) =>
    alice2
      .animate(aliceTumbling, aliceTiming)
      .finished.then((value) =>
        alice3
          .animate(aliceTumbling, aliceTiming)
          .finished.then((value) => null)
      )
  );
// NOTE: recommended answer:
alice1.animate(aliceTumbling, aliceTiming).finished.then(() => {
  const alice2Animation = alice2.animate(aliceTumbling, aliceTiming).finished;
  alice2Animation.then(() => {
    alice3.animate(aliceTumbling, aliceTiming);
  });
});

// Method 2: promise chain
alice1
  .animate(aliceTumbling, aliceTiming)
  .finished.then((value) =>
    alice2.animate(aliceTumbling, aliceTiming).finished.then()
  )
  .then((value) => alice3.animate(aliceTumbling, aliceTiming).finished.then());
// NOTE: recommended answer:
alice1
  .animate(aliceTumbling, aliceTiming)
  .finished.then(() => alice2.animate(aliceTumbling, aliceTiming).finished)
  .then(() => alice3.animate(aliceTumbling, aliceTiming).finished)
  .catch((error) => console.error(`Error animating Alices: ${error}`));

// Method 3: async and await
const animation1 = alice1.animate(aliceTumbling, aliceTiming).finished.then();
const animation2 = alice2.animate(aliceTumbling, aliceTiming).finished.then();
const animation3 = alice3.animate(aliceTumbling, aliceTiming).finished.then();
// NOTE: recommended answer:
async function animateAlices() {
  try {
    await alice1.animate(aliceTumbling, aliceTiming).finished;
    await alice2.animate(aliceTumbling, aliceTiming).finished;
    await alice3.animate(aliceTumbling, aliceTiming).finished;
  } catch (error) {
    console.error(`Error animating Alices: ${error}`);
  }
}

animateAlices();
