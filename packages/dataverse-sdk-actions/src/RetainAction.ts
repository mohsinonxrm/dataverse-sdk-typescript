import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Response from the Retain action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetainResponse {
  "@odata.context"?: string;
  EntityCountCollection: EntityRecordCountCollection;
}

/**
 * Parameters of the Retain action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetainActionParameters {
  Target: EntityReference | AnyEntityPayload;
  OperationId?: string;
}

/**
 * Retain action
 *
 * Unbound action
 */
export class RetainAction implements Executable<RetainResponse> {
  constructor(public readonly parameters: RetainActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Retain`;

    const body = requestBody({
      Target: this.parameters.Target,
      OperationId: this.parameters.OperationId,
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

  async parseResponse(response: Response): Promise<RetainResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetainResponse;
  }
}
