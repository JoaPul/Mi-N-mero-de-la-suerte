//cuentas utilizadas
let cuent = { Guapo_03: "1236", Shicuelo35: "malote93", ChicoRudo: "Cacahuate" };

//variables Globales
let taken = [];
let selected = [];
let indice = [];

//SACAR LOS tAKES
const Take = () => {
  let config = {
    method: "GET",
    url: "https://mipesoganador-0de7.restdb.io/rest/items",
    headers: {
      "x-api-key": "624e2f3c67937c128d7c95a6",
    },
  };
  async function getData() {
    try {
      let res = await axios(config);
      let response = await res.data;

      for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < response[i].numbers.length; j++) {
          console.log(response[i].numbers[0]);
          let v = parseInt(response[i].numbers[j].replace("n", "0"));
          indice[v][1] = `
          <div class="NUMT" id="${response[i].numbers[j]}" value="T" onclick="select('${response[i].numbers[j]}')">
            <p>${response[i].numbers[j].replace("n", "")}</p>
          </div>
          `;
        }
      }
      let ind = "";
      for (let k = 0; k < indice.length; k++) {
        ind += indice[k][1];
      }
      console.log("si");
      document.getElementById("num").innerHTML = ind;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("esto se ejecutara independiente de si es catch o try");

      // console.log(indice[106][1]);
      for (let i = 0; i < indice.length; i++) {
        let a = "";
        i < 10 ? (a = `000${i}`) : i < 100 ? (a = `00${i}`) : i < 1000 ? (a = `0${i}`) : i < 10000 ? (a = `${i}`) : (a = `${i}`);
        // console.log(`n${a}`);
        if (document.getElementById(`n${a}`).getAttribute("value") == "T") {
          indice[i][1] = `
      <div class="NUMT" id="n${a}" value="T" onclick="select('n${a}')">
      <p>${a}</p>
      </div>`;
          taken.push(a);
        }
      }
      document.getElementById("conT").innerHTML = `Ya Tomados: ${taken.length}`;
    }
  }

  getData();
};

//INSERCION DE DIVS CON NÚMEROS
const inicio = () => {
  document.getElementById("btnR").setAttribute("onclick", "aleaOp()");
  document.getElementById("inputS").value = "";
  document.getElementById("inputS").setAttribute("onkeyup", "Luck()");

  if (indice.length == 0) {
    for (let i = 0; i < 10000; i++) {
      let a = "";
      i < 10 ? (a = `000${i}`) : i < 100 ? (a = `00${i}`) : i < 1000 ? (a = `0${i}`) : i < 10000 ? (a = `${i}`) : (a = `${i}`);
      indice.push([
        `${i}`,
        `
      <div class="NUM" id="n${a}" value="N" onclick="select('n${a}')">
        <p>${a}</p>
      </div>
      `,
      ]);
    }
  }
  // else {
  //   for (let i = 0; i < indice.length; i++) {
  //     ind += indice[i][1];
  //   }
  // }
  document.getElementById("num").innerHTML = "<h1 style='color:white; font-size:25px; display:flex; align-content:center; justify-content:center; align-items: center; width: 100%; height:300px;'>Cargando...<h1>";
  Take();
};
inicio();

//Seleccion de Números
const select = (a) => {
  // console.log(a);

  if (document.getElementById(a).getAttribute("value") == "N") {
    document.getElementById(a).setAttribute("class", "NUMS");
    document.getElementById(a).setAttribute("value", "S");
    selected.push(a);
    document.getElementById("con").innerHTML = `Seleccionados: ${selected.length}`;
    // console.log(selected);
    let b = a;
    let c = a;
    b = b.split("");
    b[0] = "0";
    b = parseInt(b.join(""));
    c = c.split("");
    c.shift();
    c = c.join("");
    indice[b][1] = `
    <div class="NUMS" id="${a}" value="S" onclick="select('${a}')">
      <p>${c}</p>
    </div>
    `;
    // console.log(indice[b]);
  } else if (document.getElementById(a).getAttribute("value") == "S") {
    document.getElementById(a).setAttribute("class", "NUM");
    document.getElementById(a).setAttribute("value", "N");
    let aux = [];
    selected.filter((element) => {
      if (element != a) {
        aux.push(element);
      }
    });
    selected = aux;
    // console.log(selected);
    document.getElementById("con").innerHTML = `Seleccionados: ${selected.length}`;
    let b = a;
    let c = a;
    b = b.split("");
    b[0] = "0";
    b = parseInt(b.join(""));
    c = c.split("");
    c.shift();
    c = c.join("");
    indice[b][1] = `
    <div class="NUM" id="${a}" value="N" onclick="select('${a}')">
      <p>${c}</p>
    </div>
    `;
    // console.log(indice[b]);
  }
};

