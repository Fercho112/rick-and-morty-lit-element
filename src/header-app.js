import { LitElement, html, css } from "lit";


class HeaderApp extends LitElement {

    static get properties() {
        return {
            hiddenSearch: { type: Boolean }
        }
    }

    constructor() {
        super()
        this.hiddenSearch = false
    }

    static get is() {
        return "header-app"
    }

    static get styles() {
        return css`
            :host {
                display: block;
                flex-shrink: 0;
            }

            .header-wrapper {
                width: 100%;
                height: fit-content;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                padding: 15px 0;
            }

            .title-section {
                width: 100%;
                height: fit-content;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
            }

            .title-main {
                font-size: 30px;
                font-weight: bold;
            }

            .title-sub {
                font-size: 18px;
                font-weight: bold;
            }

            .controls-row {
                width: 100%;
                height: fit-content;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }

            .search-box {
                width: 290px;
                height: fit-content;
                display: flex;
                align-items: center;
                background-color: #e1e1e1ff;
                border-radius: 12px;
                padding: 8px 10px;
            }

            .search-icon {
                width: 20px;
                height: 20px;
                color: gray;
                margin-right: 8px;
            }

            .search-input {
                background-color: transparent;
                border: none;
                outline: none;
                width: 100%;
                color: black;
            }

            .favs-btn {
                display: flex;
                align-items: center;
                gap: 10px;
                border-radius: 12px;
                padding: 3px 12px;
                background-color: #dbeafe;
                cursor: pointer;
            }

            .favs-label {
                color: black;
                font-weight: bold;
            }

            .favs-icon-wrapper {
                width: fit-content;
                height: fit-content;
                background-color: #4f46e5;
                padding: 8px;
                border-radius: 12px;
            }

            .favs-icon {
                width: 20px;
                height: 20px;
                color: white;
            }
        `
    }

    handleInput(event) {
        this.dispatchEvent(new CustomEvent("filter-input", {
            detail: { value: event.target.value },
            bubbles: true,
            composed: true
        }))
    }

    handleFavs() {
        this.dispatchEvent(new CustomEvent("ver-favs", {
            bubbles: true,
            composed: true
        }))
    }

    render() {
        return html`
        <div class="header-wrapper">
            <div class="title-section">
                <span class="title-main">Wubba lubba dub dub!</span>
                <span class="title-sub">Base de datos de personajes de Rick y Morty</span>
            </div>
        
            <div class="controls-row">
                <!-- input -->
                <div class="search-box" style="${this.hiddenSearch ? 'visibility: hidden;' : ''}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" placeholder="Buscar..." class="search-input" @input=${this.handleInput} />
                </div>
        
                <!-- favs -->
                <div class="favs-btn" @click=${this.handleFavs}>
                    <span class="favs-label">${this.hiddenSearch ? 'Todos los personajes' : 'Mis favoritos'}</span>
                    <div class="favs-icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" class="favs-icon" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        `
    }

}


customElements.define(HeaderApp.is, HeaderApp)