import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * InferEntityDefinition action
 *
 * Unbound action
 */
export class InferEntityDefinitionAction implements Executable<InferEntityDefinitionResponse> {
  constructor(
    public readonly languageCode: number,
    public readonly useUserSettings: boolean,
    public readonly userContext: string,
    public readonly solutionPrefix: string,
    public readonly previewData: string,
    public readonly sourceTimeZone: string,
    public readonly parseSampleData: boolean,
    public readonly fileInfo: string,
    public readonly recordId: string,
    public readonly entityDefinition: string,
    public readonly entitiesCollection: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InferEntityDefinition`;

    const body: Record<string, unknown> = {
      LanguageCode: this.languageCode,
      UseUserSettings: this.useUserSettings,
      UserContext: this.userContext,
      SolutionPrefix: this.solutionPrefix,
      PreviewData: this.previewData,
      SourceTimeZone: this.sourceTimeZone,
      ParseSampleData: this.parseSampleData,
      FileInfo: this.fileInfo,
      RecordId: this.recordId,
      EntityDefinition: this.entityDefinition,
      EntitiesCollection: this.entitiesCollection,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InferEntityDefinitionResponse> {
    const data = await response.json();
    return data as InferEntityDefinitionResponse;
  }
}
