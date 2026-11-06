import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { InferEntityDefinitionResponse as InferEntityDefinitionResponseData } from "./types/index.js";

/**
 * Parameters of the InferEntityDefinition message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InferEntityDefinitionRequestParameters {
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
 * InferEntityDefinition request message
 *
 * Web API Action: InferEntityDefinition
 */
export class InferEntityDefinitionRequest
  extends OrganizationRequest
  implements Executable<InferEntityDefinitionResponse>
{
  declare readonly Parameters: Readonly<InferEntityDefinitionRequestParameters>;

  constructor(parameters: InferEntityDefinitionRequestParameters) {
    super("InferEntityDefinition", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InferEntityDefinition`;

    const body = requestBody({
      LanguageCode: this.Parameters.LanguageCode,
      UseUserSettings: this.Parameters.UseUserSettings,
      UserContext: this.Parameters.UserContext,
      SolutionPrefix: this.Parameters.SolutionPrefix,
      PreviewData: this.Parameters.PreviewData,
      SourceTimeZone: this.Parameters.SourceTimeZone,
      ParseSampleData: this.Parameters.ParseSampleData,
      FileInfo: this.Parameters.FileInfo,
      RecordId: this.Parameters.RecordId,
      EntityDefinition: this.Parameters.EntityDefinition,
      EntitiesCollection: this.Parameters.EntitiesCollection,
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
    // 204 No Content is an empty result
    if (response.status === 204) return InferEntityDefinitionResponse.fromResponse({});
    return InferEntityDefinitionResponse.fromResponse(await response.json());
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
