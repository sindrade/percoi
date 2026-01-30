(function() {
    // Função principal de cálculo
    function calcularFaturamento() {
        const todosOsSpans = document.querySelectorAll('span');
        let somaTotal = 0;
        let itensEncontrados = 0;

        todosOsSpans.forEach(span => {
            // Filtro por texto "Total" para evitar pegar IDs ou Quantidades
            if (span.innerText.toUpperCase().includes('TOTAL')) {
                let textoValor = span.innerText;
                
                // Se o span do "Total" não tiver números, tenta o próximo elemento (comum em tabelas)
                if (!/\d/.test(textoValor) && span.nextElementSibling) {
                    textoValor = span.nextElementSibling.innerText;
                }

                // Limpeza de caracteres: remove R$, espaços e converte vírgula para ponto
                let valorLimpo = textoValor.replace(/[^\d,]/g, '').replace(',', '.');
                let valorNumerico = parseFloat(valorLimpo);

                if (!isNaN(valorNumerico)) {
                    somaTotal += valorNumerico;
                    itensEncontrados++;
                }
            }
        });

        exibirNoBalao(somaTotal, itensEncontrados);
    }

    // Função para criar ou atualizar a interface visual
    function exibirNoBalao(valor, qtd) {
        let display = document.getElementById('percoi-faturamento-float');
        
        if (!display) {
            display = document.createElement('div');
            display.id = 'percoi-faturamento-float';
            document.body.appendChild(display);
            
            // Estilização com a identidade visual da Percói (Escuro com destaque verde)
            Object.assign(display.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#1e272e',
                color: '#ffffff',
                padding: '12px 20px',
                borderRadius: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                zIndex: '99999',
                fontFamily: 'sans-serif',
                borderLeft: '4px solid #05c46b'
            });
        }

        display.innerHTML = `
            <div style="font-size: 10px; color: #808e9b; text-transform: uppercase; font-weight: bold;">Faturamento Percói</div>
            <div style="font-size: 20px; color: #05c46b; font-weight: bold;">R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div style="font-size: 10px; color: #d2dae2;">${qtd} pedidos na tela</div>
        `;
    }

    // --- AUTOMAÇÃO INTELIGENTE ---
    
    // 1. Executa assim que o script carregar
    calcularFaturamento();

    // 2. Observa mudanças na página (se o usuário filtrar ou carregar mais pedidos)
    const observer = new MutationObserver(() => {
        // Usamos um pequeno delay para não sobrecarregar o processador
        clearTimeout(window.percoiTimer);
        window.percoiTimer = setTimeout(calcularFaturamento, 1000);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    console.log("Percói: Monitor de faturamento ativo.");
})();