//Número de la suerte
const Luck = () => {
  let aind = "";
  let bus = `${document.getElementById("inputS").value}`;
  console.log(bus);
  if (bus == "" || bus < 0) {
    ind = "";
    for (let i = 0; i < indice.length; i++) {
      ind += indice[i][1];
    }
    document.getElementById("num").innerHTML = ind;
    document.getElementById("inputS").setAttribute("placeholder", "Busca tu número de la suerte");
  } else {
    for (let i = 0; i < indice.length; i++) {
      let str = ``;
      i < 10 ? (str = `000${i}`) : i < 100 ? (str = `00${i}`) : i < 1000 ? (str = `0${i}`) : i < 10000 ? (str = `${i}`) : (str = `${i}`);
      if (str.includes(bus) && parseInt(bus) < 10000) {
        aind += indice[i][1];
      }
      // aind += aux[i][1];
    }

    document.getElementById("num").innerHTML = aind;
  }
};
const placeRem = () => {
  document.getElementById("inputS").setAttribute("placeholder", "");
};

//POPUP Aleatorio
const aleaOp = () => {
  document.getElementById("inputS").value = "";
  Luck();
  document.getElementById("pop").setAttribute(
    "style",
    `
  z-index: 7;
  `
  );
  document.getElementById("pop").innerHTML = `
    <div class="popConte" id="popConte">
      <div class="popCe" id="popCe" onclick="aleaClo()">
        <p>X</p>
      </div>
      <div class="popText" id="popText">
        <h1 class="popTitle" id="popTitle">Selecciona la cantidad de números aleatorios</h1>
        <div class="canti" id="canti">
          <input type="number" class="inputA" id="inputA" />
          <button class="Listo" id="Listo" onclick="aleat()">Listo</button>
        </div>
      </div>
    </div>
  `;
};
const aleaClo = () => {
  document.getElementById("pop").setAttribute(
    "style",
    `
  z-index: -1;
  `
  );
};
const aleaClos = () => {
  document.getElementById("pop").setAttribute(
    "style",
    `
  z-index: -1;
  `
  );
  inicio();
};

//ALEATORIO
const aleat = () => {
  let v = document.getElementById("inputA").value;
  if (v != "") {
    v = parseInt(v);
    if (v >= 0 && v < 10000) {
      // console.log(v);
      if (v < indice.length - selected.length - taken.length) {
        // console.log(indice.length - selected.length - tacken.length);
        for (let i = 0; i < v; i++) {
          let chan = true;
          while (chan) {
            let j = Math.round(Math.random() * 9999);
            let a = "";
            if (j <= 9999) {
              j < 10 ? (a = `000${j}`) : j < 100 ? (a = `00${j}`) : j < 1000 ? (a = `0${j}`) : j < 10000 ? (a = `${j}`) : (a = `${j}`);
              if (document.getElementById(`n${a}`).getAttribute("value") == "N") {
                select(`n${a}`);
                chan = false;
              }
            }
          }
        }
        document.getElementById("popTitle").innerHTML = `Se han seleccionado ${v} números`;
        document.getElementById("inputA").value = "";
      } else {
        document.getElementById("popTitle").innerHTML = "No puedes escoger tantos números";
      }
    } else {
      document.getElementById("popTitle").innerHTML = "No puedes escoger tantos números";
    }
  }
};

//POPUP CARRITO DE COMPRAS
const Carrito = () => {
  document.getElementById("btnR").setAttribute("onclick", "");
  document.getElementById("inputS").value = "";
  Luck();
  document.getElementById("inputS").setAttribute("onkeyup", "");
  document.getElementById("num").innerHTML = `
    <div class="popConte" id="popConte">
      <div class="popCe" id="popCe" onclick="inicio()">
        <p>X</p>
      </div>
      <div class="ListCont" id="ListCont">
        <h1 class="popList" id="popList">Estos son los números seleccionados</h1>
        <div class="cantiC" id="cantiC">
          <div class="Lista" id="Lista"></div>
          <div class="CarB" id="CarB">
            <input type="text" class="inputU" id="inputU" placeholder="Introduce el usuario"/>
            <input type="password" class="inputC" id="inputC" placeholder="Introduce la contraseña"/>
            <button class="Listo" id="Listo" onclick="enviar()" style="display:inline;">Listo</button>
          </div>
          <h1 class="popEr" id="popEr"></h1>
          </div>
      </div>
    </div>
  `;
  if (selected.length < 300) {
    document.getElementById("Lista").setAttribute("style", `justify-content: center;`);
  } else {
    document.getElementById("Lista").setAttribute("style", `justify-content: flex-start;`);
  }
  let lista = "";
  let c = 1;
  for (let i = 0; i < selected.length; i++) {
    let a = selected[i];
    a = a.split("");
    a.shift();
    a = a.join("");
    // console.log(a);
    if (c == 1) {
      lista += `<div><ul><li>${a}</li> `;
      c += 1;
    } else if (c == 30) {
      lista += `<li>${a}</li></ul></div>`;
      c = 1;
    } else {
      lista += `<li>${a}</li>`;
      c += 1;
    }
    if (i == selected.length - 1 && c != 30) {
      lista += `</ul></div>`;
    }
  }
  document.getElementById("Lista").innerHTML = `${lista}`;
};

