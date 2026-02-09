import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * InferEntityDefinition request message
 *
 * Web API Action: InferEntityDefinition
 */
export class InferEntityDefinitionRequest
  extends OrganizationRequest
  implements Executable<InferEntityDefinitionResponse>
{
  constructor(
    public languageCode: number,
    public useUserSettings: boolean,
    public userContext: string,
    public solutionPrefix: string,
    public previewData: string,
    public sourceTimeZone: string,
    public parseSampleData: boolean,
    public fileInfo: string,
    public recordId: string,
    public entityDefinition: string,
    public entitiesCollection: string
  ) {
    super("InferEntityDefinition");
  }

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
    return InferEntityDefinitionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
  }
}

/**
 * InferEntityDefinition response message
 */
export class InferEntityDefinitionResponse extends OrganizationResponse {
  constructor(public result: InferEntityDefinitionResponse) {
    super("InferEntityDefinition");
  }

  static fromResponse(data: unknown): InferEntityDefinitionResponse {
    return new InferEntityDefinitionResponse((data as any).value);
  }
}
