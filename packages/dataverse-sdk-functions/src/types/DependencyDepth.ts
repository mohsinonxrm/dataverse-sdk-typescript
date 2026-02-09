/**
 * DependencyDepth enum
 */
export enum DependencyDepth {
  Unknown = 0,
  OnDemandWithContext = 1,
  OnDemandWithoutContext = 2,
  OnDemandContextOnly = 3,
  Offline = 4,
  Mobile = 5,
  UserContext = 6,
  NoDependency = 7,
}
