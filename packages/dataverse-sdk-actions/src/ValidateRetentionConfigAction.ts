import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from ValidateRetentionConfig action
 */
export interface ValidateRetentionConfigResponse {
  IsValidationSuccessful: boolean;
  ErrorMessage: string;
}

/**
 * Parameters of the ValidateRetentionConfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateRetentionConfigActionParameters {
  Target?: EntityReference | AnyEntityPayload;
  EntityName?: string;
  FetchXml: string;
  RetentionConfigId?: string;
}

/**
 * ValidateRetentionConfig action
 *
 * Unbound action
 */
export class ValidateRetentionConfigAction implements Executable<ValidateRetentionConfigResponse> {
  constructor(public readonly parameters: ValidateRetentionConfigActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateRetentionConfig`;

    const body = requestBody({
      Target: this.parameters.Target,
      EntityName: this.parameters.EntityName,
      FetchXml: this.parameters.FetchXml,
      RetentionConfigId: this.parameters.RetentionConfigId,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ValidateRetentionConfigResponse;
  }
}
