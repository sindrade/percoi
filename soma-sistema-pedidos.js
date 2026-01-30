(function() {
    // 1. Localiza todos os spans que seguem o padrão de caminho fornecido
    // O seletor abaixo busca spans dentro da estrutura específica do seu sistema
    const elementos = document.querySelectorAll('div[div] main div div div div div div a div div span');
    
    // Como o XPath é muito específico, vamos usar uma abordagem mais segura via XPath generalizado:
    const xpathExpression = "//div[contains(@class, 'main')]//div//span[contains(text(), ',')]";
    const result = document.evaluate("/html/body/div[1]/div[2]/main/div/div[4]/div/div/div/div[1]/div/a/div[1]/div[4]/span", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    let somaTotal = 0;
    let itensEncontrados = 0;

    // Iterar por todos os elementos encontrados (usando a lógica de lista do seu sistema)
    // Vamos pegar o container pai para garantir que pegamos todos os itens da lista
    const todosOsValores = document.querySelectorAll('main div div div div div a div div:nth-child(4) span');

    todosOsValores.forEach(el => {
        // Limpa o texto (remove R$, espaços e ajusta a vírgula para ponto)
        let texto = el.innerText.replace(/[^\d,]/g, '').replace(',', '.');
        let valor = parseFloat(texto);

        if (!isNaN(valor)) {
            somaTotal += valor;
            itensEncontrados++;
        }
    });

    // 2. Criar o "balão flutuante" visual
    const display = document.createElement('div');
    display.id = 'meu-faturamento-flutuante';
    display.innerHTML = `
        <div style="font-weight: bold; font-size: 12px; margin-bottom: 5px;">Faturamento Total</div>
        <div style="font-size: 18px; color: #2ecc71;">R$ ${somaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        <div style="font-size: 10px; margin-top: 5px; opacity: 0.8;">${itensEncontrados} pedidos somados</div>
    `;

    // 3. Estilização do balão
    Object.assign(display.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        zIndex: '9999',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        border: '2px solid #34495e'
    });

    // Remove balão anterior se existir
    const anterior = document.getElementById('meu-faturamento-flutuante');
    if (anterior) anterior.remove();

    document.body.appendChild(display);

    console.log(`Soma concluída: R$ ${somaTotal.toFixed(2)} em ${itensEncontrados} itens.`);
})();
