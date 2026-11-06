import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Response from RollbackRetain action
 */
export interface RollbackRetainResponse {
  EntityCountCollection: EntityRecordCountCollection;
}

/**
 * Parameters of the RollbackRetain action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RollbackRetainActionParameters {
  Target: EntityReference | AnyEntityPayload;
  OperationId?: string;
}

/**
 * RollbackRetain action
 *
 * Unbound action
 */
export class RollbackRetainAction implements Executable<RollbackRetainResponse> {
  constructor(public readonly parameters: RollbackRetainActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RollbackRetain`;

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

  async parseResponse(response: Response): Promise<RollbackRetainResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RollbackRetainResponse;
  }
}
