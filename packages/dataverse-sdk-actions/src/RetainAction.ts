import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Response from Retain action
 */
export interface RetainResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetainResponse;
  }
}
