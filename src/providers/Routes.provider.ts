import { BehaviorSubject } from 'rxjs';

export interface RouteOptions {
  name: string;
  path: string;
  component: () => JSX.Element;
}

export class RoutesProvider {
  private static _instance: RoutesProvider;
  private routes = new BehaviorSubject<Array<RouteOptions>>([]);

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  /**
   * @public
   * Adiciona uma rota a aplicação
   * @param {RouteOptions} route Rota com suas configurações
   */
  public addRoute = (route: RouteOptions): void => this.routes.next([...this.routes.getValue(), route]);

  /**
   * @public
   * Retorna observável com as rotas dinâmicas da aplicação
   * @returns {BehaviorSubject<Array<RouteOptions>>} Observável com as rotas dinâmicas da aplicação
   */
  public getRoutes = (): BehaviorSubject<Array<RouteOptions>> => this.routes;

  /**
   * @public
   * Define as rotas dinâmicas da aplicação
   * @param {Array<RouteOptions>} routes Rotas dinâmicas da aplicação
   */
  public setRoutes = (routes: Array<RouteOptions>): void => this.routes.next(routes);
}
