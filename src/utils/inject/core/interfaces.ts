export interface InjectionContext<I extends { [name: string]: any }> {
  instances: I
  getInstance(name: string): any
}
