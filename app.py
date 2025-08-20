from flask import Flask, render_template, request, redirect
import mysql.connector

app = Flask(__name__)

# ===== Configurações de cálculo =====
# Potência típica por tipo de lâmpada (em Watts)
POWER_WATTS = {
    "Incandescente": 60,
    "Halógena": 50,
    "CFL": 14,  # Fluorescente compacta
    "LED": 9
}

# Custo médio de energia (R$/kWh)
COST_KWH = 0.95


def conectar():
    return mysql.connector.connect(
        host="localhost",
        port=3306,
        user="ju",                 # <<-- seu usuário criado
        password="senha", # <<-- sua senha aqui
        database="ecoquiz"
    )

def obter_estatisticas():
    """Retorna médias e totais da tabela respostas_lampadas."""
    conn = conectar()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            AVG(nLampadas) AS mediaLampadas,
            AVG(nHoras)    AS mediaHoras,
            AVG(gasto)     AS mediaGasto,
            COUNT(*)       AS totalRespostas,
            SUM(gasto)     AS somaGasto
        FROM respostas_lampadas
    """)
    dados = cursor.fetchone() or {}
    conn.close()
    return dados

@app.route("/", methods=["GET"])
def index():
    return render_template('index.html', content="Homepage")

@app.route("/electricity", methods=["GET"])
def electricity():
    dados = obter_estatisticas()
    # Página sem "resultado pessoal" quando só acessa via GET
    return render_template("focos.html", dados=dados, resultado=None)

@app.route("/salvar_dados", methods=["POST"])
def salvar_dados():
    # Coleta do formulário (sem gasto – será calculado)
    nLampadas = int(request.form["nLampadas"])
    nHoras = int(request.form["nHoras"])
    tipo = request.form["tipo"]

    # Potência do tipo escolhido (W → kW)
    power_w = POWER_WATTS.get(tipo, 0)
    power_kw = power_w / 1000.0

    # Consumo anual (kWh) = nLampadas * power_kW * horas/dia * 365
    consumo_kwh_ano = nLampadas * power_kw * nHoras * 365

    # Gasto estimado (R$)
    gasto = consumo_kwh_ano * COST_KWH

    # Salva no banco
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO respostas_lampadas (nLampadas, nHoras, tipo, gasto) VALUES (%s, %s, %s, %s)",
        (nLampadas, nHoras, tipo, round(gasto, 2))
    )
    conn.commit()
    conn.close()

    # Recalcula estatísticas para exibir na mesma tela
    dados = obter_estatisticas()

    # Monta um "resultado pessoal" para mostrar ao usuário
    resultado = {
        "nLampadas": nLampadas,
        "nHoras": nHoras,
        "tipo": tipo,
        "power_w": power_w,
        "consumo_kwh_ano": consumo_kwh_ano,
        "custo_kwh": COST_KWH,
        "gasto": gasto
    }

    return render_template("focos.html", dados=dados, resultado=resultado)


@app.route("/water", methods=['GET'])
def water():
    return render_template('water.html')


@app.route("/garbage", methods=['GET'])
def garbage():
    return render_template('trash.html')


@app.route("/plants", methods=['GET'])
def plants():
    return render_template("Plants.html")


@app.route("/vehicles", methods=['GET'])
def vehicles():
    return render_template("vehicles.html")


if __name__ == "__main__":
    app.run(debug=True)
