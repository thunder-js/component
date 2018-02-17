import { newSystem } from '../src'
import { configFactory } from './fixtures/config'
import { databaseFactory } from './fixtures/database'

describe('newSystem', () => {
  it('should return a new system from 2 components', () => {
    const componentMap = {
      config: {
        factory: configFactory({ environment: 'dev' }),
        dependencies: [],
      },
      database: {
        factory: databaseFactory(),
        dependencies: ['config'],
      },
    }
    const system = newSystem({
      componentMap,
    })

    expect(system).toEqual({
      config: { host: '127.0.0.1' },
      database: {
        connection: {
          host: '127.0.0.1',
        },
      },
    })
  });
});
