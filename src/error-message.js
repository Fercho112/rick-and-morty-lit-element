import { LitElement, html, css } from "lit";

class ErrorMessage extends LitElement {

    static get properties() {
        return {
            mensaje: { type: String }
        }
    }

    constructor() {
        super()
        this.mensaje = ""
    }

    static get is() {
        return "error-message"
    }

    static get styles() {
        return css`
            .overlay {
                position: fixed;
                inset: 0;
                background: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 16px;
                z-index: 200;
            }

            .titulo {
                font-size: 1.5rem;
                font-weight: bold;
                color: #ef4444;
                animation: pulse 1.5s ease-in-out infinite;
            }

            .subtexto {
                font-size: 1.25rem;
                font-weight: bold;
                color: #ef4444;
                animation: pulse 1.5s ease-in-out infinite;
            }

            .imagen {
                width: 384px;
                height: 384px;
                object-fit: cover;
                margin-top: 16px;
            }

            .btn {
                background-color: #3b82f6;
                color: white;
                padding: 8px 16px;
                border-radius: 8px;
                border: none;
                font-size: 1rem;
                cursor: pointer;
                transition: background-color 150ms ease;
            }

            .btn:hover {
                background-color: #2563eb;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
            }
        `
    }

    handleReload() {
        window.location.reload()
    }

    render() {
        return html`
            <div class="overlay">
                <span class="titulo">Oh no, algo salió mal</span>
                <span class="subtexto">${this.mensaje}</span>
                <img class="imagen" src="/evil_morty.webp" alt="evil morty" />
                <button class="btn" @click=${this.handleReload}>Reiniciar juego</button>
            </div>
        `
    }
}

customElements.define(ErrorMessage.is, ErrorMessage)
