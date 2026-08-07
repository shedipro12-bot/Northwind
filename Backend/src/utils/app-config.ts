import dotenv from "dotenv";
// Loads .env values into: process.env object:
dotenv.config({ quiet: true })
class AppConfig {
    public readonly port = 4000;
    public readonly mysqlHost = process.env.MYSQL_HOST!;
    public readonly mysqlUser = process.env.MYSQL_USER!;
    public readonly mysqlPassword = process.env.MYSQL_PASSWORD!;
    public readonly mysqlDatabase = process.env.MYSQL_DATABASE!;
    public readonly jwtSecret = process.env.JWT_SECRET!;
    public readonly productImagesBaseUrl = process.env.PRODUCT_IMAGES_BASE_URL!;
}

export const appConfig = new AppConfig();
