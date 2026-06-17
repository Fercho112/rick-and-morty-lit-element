import { LitElement, html, css } from "lit";
import "./personaje-card.js"

class FavoritosList extends LitElement {

    static get properties() {
        return {
            favoritos: { type: Array }
        }
    }

    constructor() {
        super()
        this.favoritos = []
    }

    static get is() {
        return "favoritos-list"
    }

    static get styles() {
        return css`
            :host {
                display: block;
                flex-grow: 1;
                overflow-y: auto;
            }
            .grid-container{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
                margin: 0 auto;
            }
            .empty {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 80px;
                text-align: center;
                gap: 8px;
            }
            .empty-titulo {
                font-size: 2.25rem;
                font-weight: bold;
                color: #1e1b4b;
            }
            .empty-subtexto {
                font-size: 1.125rem;
                font-weight: 500;
                color: #4f46e5;
            }
            .empty-img {
                width: 384px;
                height: 384px;
                object-fit: contain;
                margin-top: 16px;
            }
        `
    }

    reenviarFav(e) {
        this.dispatchEvent(new CustomEvent("toggle-fav", {
            detail: e.detail,
            bubbles: true,
            composed: true
        }))
    }

    render() {
        if (this.favoritos.length === 0) {
            return html`
                <div class="empty">
                    <span class="empty-titulo">¡Aww, geez!</span>
                    <span class="empty-subtexto">Tu lista de favoritos está más vacía que los logros de Jerry.</span>
                    <img class="empty-img" src="/pepinillo.jpeg" alt="pepinillo" />
                </div>
            `
        }

        return html`
        <div class="grid-container">
            ${this.favoritos.map(f => html`
                <personaje-card nombre=${f.name} status=${f.status} species=${f.species} imagen=${f.image} personajeId=${f.id}
                    ?isFav=${true} @toggle-fav=${this.reenviarFav}>
                </personaje-card>
            `)}
        </div>
        `
    }

}


customElements.define(FavoritosList.is, FavoritosList)