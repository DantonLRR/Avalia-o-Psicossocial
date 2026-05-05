class SurveyApp {
constructor() {
    this.form = document.getElementById('accessForm');
    this.container = document.getElementById('card-content');
    this.cpfInput = $('#cpfInput');

    // Validação de segurança: se o container não existir, nem inicializa
    if (!this.container || !this.form) {
        console.error("Erro de inicialização: Elementos do DOM não encontrados.");
        return;
    }

    this.init();
}

    init() {
        // 1. Aplica a máscara de CPF imediatamente
        this.cpfInput.mask('000.000.000-00', { reverse: false });

        // 2. Vincula os eventos
        this.bindEvents();
    }

    bindEvents() {
        // Toda a lógica de envio passa por aqui
        this.form.addEventListener('submit', (e) => this.handleLogin(e));
    }

    async handleLogin(e) {
        e.preventDefault(); // Para o recarregamento da página

        const cpfValue = this.cpfInput.val();

        // Validação de Negócio
        if (cpfValue.length < 14) {
            Notifier.show('error', 'Atenção', 'Por favor, preencha o CPF completo antes de prosseguir.');
            return; // Para a execução aqui
        }

        try {
            // Chamada para o PHP (conforme discutido para gerar o UUID de 36 posições)
            const response = await fetch('pages/processa_token.php', {
                method: 'POST',
                body: new URLSearchParams({ 'cpf': cpfValue })
            });

            const data = await response.json();

            if (data.success) {
                // Aqui o sistema gera o token e "esquece" o CPF para garantir o anonimato 
                this.renderSuccess(data.uuid);
            } else {
                Notifier.show('error', 'Erro', data.message || 'CPF não autorizado.');
            }

        } catch (error) {
            Notifier.show('error', 'Erro Crítico', 'Não foi possível conectar ao servidor.');
        }
    }

    renderSuccess(uuid) {
        // Atualiza o conteúdo do card conforme a nova imagem (Protocolo Confirmado)
        this.container.innerHTML = `
            <div class="text-center animate__animated animate__fadeIn">
                <div class="mb-3">
                    <i class="bi bi-check-circle-fill text-success" style="font-size: 3rem;"></i>
                </div>
                <h2 class="card-title">Protocolo Confirmado</h2>
                <p class="card-subtitle">Seu protocolo de confirmação foi gerado com sucesso</p>
                
                <div class="protocol-box my-4 p-3 border rounded shadow-sm bg-light" style="border-style: dashed !important; border-color: #ced4da !important;">
                    <small class="text-muted d-block mb-2">CÓDIGO DE ACESSO</small>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <strong id="uuidText" class="fs-5" style="letter-spacing: 1px;">${uuid}</strong>
                        <button class="btn btn-sm btn-outline-secondary" onclick="app.copyToClipboard()" title="Copiar código">
                            <i class="bi bi-copy"></i>
                        </button>
                    </div>
                </div>

                <div class="alert alert-secondary py-2" style="font-size: 0.85rem; background-color: #f8faf9; border-color: #edf2ef; color: #556b5a;">
                    Copie o código acima e clique em continuar para acessar a pesquisa
                </div>

                <button class="btn btn-success w-100 py-2 mt-3" style="background-color: #1b3d1b; border: none; font-weight: 600;">
                    Continuar para Pesquisa
                </button>
            </div>
        `;
    }

    copyToClipboard() {
        const text = document.getElementById('uuidText').innerText;
        navigator.clipboard.writeText(text).then(() => {
            Notifier.show('success', 'Copiado!', 'Protocolo copiado para a área de transferência.');
        });
    }
}

// Inicializa a aplicação
const app = new SurveyApp();