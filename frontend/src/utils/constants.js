export let env = 'dev'; // dev = developement; prod = production -> Switch this value between envs

export const MONTHS = {
  1 : "Janvier",
  2 : "Fevrier",
  3 : "Mars",
  4 : "Avril",
  5 : "Mai",
  6 : "Juin",
  7 : "Juillet",
  8 : "Août",
  9 : "Septembre",
  10 : "Octobre",
  11 : "Novembre",
  12 : "Décembre"
}

export const ORIGIN = env === 'dev' ? "http://localhost:5000" : document.location.origin;