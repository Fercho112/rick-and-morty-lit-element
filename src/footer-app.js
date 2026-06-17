import { LitElement, html, css } from "lit";


class FooterApp extends LitElement {

    static get properties() {
        return {
            info: { type: Object },
            paginaActual: { type: Number }
        }
    }

    constructor() {
        super()
        this.info = {}
        this.paginaActual = 1
    }

    static get is() {
        return "footer-app"
    }

    static get styles() {
        return css`
            :host {
                display: block;
                flex-shrink: 0;
            }

            .pagination-wrapper {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                background-color: #fff;
            }

            .pagination-controls {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 12px;
            }

            .page-btn {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                border: 1px solid #e5e7eb;
                background-color: #fff;
                color: #4b5563;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: background-color 0.2s, border-color 0.2s, color 0.2s;
            }

            .page-btn:hover:not(:disabled) {
                background-color: #4f46e5;
                border-color: #4f46e5;
                color: #fff;
            }

            .page-btn:disabled {
                background-color: #f3f4f6;
                color: #9ca3af;
                border-color: #e5e7eb;
                cursor: not-allowed;
            }

            .page-btn--current {
                background-color: #4f46e5;
                border-color: #4f46e5;
                color: #fff;
                font-weight: bold;
                cursor: default;
            }

            .page-btn--current:hover {
                background-color: #4f46e5;
            }

            .nav-icon {
                width: 16px;
                height: 16px;
            }
        `
    }

    handlePrevious() {
        this.dispatchEvent(new CustomEvent("anterior", {
            bubbles: true,
            composed: true
        }))
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent("siguiente", {
            bubbles: true,
            composed: true
        }))
    }

    render() {
        return html`
            <section class="pagination-wrapper">
                <div class="pagination-controls">

                    <!-- boton regresar -->
                    <button class="page-btn" ?disabled="${!this.info?.prev}" @click="${this.handlePrevious}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24"
                            stroke-width="3" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <!-- Página Actual -->
                    <button class="page-btn page-btn--current">${this.paginaActual}</button>

                    <!-- boton adelante -->
                    <button class="page-btn" ?disabled="${this.info?.next === null}" @click="${this.handleNext}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24"
                            stroke-width="3" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                </div>
            </section>
        `
    }

}


customElements.define(FooterApp.is, FooterApp)