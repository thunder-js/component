export interface IConfigParams {
  environment: string
}

export interface IConfig {
  host: string
}

export const configFactory = (params: IConfigParams) => (): IConfig => {
  switch (params.environment) {
    case 'dev':
    default:
      return {
        host: '127.0.0.1',
      }
    case 'prod':
      return {
        host: 'prod.com',
      }
  }
}
