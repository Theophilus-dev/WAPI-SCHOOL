class AdmissionBanner extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .banner {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 20px 20px;
                    height: 220px;
                    background: var(--primary-bold);
                    border-radius: var(--radius10);
                }

                .banner h2 {
                    font-weight: var(--font-semibold);
                    text-align: center;
                    font-size: 24px;
                    margin: 0;
                    margin-bottom: -14px;
                    color: var(--text-white-heading);
                }

                .banner p {
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                    color: var(--text-white-body);
                    max-width: 1100px;
                    margin-bottom: 1rem;
                }

                .apply-button {
                    box-shadow: var(--soft-shadow-button);
                }

            </style>

            <div class="banner">
                <h2>Admission Open</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                
                <custom-button class="apply-button" label="Apply Now" variant="inverse-primary" href="pages/admission.html" target="_blank"></custom-button>
            </div>
        `;
    }

}

customElements.define("admission-banner", AdmissionBanner);
