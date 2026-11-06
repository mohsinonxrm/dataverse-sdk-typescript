import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { ValidateRetentionConfigResponse as ValidateRetentionConfigResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return ValidateRetentionConfigResponse.fromResponse({});
    return ValidateRetentionConfigResponse.fromResponse(await response.json());
  }
}

/**
 * ValidateRetentionConfig response message
 */
export class ValidateRetentionConfigResponse extends OrganizationResponse {
  constructor(public result: ValidateRetentionConfigResponseData) {
    super("ValidateRetentionConfig");
  }

  static fromResponse(data: unknown): ValidateRetentionConfigResponse {
    return new ValidateRetentionConfigResponse(
      responseObject<ValidateRetentionConfigResponseData>(data)
    );
  }
}
