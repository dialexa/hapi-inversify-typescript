export interface IAction<S, T> {
  execute(s: S): Promise<T>
}
