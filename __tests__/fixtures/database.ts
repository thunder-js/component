import { IConfig } from './config';

export interface IDatabaseDependencies {
  config: IConfig
}

export interface IDatabase {
  connection: any
}

export const databaseFactory = () => (dependencies: IDatabaseDependencies): IDatabase => {
  return {
    connection: {
      host: dependencies.config.host,
    },
  }
}
