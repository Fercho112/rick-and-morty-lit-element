import { LitElement, html, css } from "lit";

class PersonajeCard extends LitElement {

    static get properties() {
        return {
            nombre: { type: String },
            status: { type: String },
            species: { type: String },
            imagen: { type: String },
            personajeId: { type: Number },
            isFav: { type: Boolean }
        }
    }

    constructor() {
        super()
        this.nombre = ""
        this.status = ""
        this.species = ""
        this.imagen = ""
    }

    static get is() {
        return "personaje-card"
    }

    static get styles() {
        return css`
            .card-character{
                display: flex;
                flex-direction: column;
                justify-content: center;
                box-sizing: border-box;
                width: 100%;
                padding: 20px;
                gap: 25px;
                border-radius: 10px;
                background-color: #e1e1e1ff;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            }

            img{
                border-radius: 10px;
                width: 100%;
                height: 280px;
                object-fit: cover;
                background-color: #c8c8c8;
            }

            .card-container{
                display: flex;
                flex-direction: column;
                width: 100%;
                align-items: center;
            }

            .info-container {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 0 10px;
            }

            .text-container {
                display: flex;
                flex-direction: column;
            }

            .text, .status {
                font-size: 15px;
            }

            .status.alive {
                color: green;
            }

            .status.dead {
                color: red;
            }

            .status.unknown {
                color: gray;
            }

            .favorite-button {
                flex-shrink: 0;
                background-color: #f1f5f9;
                padding: 10px;
                border-radius: 9999px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 150ms ease;
                border: none;
                cursor: pointer;
            }

            .favorite-button:hover {
                background-color: #e2e8f0;
            }

            .favorite-icon {
                width: 20px;
                height: 20px;
                color: #2b5b84;
            }
        `
    }


    handleFav(e) {
        e.stopPropagation()
        this.dispatchEvent(new CustomEvent("toggle-fav", {
            detail: {
                personaje: {
                    id: this.personajeId,
                    name: this.nombre,
                    image: this.imagen,
                    status: this.status,
                    species: this.species
                }
            },
            bubbles: true,
            composed: true
        }))
    }


    render() {
        return html`
        <div class="card-character">
            <div class="card-container">
                <img src=${this.imagen} alt=${this.nombre} />
            </div>
            <div class="info-container">
                <div class="text-container">
                    <span class="text">Nombre: ${this.nombre.length > 10 ? this.nombre.slice(0, 10) + '...' : this.nombre}</span>
                    <span class="status ${this.status.toLowerCase()}">Estado: ${this.status}</span>
                    <span class="text">Especie: ${this.species}</span>
                </div>
        
                <div>
                    <button class="favorite-button" @click=${this.handleFav}>
                        ${this.isFav
                            ? html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gold" class="favorite-icon">
                                <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd" />
                            </svg>`
                            : html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="favorite-icon">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>`
                        }
                    </button>
                </div>
        
            </div>
        
        </div>
        `
    }
}





customElements.define(PersonajeCard.is, PersonajeCard)