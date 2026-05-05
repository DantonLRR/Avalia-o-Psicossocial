class ToastNotification {
    constructor() {
        this.init();
    }

    init() {
        // Cria o container no DOM se ele não existir
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
    }

    /**
     * Exibe uma notificação na tela
     * @param {string} type - 'success' ou 'error'
     * @param {string} title - Título da mensagem
     * @param {string} message - Mensagem detalhada
     * @param {number} duration - Tempo em milissegundos (padrão: 4000)
     */
    show(type, title, message, duration = 4000) {
        const container = document.getElementById('toast-container');

        // Cria o elemento do toast
        const toast = document.createElement('div');
        toast.className = `custom-toast ${type}`;

        // Define o ícone com base no tipo
        const icon = type === 'success' ? '✔️' : '⚠️';

        toast.innerHTML = `
            <span class="icon">${icon}</span>
            <div class="text-content">
                <span class="title">${title}</span>
                <span class="description">${message}</span>
            </div>
        `;

        container.appendChild(toast);

        // Força o reflow para a transição css funcionar
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove após o tempo definido
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }
}

// Inicializa a classe para uso global
const Notifier = new ToastNotification();
// Exemplo de uso para falso:
        // if (cpf.length < 14) {
            // 1. PRIMEIRO: Evita que a página recarregue
            // e.preventDefault(); 
            
            // 2. DEPOIS: Mostra a mensagem
            // Notifier.show('error', 'Atenção', 'Por favor, preencha o CPF completo antes de prosseguir.');
            
            // 3. FINALMENTE: Para a execução
            // return false; 
        // }
// Exemplo de uso para sucesso:
// Notifier.show('success', 'Sucesso', 'Operação realizada com sucesso.');