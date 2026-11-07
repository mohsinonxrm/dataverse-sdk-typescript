import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the ValidateRetentionConfig action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ValidateRetentionConfigResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsValidationSuccessful: boolean;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ValidateRetentionConfigResponse;
  }
}
