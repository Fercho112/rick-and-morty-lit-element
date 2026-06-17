import { LitElement, html, css } from "lit";

class LoadingSpinner extends LitElement {

    static get is() {
        return "loading-spinner"
    }

    static get styles() {
        return css`
            .overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.4);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 16px;
                z-index: 100;
            }

            .texto {
                font-size: 1.875rem;
                font-weight: bold;
                color: #22c55e;
                animation: pulse 1.5s ease-in-out infinite;
            }

            .portal {
                width: 384px;
                height: 384px;
                object-fit: cover;
                margin-top: 16px;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
            }
        `
    }

    render() {
        return html`
            <div class="overlay">
                <span class="texto">Calculando coordenadas de la dimensión C-137</span>
                <img class="portal" src="/portal.gif" alt="portal" />
            </div>
        `
    }
}

customElements.define(LoadingSpinner.is, LoadingSpinner)
