import appRootPath from "app-root-path";

const settings = {
    baseUrl: new URL(String(process.env.BASE_URL)),
    logLevel: String(process.env.LOG_LEVEL),
    rootPath: appRootPath.path,
    walletAddress: String(process.env.WALLET_ADDRESS)
};

export {settings};
