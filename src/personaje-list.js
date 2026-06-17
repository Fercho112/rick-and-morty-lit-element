import { LitElement, html, css } from "lit";
import { fetchCharacters } from "./services/rick-api.js";
import "./personaje-card.js"
import "./error-message.js"


class PersonajeList extends LitElement {

    static get properties() {
        return {
            personajes: { state: true },
            filtro: { type: String },
            pagina: { type: Number },
            info: { state: true },
            favoritos: { type: Array },
            error: { state: true }
        }
    }

    constructor() {
        super()
        this.personajes = []
        this.filtro = ""
        this.pagina = 1
        this.info = {}
        this.favoritos = []
        this.abortController = null
        this.error = null
    }

    static get is() {
        return "personaje-list"
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
                margin: 10px auto;
            }
        `
    }

    firstUpdated() {
        this.getCharacters()
    }

    updated(changedProperties) {
        if (!this.hasUpdated) return

        if (changedProperties.has("filtro")) {
            clearTimeout(this.debounceTimer)
            this.debounceTimer = setTimeout(() => this.getCharacters(), 700)
        } else if (changedProperties.has("pagina")) {
            clearTimeout(this.debounceTimer)
            this.getCharacters()
        }
    }

    async getCharacters() {
        this.error = null
        this.dispatchEvent(new CustomEvent("cargando-start", { bubbles: true, composed: true }))

        if (this.abortController) {
            this.abortController.abort()
        }
        this.abortController = new AbortController()

        try {
            const data = await fetchCharacters(this.pagina, this.filtro, this.abortController.signal);
            this.personajes = data.results

            this.dispatchEvent(new CustomEvent("info-updated", {
                detail: { info: data.info },
                bubbles: true,
                composed: true
            }))

        } catch (error) {
            if (error.name === "AbortError") return
            this.error = error.message
            this.personajes = []
        } finally {
            this.dispatchEvent(new CustomEvent("cargando-end", { bubbles: true, composed: true }))
        }
    }


    render() {
        if (this.error) {
            return html`<error-message mensaje=${this.error}></error-message>`
        }

        return html`
        <div class="grid-container">
            ${this.personajes.map(p => html`
            <personaje-card nombre=${p.name} status=${p.status} species=${p.species} imagen=${p.image} personajeId=${p.id}
                ?isFav=${this.favoritos.some(f=> f.id === p.id)}>
            </personaje-card>
            `)}
        </div>
        `
    }

}


customElements.define(PersonajeList.is, PersonajeList)