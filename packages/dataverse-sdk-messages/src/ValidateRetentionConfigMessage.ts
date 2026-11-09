import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the ValidateRetentionConfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateRetentionConfigRequestParameters {
  Target?: EntityReference | AnyEntityPayload;
  EntityName?: string;
  FetchXml: string;
  RetentionConfigId?: string;
}

/**
 * ValidateRetentionConfig request message
 *
 * Web API Action: ValidateRetentionConfig
 */
export class ValidateRetentionConfigRequest
  extends OrganizationRequest
  implements Executable<ValidateRetentionConfigResponse>
{
  declare readonly Parameters: Readonly<ValidateRetentionConfigRequestParameters>;

  constructor(parameters: ValidateRetentionConfigRequestParameters) {
    super("ValidateRetentionConfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateRetentionConfig`;

    const body = requestBody({
      Target: this.Parameters.Target,
      EntityName: this.Parameters.EntityName,
      FetchXml: this.Parameters.FetchXml,
      RetentionConfigId: this.Parameters.RetentionConfigId,
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

  async parseResponse(response: Response): Promise<ValidateRetentionConfigResponse> {
    // The body is the complex value, with its @odata.context
    return ValidateRetentionConfigResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ValidateRetentionConfig action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ValidateRetentionConfigResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsValidationSuccessful: boolean;
}

/**
 * ValidateRetentionConfig response message
 *
 * `result` is the value the ValidateRetentionConfig action returns (see {@link ValidateRetentionConfigResult}).
 */
export class ValidateRetentionConfigResponse extends OrganizationResponse {
  constructor(public result: ValidateRetentionConfigResult) {
    super("ValidateRetentionConfig");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ValidateRetentionConfigResponse {
    return new ValidateRetentionConfigResponse(data as ValidateRetentionConfigResult);
  }
}
