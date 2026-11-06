import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the InferEntityDefinition message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InferEntityDefinitionRequestParameters {
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
      FileInfo: this.Parameters.FileInfo,
      ParseSampleData: this.Parameters.ParseSampleData,
      RecordId: this.Parameters.RecordId,
      LanguageCode: this.Parameters.LanguageCode,
      EntitiesCollection: this.Parameters.EntitiesCollection,
      UseUserSettings: this.Parameters.UseUserSettings,
      EntityDefinition: this.Parameters.EntityDefinition,
      SourceTimeZone: this.Parameters.SourceTimeZone,
      UserContext: this.Parameters.UserContext,
      SolutionPrefix: this.Parameters.SolutionPrefix,
      PreviewData: this.Parameters.PreviewData,
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
    return InferEntityDefinitionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InferEntityDefinition action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InferEntityDefinitionResult {
  "@odata.context"?: string;
  EntitiesCollection: string;
  EntityDefinition: string;
  FileInfo: string;
  SampleData: string;
  UsingFallbackLogic: boolean;
}

/**
 * InferEntityDefinition response message
 *
 * `result` is the value the InferEntityDefinition action returns (see {@link InferEntityDefinitionResult}).
 */
export class InferEntityDefinitionResponse extends OrganizationResponse {
  constructor(public result: InferEntityDefinitionResult) {
    super("InferEntityDefinition");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InferEntityDefinitionResponse {
    return new InferEntityDefinitionResponse(data as InferEntityDefinitionResult);
  }
}
