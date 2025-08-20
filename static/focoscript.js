let kw = 0;
let hr = 0;
let qt = 0;
let time = null;
let timeb = null;
let good = true;
let precoKWh = 0.75; // preço médio em R$ por kWh

document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("switch");
    const body = document.body;
    const clickSound = document.getElementById("clickSound");

    // Garante que começa no escuro
    body.classList.remove("light-mode");

    toggleSwitch.addEventListener("click", () => {
        body.classList.toggle("light-mode");

        console.log("Classe atual:", body.className); // <-- DEBUG
        clickSound.play();
    });
});



function off() {
    let body = document.getElementById("body");

    if (body.classList.contains("light")) {
        body.classList.remove("light");
        console.log("Modo escuro ativado");
    } else {
        body.classList.add("light");
        console.log("Modo claro ativado");
    }

    playSound();
    getSunsetTime();
}





function playSound() {
    document.getElementById("clickSound").play();
}

function selected(image, yearlykW) {
    playSound();
    kw = yearlykW;
    answer();
    document.querySelectorAll("#unselected").forEach(img => {
        img.style.opacity = "0.5";
        image.style.opacity = "1";
    });
}

function answer() {
    good = true;
    if (kw == 0 || qt == 0 || hr == 0) {
        document.getElementById("answer1").style.animation = "fadeintext 2s forwards";
        document.getElementById("answer1").textContent = "Por favor, preencha todas as informações acima.";
        return;
    }

    document.getElementById("answer1").style.animation = "fadeintext 2s forwards";
    document.getElementById("answer1").textContent =
        "Você gasta cerca de R$ " + ((kw / 8 * hr * 16 / 100 * qt) * precoKWh).toFixed(2) +
        " por ano com essa lâmpada.";

    document.getElementById("answer2").style.animation = "fadeintext 4s forwards";
    document.getElementById("answer3").style.animation = "fadeintext 6s forwards";

    if (hr > (22 - timeb)) {
        good = false;
        document.getElementById("answer2").textContent =
            "Como o sol se põe às " + time + " na sua região, e considerando que você dorme às 22h, suas luzes deveriam ficar ligadas no máximo por " + (22 - timeb) + " horas.";
    } else {
        document.getElementById("answer2").textContent =
            "Você está usando suas luzes pelo tempo adequado. Continue assim!";
    }

    if (kw != 22) {
        good = false;
        document.getElementById("answer3").textContent =
            "Você também pode trocar por uma lâmpada mais eficiente, como a LED, para economizar dinheiro e ajudar o meio ambiente.";
    } else {
        document.getElementById("answer3").textContent =
            "Você já está indo muito bem usando lâmpadas de LED!";
    }

    if (good == true) {
        document.getElementById("answer4").style.animation = "fadeintext 8s forwards";
        document.getElementById("answer4").textContent =
            "Não há dicas adicionais para você no momento. Você está fazendo a sua parte!";
        document.getElementById("answer5").textContent = " ";
    } else {
        document.getElementById("answer4").style.animation = "fadeintext 8s forwards";
        document.getElementById("answer4").textContent =
            "Se você mudar seus hábitos, como usar menos as luzes ou trocar para lâmpadas de LED, pode economizar ainda mais.";
        document.getElementById("answer5").style.animation = "fadeintext 8s forwards";
        document.getElementById("answer5").textContent =
            "Em vez do que você está fazendo agora, você poderia economizar cerca de R$ " +
            ((((107 / 8 * (22 - timeb) * 16 / 100 * qt) - (kw / 8 * hr * 16 / 100 * qt)) * precoKWh).toFixed(2)) +
            " por ano.";
    }
}

function hrchange(inp) {
    hr = document.getElementById("hours").value;
    answer();
}

function qtchange(inp) {
    qt = document.getElementById("qt").value;
    answer();
}

function tanswer(txt) {
    document.getElementById("answer1").style.animation = "fadeintext 2s forwards";
    document.getElementById("answer1").textContent = txt;
}

function getSunsetTime() {
    // Pegar localização do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            // Buscar horário do pôr do sol na API
            fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === "OK") {
                        let sunsetUTC = new Date(data.results.sunset);

                        // Converter para horário local
                        let sunsetLocal = sunsetUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        console.log("Horário do pôr do sol:", sunsetLocal);
                        time = sunsetLocal;
                        timeb = sunsetUTC.getHours();
                        
                    } else {
                        console.error("Falha ao buscar o horário do pôr do sol.");
                    }
                })
                .catch(error => console.error("Erro ao buscar dados:", error));
        }, error => console.error("Erro de geolocalização:", error.message));
    } else {
        console.error("Geolocalização não é suportada neste navegador.");
    }
    answer();
}
// Executa a função inicial
