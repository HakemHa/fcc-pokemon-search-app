const pokeInput = document.querySelector('#search-input');
const pokeBtn = document.querySelector('#search-button');
pokeBtn.addEventListener("click", () => {

  const fpokeInput = format(pokeInput.value);
  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${fpokeInput}`).then((res)=>res.json()).then((data)=>{
    let {name, id, weight, height, sprites, types, stats} = data;
    types = types.map((obj)=>obj['type']['name']);
    const sprite = sprites["front_default"];
    populateDisplay(name, id, weight, height, sprite, types);
    populateStats(stats);
      }).catch((err)=>alert("Pokémon not found"));
});

const format = (name) => {
  if (parseInt(name)) {
    return name;
  }
  name = name.toLowerCase();
  let alpha = {};
  for (const l of "abcdefghijklmnopqrstuvwxyz ♀♂") {
    alpha[l] = true;
  }
  name = name.split('');
  name = name.filter((c)=>alpha.hasOwnProperty(c)).join("");
  name = name.replace(" ", "-");
  name = name.replace("♀", "-f");
  name = name.replace("♂", "-m");
  return name
};
const populateDisplay = (name, id, weight, height, sprite, types) => {
  document.querySelector("#pokemon-name").innerText = name.toUpperCase();
  document.querySelector("#pokemon-id").innerText = `#${id}`;
  document.querySelector("#weight").innerText = `Weight: ${weight}`;
  document.querySelector("#height").innerText = `Height: ${height}`;
  document.querySelector(".display-img").src = sprite;
  document.querySelector(".display-img").alt = `${name} pokemon`;
  document.querySelector("#types").innerHTML = "";
  for (const type of types) {
    document.querySelector("#types").innerHTML += `<p class="${type}">${type.toUpperCase()}</p>`;
  }
}
const populateStats = (stats) => {
  document.querySelector("#hp").innerText = stats[0]['base_stat'];
  document.querySelector("#attack").innerText = stats[1]['base_stat'];
  document.querySelector("#defense").innerText = stats[2]['base_stat'];
  document.querySelector("#special-attack").innerText = stats[3]['base_stat'];
  document.querySelector("#special-defense").innerText = stats[4]['base_stat'];
  document.querySelector("#speed").innerText = stats[5]['base_stat'];
}
