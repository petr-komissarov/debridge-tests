class ConfigModel {
    baseUrl: URL = new URL(String(process.env.BASE_URL))
    maxRetries: number = Number(process.env.MAX_RETRIES)
    walletAddress: string = String(process.env.WALLET_ADDRESS)
}

export const config: ConfigModel = new ConfigModel()
