import './iconButton.js';

class FooterBlock extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .footer {
                    background: var(--footer-bg);
                    border: var(--border1);
                    border-radius: var(--radius20);
                    padding: var(--mobile-section-side-padding);
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    max-width: 900px;
                    box-shadow: var(--hard-shadow-buttom);
                }

                .top {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    justify-content: center;
                }

                .head {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                .top h4 {
                    margin: 0;
                    font-weight: var(--font-bold);
                    font-size: 16px;
                    color: var(--text-black-heading);
                    align-content: center;
                }
                p, a {
                    font-size: 14.8px;
                    margin: 0;
                    color: var(--text-black-body);
                }

                /* Info Section */
                .footer-info {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    width: 40%;
                }
                .footer-info img {
                    width: 32px;
                    height: 32px;
                }
                .social-icons {
                    display: flex;
                    gap: 8px;
                    color: var(--text-black-body);
                }
                icon-button {
                    border-radius: 50%;
                    border: var(--border1);
                    transition: var(--transition-slow);
                }
                icon-button:hover {
                    border-color: var(--hover);
                }

                /* Menu Section */
                .options a {
                    text-decoration: none;
                    margin: 4px 0;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    transition: var(--transition-slow);
                }
                .options a:hover {
                    color: var(--hover);
                    transform: translateX(4px);
                }

                /* Contact Section */
                .contact-list {
                    display: flex;
                    gap: 8px;
                    margin: 4px 0;
                }
                svg {
                    flex-shrink: 0;
                    color: var(--text-black-body);
                }

                /* Bottom Section */
                .bottom {
                    border-top: var(--border1);
                    padding-top: 20px;
                }
                .bottom p {
                    margin: 0;
                    font-size: 13px;
                    text-align: center;
                }

                /* RESPONSIVE */
                @media (max-width: 768px) {
                    .top {
                        justify-content: left;
                    }
                    .footer-info {
                        width: 100%;
                    }
                }
            </style>

            <div class="footer">
            
                <div class="top">
                    <!-- LEFT SECTION -->
                    <div class="footer-info">
                        <div class="info-text">
                            <div class="head" id="head1">
                                <img src="image/public/wapi-logo.png" alt="">
                                <h4> West Africa People’s Institute </h4>
                            </div> 

                            <p>
                                West Africa People's Institute (WAPI), Calabar is dedicated to nurturing young minds 
                                through quality education, discipline, and values that inspire lifelong learning and leadership.
                            </p>
                        </div>
                        
                        <div class="social-icons">
                            <icon-button href="https://web.facebook.com/wapisof/">
                                <svg slot="svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.15152 8.61116C4.33672 8.61116 4.16667 8.77108 4.16667 9.53708V10.926C4.16667 11.6921 4.33672 11.8519 5.15152 11.8519H7.12121V17.4075C7.12121 18.1735 7.29126 18.3334 8.10606 18.3334H10.0758C10.8906 18.3334 11.0606 18.1735 11.0606 17.4075V11.8519H13.2723C13.8903 11.8519 14.0495 11.739 14.2193 11.1804L14.6413 9.7915C14.9321 8.83458 14.7529 8.61116 13.6943 8.61116H11.0606V6.29638C11.0606 5.78501 11.5015 5.37045 12.0454 5.37045H14.8485C15.6633 5.37045 15.8333 5.21057 15.8333 4.44452V2.59267C15.8333 1.82662 15.6633 1.66675 14.8485 1.66675H12.0454C9.32584 1.66675 7.12121 3.73951 7.12121 6.29638V8.61116H5.15152Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                                </svg>
                            </icon-button>

                            <icon-button href="">
                                <svg slot="svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.08334 9.99992C2.08334 6.26797 2.08334 4.40199 3.24271 3.24262C4.40209 2.08325 6.26806 2.08325 10 2.08325C13.7319 2.08325 15.5979 2.08325 16.7573 3.24262C17.9167 4.40199 17.9167 6.26797 17.9167 9.99992C17.9167 13.7318 17.9167 15.5978 16.7573 16.7573C15.5979 17.9166 13.7319 17.9166 10 17.9166C6.26806 17.9166 4.40209 17.9166 3.24271 16.7573C2.08334 15.5978 2.08334 13.7318 2.08334 9.99992Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                                    <path d="M13.75 10C13.75 12.0711 12.0711 13.75 10 13.75C7.92893 13.75 6.25 12.0711 6.25 10C6.25 7.92893 7.92893 6.25 10 6.25C12.0711 6.25 13.75 7.92893 13.75 10Z" stroke="currentColor" stroke-width="1.5"/>
                                    <path d="M14.5898 5.41675H14.5823" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                        
                            </icon-button>
                        </div>
                    </div>

                    <!-- MENU -->
                    <div class="footer-menu">
                        <div class="head" id="head2">
                            <h4> Links </h4>
                        </div> 

                        <div class="options">
                            <a href="index.html"> Home </a>
                            <a href="about.html"> About us </a>
                            <a href="contact.html"> Contact </a>
                            <a href="admission.html"> Admissions </a>
                            <a href="gallery.html"> Gallery </a>

                        </div>
                    </div>

                    <!-- CONTACT -->
                    <div class="footer-contact">
                        <div class="head" id="head3">
                            <h4> Contacts </h4>
                        </div> 
                        <div class="contact-list"> 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                            <p> WAPI Road, Calabar, Cross River State, Nigeria </p> 
                        </div>

                        <div class="contact-list"> 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9.1585 5.71223L8.75584 4.80625C8.49256 4.21388 8.36092 3.91768 8.16405 3.69101C7.91732 3.40694 7.59571 3.19794 7.23592 3.08785C6.94883 3 6.6247 3 5.97645 3C5.02815 3 4.554 3 4.15597 3.18229C3.68711 3.39702 3.26368 3.86328 3.09497 4.3506C2.95175 4.76429 2.99278 5.18943 3.07482 6.0397C3.94815 15.0902 8.91006 20.0521 17.9605 20.9255C18.8108 21.0075 19.236 21.0485 19.6496 20.9053C20.137 20.7366 20.6032 20.3132 20.818 19.8443C21.0002 19.4463 21.0002 18.9721 21.0002 18.0238C21.0002 17.3756 21.0002 17.0515 20.9124 16.7644C20.8023 16.4046 20.5933 16.083 20.3092 15.8362C20.0826 15.6394 19.7864 15.5077 19.194 15.2444L18.288 14.8418C17.6465 14.5567 17.3257 14.4141 16.9998 14.3831C16.6878 14.3534 16.3733 14.3972 16.0813 14.5109C15.7762 14.6297 15.5066 14.8544 14.9672 15.3039C14.4304 15.7512 14.162 15.9749 13.834 16.0947C13.5432 16.201 13.1588 16.2403 12.8526 16.1952C12.5071 16.1443 12.2426 16.0029 11.7135 15.7202C10.0675 14.8405 9.15977 13.9328 8.28011 12.2868C7.99738 11.7577 7.85602 11.4932 7.80511 11.1477C7.75998 10.8415 7.79932 10.4571 7.90554 10.1663C8.02536 9.83828 8.24905 9.56986 8.69643 9.033C9.14586 8.49368 9.37058 8.22402 9.48939 7.91891C9.60309 7.62694 9.64686 7.3124 9.61719 7.00048C9.58618 6.67452 9.44362 6.35376 9.1585 5.71223Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            <p> +234 810 123 4567 </p> 
                        </div>

                        <div class="contact-list"> 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                            </svg>
                            <p> info@wapicalabar.edu.ng </p> 
                        </div>
                    </div>
                </div>

                <div class="bottom">
                    <p>&copy; <span id="current-year"></span> West Africa People’s Institute (WAPI). All rights reserved.</p>
                </div>
            </div>
        `;

        const currentYear = this.shadowRoot.querySelector("#current-year");
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }


    }

}

customElements.define("footer-block", FooterBlock);