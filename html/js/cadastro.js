let txtMega = document.querySelector("#phMega");
let txtPreco = document.querySelector("#Price");
const cpf = document.querySelector("#cpf");
const email = document.querySelector("#email");
const rg = document.querySelector("#rg");
const nome = document.querySelector("#nome");
const tel = document.querySelector("#tel");
const date = document.querySelector("#data");
const botaoAvancar = document.querySelector(".botao");

//* Recupera os dados referentes ao plano escolhido e o preço
const recuperarDados = () => {
  txtMega.textContent = `${localStorage.getItem("mega")}`;
  txtPreco.innerHTML = `${localStorage.getItem("valor")}`;
};

//* Valida se o cpf digitado segue o padrão
const isCpf = (cpf) => {
  let test = /\d+\.\d+\.\d+-\d+/;
  cpf = cpf.replace(/^\s+|$\s+/g, "");
  if (test.test(cpf)) {
    if (validateCpf(cpf)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

//* Valida se o rg digitado segue o padrão
const isRG = (rg) => {
  let test = /\d+\.\d+\.\d+-\d+/;
  rg = rg.replace(/^\s+|$\s+/g, "");
  if (test.test(rg)) {
    if (validateRg(rg)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

//* Valida se a data digitada segue o padrão
const isDate = (date) => {
  let test = /\d+\/\d+\/\d+/;
  if (test.test(date)) {
    return true;
  } else {
    return false;
  }
};

//! WIP
/* const validarEmail = (email) => {

} */

//* Verifica se o cpf é válido
const validateCpf = (cpf) => {
  let soma = 0;
  let resto;
  let strCpf = cpf.split(".").join("").split("-").join("");

  if (strCpf == "00000000000") {
    return false;
  }

  for (i = 1; i <= 9; i++) {
    soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) {
    resto = 0;
  }

  if (resto != parseInt(strCpf.substring(9, 10))) {
    return false;
  }

  soma = 0;
  for (i = 1; i <= 10; i++) {
    soma += parseInt(strCpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) {
    resto = 0;
  }
  if (resto != parseInt(strCpf.substring(10, 11))) {
    return false;
  }
  return true;
};

//* Verifica se o rg é válido
const validateRg = (rg) => {
  let soma = 0;
  let strRg = rg.split(".").join("").split("-").join("");
  if (strRg == "000000000") {
    return false;
  }
  strRg = strRg.split("");
  for (let i = 7; i >= 0; i--) {
    switch (i) {
      case 7:
        soma += strRg[i] * 9;
        break;
      case 6:
        soma += strRg[i] * 8;
        break;
      case 5:
        soma += strRg[i] * 7;
        break;
      case 4:
        soma += strRg[i] * 6;
        break;
      case 3:
        soma += strRg[i] * 5;
        break;
      case 2:
        soma += strRg[i] * 4;
        break;
      case 1:
        soma += strRg[i] * 3;
        break;
      case 0:
        soma += strRg[i] * 2;
        break;
      default:
        break;
    }
  }
  if ((soma + strRg[8] * 100) % 11 == 0) {
    return true;
  }
  return false;
};

//* Valida se todos os inputs estão corretos e então habilita o botão
const habilitarBotao = () => {
  if (
    cpf.value.length === 14 &&
    nome.value.length >= 3 &&
    email.value.length >= 3 &&
    rg.value.length === 12
  ) {
    if (
      (isCpf(cpf.value) || cpf.value == "111.111.111-11") &&
      (isRG(rg.value) || rg.value == "11.111.111-1") &&
      isDate(date.value)
    ) {
      botaoAvancar.disabled = false;
      return;
    } else {
      botaoAvancar.disabled = true;
    }
  } else {
    botaoAvancar.disabled = true;
  }
};

date.addEventListener("input", () => {
  let effect = document.querySelector(".effect-8#data~.focus-border");
  date.style.borderColor = "#ccc"
  effect.style.setProperty("--effectwow", "#3399FF")
  if(date.value.length >= 10) {
    validateDate()
  }
})
date.addEventListener("change", () => {
  let effect = document.querySelector(".effect-8#data~.focus-border");
  date.style.borderColor = "#ccc"
  effect.style.setProperty("--effectwow", "#3399FF")
})

date.addEventListener("blur", (e) => {
  validateDate();
});

//* Verifica se a data digitada representa uma pessoa entre 18 a 125 anos
const validateDate = () => {
  partesData = date.value.split("/");
  let testData = `${partesData[2]}`;
  let dataTest = new Date();
  dataTest = dataTest.toString().split(" ");
  if (dataTest[3] - testData >= 18 && dataTest[3] - testData <= 125) {
    let effect = document.querySelector(".effect-8#data~.focus-border");
    date.style.borderColor = "#ccc"
    effect.style.setProperty("--effectwow", "#3399FF")
    habilitarBotao();
  } else {
    let effect = document.querySelector(".effect-8#data~.focus-border");
    date.style.borderColor = "red"
    effect.style.setProperty("--effectwow", "red");
  }
}

//* Permite que ao apertar enter, o botão seja acionado
const keyboard = (event) => {
  if (
    event.keyCode === 13 &&
    botaoAvancar.disabled == false
  ) {
    botaoAvancar.click();
  }
};

cpf.addEventListener("keypress", keyboard);
email.addEventListener("keypress", keyboard);
rg.addEventListener("keypress", keyboard);
nome.addEventListener("keypress", keyboard);

//* Máscara do Cpf

document.addEventListener("DOMContentLoaded", () => {
  new Cleave("#cpf", {
    delimiters: [".", ".", "-"],
    blocks: [3, 3, 3, 2],
    numericOnly: true,
  });
});

//* Máscara do RG

document.addEventListener("DOMContentLoaded", () => {
  new Cleave("#rg", {
    delimiters: [".", ".", "-"],
    blocks: [2, 3, 3, 1],
    numericOnly: true,
  });
});

//* Máscara do Telefone

document.addEventListener("DOMContentLoaded", () => {
  new Cleave("#tel", {
    delimiters: ["(", ") ", " ", "-"],
    blocks: [0, 2, 1, 4, 4],
    numericOnly: true,
  });
});

//* Máscara da Data

document.addEventListener("DOMContentLoaded", () => {
  new Cleave("#data", {
    date: true,
    datePattern: ["d", "m", "Y"]
  })
})
