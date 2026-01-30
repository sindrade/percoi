(function() {
    // 1. Buscamos todos os spans da página
    const todosOsSpans = document.querySelectorAll('span');
    
    let somaTotal = 0;
    let itensEncontrados = 0;

    todosOsSpans.forEach(span => {
        // Verifica se o texto do span contém a palavra "Total" (ignorando maiúsculas/minúsculas)
        if (span.innerText.toUpperCase().includes('TOTAL')) {
            
            // Tentativa de pegar o valor: 
            // Algumas vezes o valor está no mesmo span, outras no span vizinho (nextElementSibling)
            let textoValor = span.innerText;
            
            // Se o span do "Total" estiver vazio ou sem números, tentamos o próximo elemento
            if (!/\d/.test(textoValor) && span.nextElementSibling) {
                textoValor = span.nextElementSibling.innerText;
            }

            // Limpeza: remove tudo que não é número ou vírgula, e troca vírgula por ponto
            let valorLimpo = textoValor.replace(/[^\d,]/g, '').replace(',', '.');
            let valorNumerico = parseFloat(valorLimpo);

            if (!isNaN(valorNumerico)) {
                somaTotal += valorNumerico;
                itensEncontrados++;
            }
        }
    });

    // 2. Criar/Atualizar o balão visual
    let display = document.getElementById('balao-faturamento-total');
    if (!display) {
        display = document.createElement('div');
        display.id = 'balao-faturamento-total';
        document.body.appendChild(display);
    }

    // Estilização (mantendo o estilo moderno)
    Object.assign(display.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#1e272e',
        color: '#00d8d6',
        padding: '15px 25px',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
        zIndex: '10000',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        borderLeft: '5px solid #05c46b'
    });

    display.innerHTML = `
        <div style="color: #d2dae2; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Soma de Totais</div>
        <div style="font-size: 22px; font-weight: bold; margin-top: 3px;">
            R$ ${somaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <div style="color: #808e9b; font-size: 10px; margin-top: 5px;">${itensEncontrados} ocorrências de "Total" encontradas</div>
    `;

    console.log(`Faturamento extraído com base na palavra 'Total': R$ ${somaTotal.toFixed(2)}`);
})();
