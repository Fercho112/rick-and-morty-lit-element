import { LitElement, html, css } from "lit";

class PersonajeModal extends LitElement {

    static get properties() {
        return {
            personaje: { type: Object }
        }
    }

    constructor() {
        super()
        this.personaje = null
    }

    static get is() {
        return "personaje-modal"
    }

    static get styles() {
        return css`
            .overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 150;
            }

            .modal {
                background: white;
                border-radius: 16px;
                width: 420px;
                max-width: 90vw;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                animation: pop 0.2s ease-out;
            }

            @keyframes pop {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }

            img {
                width: 100%;
                height: 280px;
                object-fit: cover;
            }

            .content {
                padding: 24px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .nombre {
                font-size: 1.5rem;
                font-weight: bold;
                color: #1e1b4b;
            }

            .info-row {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .label {
                font-size: 0.875rem;
                color: #6b7280;
            }

            .valor {
                font-size: 1rem;
                font-weight: 500;
                color: #111827;
            }

            .status {
                font-weight: 600;
            }

            .status.alive { color: green; }
            .status.dead { color: red; }
            .status.unknown { color: gray; }

            .close-btn {
                margin-top: 8px;
                width: 100%;
                padding: 10px;
                border: none;
                border-radius: 8px;
                background-color: #4f46e5;
                color: white;
                font-size: 1rem;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 150ms ease;
            }

            .close-btn:hover {
                background-color: #4338ca;
            }
        `
    }

    handleClose(e) {
        if (e.target === e.currentTarget || e.target.classList.contains('close-btn')) {
            this.dispatchEvent(new CustomEvent("cerrar-modal", {
                bubbles: true,
                composed: true
            }))
        }
    }

    render() {
        if (!this.personaje) return html``

        return html`
            <div class="overlay" @click=${this.handleClose}>
                <div class="modal">
                    <img src=${this.personaje.image} alt=${this.personaje.name} />
                    <div class="content">
                        <span class="nombre">${this.personaje.name}</span>

                        <div class="info-row">
                            <span class="label">Estado</span>
                            <span class="valor status ${this.personaje.status.toLowerCase()}">${this.personaje.status}</span>
                        </div>

                        <div class="info-row">
                            <span class="label">Especie</span>
                            <span class="valor">${this.personaje.species}</span>
                        </div>

                        <div class="info-row">
                            <span class="label">Origen</span>
                            <span class="valor">${this.personaje.origin?.name}</span>
                        </div>

                        <div class="info-row">
                            <span class="label">Última ubicación</span>
                            <span class="valor">${this.personaje.location?.name}</span>
                        </div>

                        <button class="close-btn" @click=${this.handleClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define(PersonajeModal.is, PersonajeModal)
