// GSAP GreenSock trabaja con el objeto "gsap"

//* .from
// Lo que hace el from es hacer la animación de aparicióm, finalizando en el lugar NORMAL o por defecto del elemento. (como un fade in)
/*
gsap.from(selector, {objeto con propiedades css})
*/
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

//# solo para el ejemplo usé el .to y el timeline, pero prefiero mucho más el .from
// charsTL.to(sobreMiSplit.chars, {
//   y: -100,
//   ease: "back.inOut",
//   duration: 1,
//   opacity: 0,
//   delay: 2,
// }, ".-2.5"); //<- delay en segundos (negativo para que empiece antes)

//* Trigger - Scroll animations

//* Otro efecto para los titulos
// const titulos = document.querySelectorAll(".titulo");
// const titulosSplited = new SplitType(".titulo", { types: "words, chars" });
// gsap.registerPlugin(ScrollTrigger); //! SIN ESTO NO FUNCIONA

// titulos.forEach((element) => {
//   gsap.to(element, {
//     scrollTrigger: {
//       trigger: element, // elemento disparador
//       start: "center center", // "'elemento' 'pantalla'" osea que cuando el TOP del elemento llegue al CENTER del viewport height EMPIEZA la animación
//       end: "bottom center", // "'elemento' 'pantalla'" osea que cuando el BOTTOM del elemento llegue al CENTER del viewport height TERMINA la animación
//       // scrub: true, // para que se mueva con el scroll (podemos darle un NUM que hace que sea más suavizado)
//       toggleActions: "play none none none", //cuando bajamos hace PLAY, cuando terminamos de bajar NONE, cuando subimos NONE y cuando terminamos de subir REVERSE
//       //$              ⬇-   ⬇_   ⬆_   ⬆-
//       markers: true, //% SUPER UTIL activarlo para el desarrollo
//     },
//     onStart: () => {
//       gsap.to(titulosSplited.chars, {
//         y: -20,
//         duration: 0.5,
//         delay: 0.5,
//         onComplete: () => {
//           gsap.to(element, {
//             y: 0,
//             duration: 0.5,
//           });
//         },
//       });
//     },
//   });
// });

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
    //  markers: true,
    },
  });
});
