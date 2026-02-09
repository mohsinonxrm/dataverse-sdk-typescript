/**
 * Configuration options for Application Insights telemetry client
 */
export interface ApplicationInsightsConfig {
  /**
   * Application Insights connection string
   */
  connectionString: string;

  /**
   * Optional cloud role name for distributed tracing
   */
  cloudRoleName?: string;

  /**
   * Whether to disable telemetry (defaults to false)
   */
  disableTelemetry?: boolean;
}
