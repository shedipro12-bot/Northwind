class AppConfig {
    public readonly serverUrl = import.meta.env.VITE_SERVER_URL
	public readonly productsUrl = this.serverUrl + "/api/products";
	public readonly employeesUrl = this.serverUrl + "/api/employees";
    public readonly registerUrl = this.serverUrl + "/api/register";
    public readonly loginUrl = this.serverUrl + "/api/login";
	public readonly topProductsUrl = this.serverUrl + "/api/products/top-three";
    public readonly recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    public readonly openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    public readonly mcpServerUrl = "https://pointedly-enteric-yee.ngrok-free.dev/sse";
    public readonly openaiUrl = "https://api.openai.com/v1/responses";
}

export const appConfig = new AppConfig();
