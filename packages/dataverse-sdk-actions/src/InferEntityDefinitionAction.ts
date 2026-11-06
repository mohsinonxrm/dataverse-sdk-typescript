import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the InferEntityDefinition action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InferEntityDefinitionResponse {
  "@odata.context"?: string;
  EntitiesCollection: string;
  EntityDefinition: string;
  FileInfo: string;
  SampleData: string;
  UsingFallbackLogic: boolean;
}

/**
 * Parameters of the InferEntityDefinition action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InferEntityDefinitionActionParameters {
  FileInfo?: string;
  ParseSampleData?: boolean;
  RecordId: string;
  LanguageCode?: number;
  EntitiesCollection?: string;
  UseUserSettings?: boolean;
  EntityDefinition?: string;
  SourceTimeZone?: string;
  UserContext?: string;
  SolutionPrefix: string;
  PreviewData?: string;
}

/**
 * InferEntityDefinition action
 *
 * Unbound action
 */
export class InferEntityDefinitionAction implements Executable<InferEntityDefinitionResponse> {
  constructor(public readonly parameters: InferEntityDefinitionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InferEntityDefinition`;

    const body = requestBody({
      FileInfo: this.parameters.FileInfo,
      ParseSampleData: this.parameters.ParseSampleData,
      RecordId: this.parameters.RecordId,
      LanguageCode: this.parameters.LanguageCode,
      EntitiesCollection: this.parameters.EntitiesCollection,
      UseUserSettings: this.parameters.UseUserSettings,
      EntityDefinition: this.parameters.EntityDefinition,
      SourceTimeZone: this.parameters.SourceTimeZone,
      UserContext: this.parameters.UserContext,
      SolutionPrefix: this.parameters.SolutionPrefix,
      PreviewData: this.parameters.PreviewData,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InferEntityDefinitionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as InferEntityDefinitionResponse;
  }
}
