import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from InferEntityDefinition action
 */
export interface InferEntityDefinitionResponse {
  FileInfo: string;
  UsingFallbackLogic: boolean;
  EntitiesCollection: string;
  EntityDefinition: string;
  SampleData: string;
}

/**
 * Parameters of the InferEntityDefinition action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InferEntityDefinitionActionParameters {
  LanguageCode?: number;
  UseUserSettings?: boolean;
  UserContext?: string;
  SolutionPrefix: string;
  PreviewData?: string;
  SourceTimeZone?: string;
  ParseSampleData?: boolean;
  FileInfo?: string;
  RecordId: string;
  EntityDefinition?: string;
  EntitiesCollection?: string;
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
      LanguageCode: this.parameters.LanguageCode,
      UseUserSettings: this.parameters.UseUserSettings,
      UserContext: this.parameters.UserContext,
      SolutionPrefix: this.parameters.SolutionPrefix,
      PreviewData: this.parameters.PreviewData,
      SourceTimeZone: this.parameters.SourceTimeZone,
      ParseSampleData: this.parameters.ParseSampleData,
      FileInfo: this.parameters.FileInfo,
      RecordId: this.parameters.RecordId,
      EntityDefinition: this.parameters.EntityDefinition,
      EntitiesCollection: this.parameters.EntitiesCollection,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as InferEntityDefinitionResponse;
  }
}
