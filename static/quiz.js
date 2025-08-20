const questions = [
  {
    question: "Com que frequência você recicla garrafas plásticas?",
    answers: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
    weights: [100, 75, 50, 25, 0], // Peso de CO₂ para cada resposta
  },
  {
    question: "Com que frequência você separa o lixo orgânico?",
    answers: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
    weights: [100, 75, 50, 25, 0],
  },
  {
    question: "Quanto lixo você produz por semana?",
    answers: ["Muito pouco", "Pouco", "Moderado", "Muito", "Exagerado"],
    weights: [0, 25, 50, 75, 100],
  },
  {
    question: "Você faz compostagem dos restos de comida?",
    answers: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
    weights: [100, 75, 50, 25, 0],
  },
  {
    question: "Você usa sacolas reutilizáveis ao fazer compras?",
    answers: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
    weights: [100, 75, 50, 25, 0],
  },
  {
    question: "Com que frequência você utiliza transporte público?",
    answers: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
    weights: [100, 75, 50, 25, 0],
  },
  {
    question: "Você apaga as luzes ao sair de um cômodo?",
    answers: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
    weights: [100, 75, 50, 25, 0],
  },
  {
    question: "Com que frequência você compra itens de segunda mão?",
    answers: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
    weights: [100, 75, 50, 25, 0],
  },
  {
    question: "Você reduz o consumo de água em casa?",
    answers: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
    weights: [100, 75, 50, 25, 0],
  },
  {
    question: "Com que frequência você consome carne?",
    answers: ["Diariamente", "Várias vezes por semana", "Uma vez por semana", "Raramente", "Nunca"],
    weights: [100, 75, 50, 25, 0],
  },
];

// Variáveis globais
let currentQuestion = 0;
let userAnswers = [];
let totalCO2 = 0;
const maxCO2 = 1000; // Máxima pegada de CO₂ possível

// Carregar a pergunta atual
function loadQuestion() {
  const questionText = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers-container");
  const nextButton = document.getElementById("next-button");

  questionText.textContent = questions[currentQuestion].question;
  answersContainer.innerHTML = "";

  questions[currentQuestion].answers.forEach((answer, index) => {
    const button = document.createElement("div");
    button.textContent = answer;
    button.classList.add("scale-button");

    if (index < 2) {
      button.style.borderColor = "#4CAF50"; // Verde
    } else if (index === 2) {
      button.style.borderColor = "#999"; // Cinza
    } else {
      button.style.borderColor = "#9C27B0"; // Roxo
    }

    button.onclick = () => {
      selectAnswer(index, button);
      nextButton.style.display = "block";
    };
    answersContainer.appendChild(button);
  });
}

// Selecionar uma resposta
function selectAnswer(index, button) {
  const buttons = document.querySelectorAll(".scale-button");
  buttons.forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");
  userAnswers[currentQuestion] = index;
  updateCO2Indicator();
}

// Atualizar o indicador de CO₂
function updateCO2Indicator() {
  const co2Progress = document.getElementById("co2-progress");
  const co2Footprint = calculateCO2Footprint(userAnswers);
  const percentage = (co2Footprint / maxCO2) * 100;
  co2Progress.style.width = `${percentage}%`;
  darkenBackground(co2Footprint);
}

// Calcular a pegada de CO₂
function calculateCO2Footprint(answers) {
  let totalCO2 = 0;
  answers.forEach((answer, index) => {
    totalCO2 += questions[index].weights[answer];
  });
  return totalCO2;
}

// Escurecer o fundo conforme a pegada de CO₂
function darkenBackground(co2Footprint) {
  const body = document.body;
  const opacity = Math.min((co2Footprint / maxCO2) * 0.8, 0.8); // Limita a opacidade a 0.8
  body.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
}

// Mostrar os resultados
function showResults() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("output-container").classList.remove("hidden");

  const co2Footprint = calculateCO2Footprint(userAnswers);
  document.getElementById("output-text").textContent = `Suas emissões estimadas de CO₂ são de ${co2Footprint.toFixed(2)} kg por ano.`;

  darkenBackground(co2Footprint);
  showEmissionsChart();
  showImpactMap();
  showPersonalizedTips();
}

// Mostrar o gráfico de emissões
function showEmissionsChart() {
  const ctx = document.getElementById("emissionsChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Antes da Reciclagem", "Depois da Reciclagem"],
      datasets: [
        {
          label: "Emissões de CO₂ (kg)",
          data: [1200, calculateCO2Footprint(userAnswers)], // Dados de exemplo
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
  document.getElementById("chart-container").classList.remove("hidden");
}

// Mostrar o mapa de impacto
function showImpactMap() {
  const mapContainer = document.getElementById("map");
  mapContainer.innerHTML = `<img src="/static/images/world-map.png" alt="Mapa do Mundo" style="width: 100%; height: auto;">`;
  document.getElementById("map-container").classList.remove("hidden");
}

// Mostrar dicas personalizadas
function showPersonalizedTips() {
  const tipsList = document.getElementById("tips-list");
  tipsList.innerHTML = `
    <li>Comece a reciclar garrafas plásticas e papel.</li>
    <li>Use sacolas reutilizáveis nas compras.</li>
    <li>Faça compostagem dos restos de alimentos para reduzir resíduos orgânicos.</li>
    <li>Doe roupas usadas em vez de jogá-las fora.</li>
  `;
  document.getElementById("tips-container").classList.remove("hidden");
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  loadQuestion();

  document.getElementById("next-button").addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

  document.getElementById("restart-button").addEventListener("click", () => {
    currentQuestion = 0;
    userAnswers = [];
    totalCO2 = 0;
    document.getElementById("output-container").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
    updateCO2Indicator();
  });
});
