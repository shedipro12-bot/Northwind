class Appconfig {
	public readonly productsUrl = "http://localhost:4000/api/products";
	public readonly employeesUrl = "http://localhost:4000/api/employees";
	public readonly registerUrl = "http://localhost:4000/api/register";
	public readonly loginUrl = "http://localhost:4000/api/login";
	public readonly topProductsUrl = "http://localhost:4000/api/products/top-three";
}

export const appConfig = new Appconfig();