const enviar = () => {
  console.log(document.getElementById("inputU").value);
  if (document.getElementById("inputU").value != "") {
    if (document.getElementById("inputC").value != "") {
      document.getElementById("popEr").innerHTML = "";
      let config = {
        method: "POST",
        url: "https://mipesoganador-0de7.restdb.io/rest/items",
        headers: {
          "x-api-key": "624e2f3c67937c128d7c95a6",
        },
        data: {
          user: document.getElementById("inputU").value,
          password: document.getElementById("inputC").value,
          numbers: selected,
        },
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          document.getElementById("inputC").value = "";
          document.getElementById("inputU").value = "";
          document.getElementById("Listo").innerHTML = "Transacción Completada con Exito";
          document.getElementById("Listo").setAttribute("style", `display:none;`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      document.getElementById("popEr").innerHTML = "Esa Contraseña no se puede usar";
    }
  } else {
    document.getElementById("popEr").innerHTML = "Esa Usuario no se puede usar";
  }
};

const Elim = () => {
  console.log(taken.length);
  document.getElementById("inputS").value = "";
  Luck();
  document.getElementById("pop").setAttribute(
    "style",
    `
  z-index: 7;
  `
  );
  document.getElementById("pop").innerHTML = `
    <div class="popConte" id="popConte">
      <div class="popCe" id="popCe" onclick="aleaClos()">
        <p>X</p>
      </div>
      <div class="popText" id="popText">
        <h1 class="popTitle" id="popTitle">Que número quieres eliminar?</h1>
        <div class="canti" id="canti">
          <input type="text" class="inputA" id="inputUs" placeholder="Introduce tu usuario" />
          <input type="password" class="inputA" id="inputCo" placeholder="Introduce tu contraseña"/>
          <input type="number" class="inputA" id="inputNu" placeholder="Introoduce el número"/>
          <button class="Listo" id="Listo" onclick="Toma()">Listo</button>
        </div>
      </div>
    </div>
  `;
};

const Toma = async () => {
  let config = {
    method: "get",
    url: "https://mipesoganador-0de7.restdb.io/rest/items",
    headers: {
      "x-api-key": "624e2f3c67937c128d7c95a6",
    },
  };

  axios(config)
    .then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].user == document.getElementById("inputUs").value) {
          if (response.data[i].password == document.getElementById("inputCo").value) {
            let arr = [];
            response.data[i].numbers.filter((element) => {
              if (element != `n${document.getElementById("inputNu").value}`) {
                arr.push(element);
              }
            });
            console.log[arr];
            if (arr != response.data[i].numbers) {
              // "Content-Type": "application/json",
              let conf = {
                method: "put",
                url: `https://mipesoganador-0de7.restdb.io/rest/items/${response.data[i]._id}?x-apikey=624e2f3c67937c128d7c95a6`,
                headers: {
                  "x-api-key": "624e2f3c67937c128d7c95a6",
                },
                data: {
                  numbers: arr,
                },
              };
              axios(conf)
                .then(() => {
                  document.getElementById("popTitle").innerHTML = "Cambios realizados con exito";
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              document.getElementById("popTitle").innerHTML = "Este número no se encuetra en el perfil del usuario";
            }
          } else {
            document.getElementById("popTitle").innerHTML = "El contraseña esta incorrecta";
          }
        } else {
          document.getElementById("popTitle").innerHTML = "El usuario que mensionas no existe";
        }
      }
    })
    .catch(function (error) {
      document.getElementById("popTitle").innerHTML = "Este número no se encuetra en el perfil del usuario";
      console.log(error);
    });
};
