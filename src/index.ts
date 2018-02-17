import { topoSort } from '@thunder-js/toposort'

export interface IComponent {
  factory: (dependencies: any) => any,
  dependencies: string[],
}
export interface IComponentMap {
  [name: string]: IComponent
}

export interface ISystemParams {
  componentMap: IComponentMap
}

const componentMapToGraph = (componentMap: IComponentMap) => Object.keys(componentMap).reduce((acc, componentId) => {
  const component = componentMap[componentId]
  return [
    ...acc, {
      id: componentId,
      edges: component.dependencies,
    },
  ]
}, [])

export const newSystem = (params: ISystemParams) => {
  const graph = componentMapToGraph(params.componentMap)
  const sorted = topoSort(graph)

  return sorted.reduce((acc, componentId) => {
    const component = params.componentMap[componentId]
    const dependencies = component.dependencies.reduce((depAcc, dependencyId) => ({
      ...acc,
      [dependencyId]: acc[dependencyId],
    }), {})

    return {
      ...acc,
      [componentId]: component.factory(dependencies),
    }
  }, {})
}
