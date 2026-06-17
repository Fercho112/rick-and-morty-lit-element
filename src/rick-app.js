import { LitElement, html, css } from "lit"
import "./header-app.js"
import "./personaje-list.js"
import "./favoritos-list.js"
import "./footer-app.js"
import "./loading-spinner.js"
import "./personaje-modal.js"

class RickApp extends LitElement {
    static get properties() {
        return {
            filtro: { state: true },
            pagina: { state: true },
            info: { state: true },
            cargando: { state: true },
            favoritos: { state: true },
            vista: { state: true },
            personajeSeleccionado: { state: true }
        }
    }

    constructor() {
        super()
        this.filtro = ""
        this.pagina = 1
        this.info = {}
        this.cargando = false
        this.favoritos = []
        this.vista = "personajes"
        this.personajeSeleccionado = null
    }

    static get is() {
        return "rick-app"
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                padding: 0 20px;
            }
        `
    }

    // * handles  de carga
    handleCargandoStart() {
        this.cargando = true
    }

    handleCargandoEnd() {
        this.cargando = false
    }

    // * handles de paginacion
    handleSiguiente() {
        if (this.info?.next) this.pagina++
    }

    handleAnterior() {
        if (this.info?.prev) this.pagina--
    }

    handleInfo(event) {
        this.info = event.detail.info
    }

    // * handle de filtro y fav
    handleFiltro(event) {
        this.filtro = event.detail.value
    }

    handleToggleFav(event) {
        const personaje = event.detail.personaje
        const existe = this.favoritos.some(f => f.id === personaje.id)

        if (existe) {
            this.favoritos = this.favoritos.filter(f => f.id !== personaje.id)
        } else {
            this.favoritos = [...this.favoritos, personaje]
        }
    }

    handleVerFavs() {
        this.vista = this.vista === "favoritos" ? "personajes" : "favoritos"
    }

    handleAbrirModal(event) {
        this.personajeSeleccionado = event.detail.personaje
    }

    handleCerrarModal() {
        this.personajeSeleccionado = null
    }

    render() {
        return html`
            ${this.cargando ? html`<loading-spinner></loading-spinner>` : ""}
            ${this.personajeSeleccionado ? html`<personaje-modal .personaje=${this.personajeSeleccionado} @cerrar-modal=${this.handleCerrarModal}></personaje-modal>` : ""}
            
            <header-app ?hiddenSearch=${this.vista === "favoritos"} @filter-input=${this.handleFiltro}
                @ver-favs=${this.handleVerFavs}>
            </header-app>
            
            ${this.vista === "favoritos"
            ? html`<favoritos-list .favoritos=${this.favoritos} @toggle-fav=${this.handleToggleFav}>
            </favoritos-list>`
            : html`
            <personaje-list filtro=${this.filtro} pagina=${this.pagina} .favoritos=${this.favoritos}
                @info-updated=${this.handleInfo} @toggle-fav=${this.handleToggleFav} @cargando-start=${this.handleCargandoStart}
                @cargando-end=${this.handleCargandoEnd} @abrir-modal=${this.handleAbrirModal}>
            </personaje-list>
            <footer-app .info=${this.info} paginaActual=${this.pagina} @siguiente=${this.handleSiguiente}
                @anterior=${this.handleAnterior}>
            </footer-app>
            `}
        `
    }



}

customElements.define(RickApp.is, RickApp)