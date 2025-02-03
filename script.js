//cotação moedas
const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

// valores do formulário
const form = document.getElementsByTagName("form")[0];
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");

//manipulando input amount para receber apenas números
amount.addEventListener("input", (e) => {
  const hasCharactersRegex = /\D+/g;
  //se houver caracteres letras, substituí por string vazia (remove texto);
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

//captando evento submit do formulário
form.onsubmit = (e) => {
  e.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

//função para converter moeda
function convertCurrency(amount, price, symbol) {
  try {
    //fazendo os cálculos e formatando
    const total = formatToBRL((amount * price).toFixed(2)).replace("R$", "");
    //mostrando descrição de acordo com moeda selecionada
    document.getElementById(
      "description"
    ).textContent = `${symbol} 1 = ${formatToBRL(price)}`;
    //mostrando resultado da conversão
    document.getElementById("result").textContent = `${total} Reais`;
    //exibindo footer
    footer.classList.add("show-result");
  } catch (error) {
    //remove footer e exibe mensagem de erro
    footer.classList.remove("show-result");
    console.log(error);
    alert("Erro ao converter moeda, tente novamente mais tarde!");
  }
}

//converte valor para número e formata moeda seguindo os padrões do real BRL
function formatToBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
