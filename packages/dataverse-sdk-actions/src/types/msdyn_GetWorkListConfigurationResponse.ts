/**
 * msdyn_GetWorkListConfigurationResponse complex type
 */
export interface msdyn_GetWorkListConfigurationResponse {
  IsEnabledForUser?: boolean;
  SettingsInstance?: string;
  ViewsList?: string;
  SequenceRecords?: Record<string, unknown>[];
  SuggestionRecords?: Record<string, unknown>[];
}
