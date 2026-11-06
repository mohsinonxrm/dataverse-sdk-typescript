import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { InferEntityDefinitionResponse as InferEntityDefinitionResponseData } from "./types/index.js";

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
    public languageCode: number | undefined,
    public useUserSettings: boolean | undefined,
    public userContext: string | undefined,
    public solutionPrefix: string,
    public previewData: string | undefined,
    public sourceTimeZone: string | undefined,
    public parseSampleData: boolean | undefined,
    public fileInfo: string | undefined,
    public recordId: string,
    public entityDefinition?: string,
    public entitiesCollection?: string
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InferEntityDefinitionResponse> {
    const data = await response.json();
    return InferEntityDefinitionResponse.fromResponse(data);
  }
}

/**
 * InferEntityDefinition response message
 */
export class InferEntityDefinitionResponse extends OrganizationResponse {
  constructor(public result: InferEntityDefinitionResponseData) {
    super("InferEntityDefinition");
  }

  static fromResponse(data: unknown): InferEntityDefinitionResponse {
    return new InferEntityDefinitionResponse(
      responseObject<InferEntityDefinitionResponseData>(data)
    );
  }
}
