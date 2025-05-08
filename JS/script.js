// GSAP GreenSock trabaja con el objeto "gsap"
const pp = document.querySelector(".img-container"); //# pp ==> perfil photo
gsap.from(pp, {
  // x: -50, // es lo mismo que un transform: translateX(-50px)
  // opacity: 0,
  duration: 1.25,
  ease: "back", // en la pag de GSAP está muy buena esta sección
  rotate: 360, // no hace falta que pongamos deg ni transform: rotate(360deg)
  boxShadow: "none",
  scale: 0,
  delay: 0.5,
});

gsap.registerPlugin(ScrollTrigger);
const titulos = document.querySelectorAll(".titulo");
titulos.forEach((titulo) => {
  gsap.from(titulo, {
    x: 200,
    opacity: 0,
    duration: 0.75,
    ease: "back.inOut",
    stagger: 1, // delay entre las animaciones (solo se habilita cuando tenemos muchos elementos)
    scrollTrigger: {
      trigger: titulo,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
});

//* Letras animadas
const name = document.querySelector(".charAnimation");
const nameSplit = new SplitType(".charAnimation", { types: "words, chars" }); // para que se divida en palabras y letras y asi poder animarlo

gsap.from(nameSplit.chars, {
  //hacer un foreach es muy util, si no aparecieran con opacity 0 sería mejor hacer el forach
  y: () => gsap.utils.random(-300, 300), // pueden aparecer entre esos valores de manera aleatoria //$ la función flecha es para que se ejecute CADA VEZ para CADA letra
  x: () => gsap.utils.random(-600, 600),
  scale: () => gsap.utils.random(0, 7),
  rotate: () => gsap.utils.random(-360, 360),
  // color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)})`, //! Efecto interesante, pero tiene que ser con el foreach
  ease: "back.inOut",
  duration: 2,
  opacity: 0,
  delay: 2,
  // stagger: 0.005, //efecto muy piola eh
});

const dropdown = document.querySelectorAll(".dropdown");
dropdown.forEach((element, index) => {
  gsap.from(element, {
    y: -100,
    ease: "back.inOut",
    duration: 1,
    opacity: 0,
    delay: 1.3 + index * 0.2,
  });
});

//* Timeline
let charsTL = gsap.timeline(/* */); // declaro el timeline y lo uso como usaba el objeto gsap literalmente
const sobreMiSplit = new SplitType(".sobremitxt", { types: "words, chars" }); // para que se divida en palabras y letras y asi poder animarlo
sobreMiSplit.chars.forEach((element, index) => {
  gsap.from(element, {
    y: -20,
    ease: "back.inOut",
    duration: 0.2,
    opacity: 0,
    delay: 1 + index * 0.0075,
  });

  element.addEventListener("mouseenter", charsOver);

  function charsOver() {
    gsap
      .timeline() //$ Otra forma de hacer timelines, todos concatenados
      .to(element, {
        y: () => gsap.utils.random(-20, 20),
        x: () => gsap.utils.random(-20, 20),
        rotate: () => gsap.utils.random(-90, 90),
        scale: () => gsap.utils.random(0.5, 2),
        //   color: `rgb(
        // ${gsap.utils.random(0, 255)},
        // ${gsap.utils.random(0, 255)},
        // ${gsap.utils.random(0, 255)}
        // )`,
        ease: "back.out",
        onStart: () => element.removeEventListener("mouseenter", charsOver),
      })
      .to(element, {
        // color: "inherit",
        // clearProp: "color",
        y: 0,
        x: 0,
        duration: 0.25,
        rotate: 0,
        scale: 1,
        delay: 0.25,
        ease: "back.out",
        onComplete: () => element.addEventListener("mouseenter", charsOver),
      });

    // element.removeEventListener("mouseenter", charsOver); // si le vuelvo a hacer over, no se VUELVE a animar
  }
});

const mq = window.matchMedia("(max-width: 650px)");
if (!mq.matches) {
  const experiencias = document.querySelectorAll(".experiencia-item");
  experiencias.forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      x: -50,
      ease: "back.inOut",
      delay: 0.25,
      scrollTrigger: {
        trigger: element,
        start: "top 95%",
        end: "top 95%",
        // markers: true,
      },
    });
  });
}

