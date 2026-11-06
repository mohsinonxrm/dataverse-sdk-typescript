import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from SetProcess action
 */
export interface SetProcessResponse {
  // No content returned
}

/**
 * Parameters of the SetProcess action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetProcessActionParameters {
  Target: EntityReference | AnyEntityPayload;
  NewProcess?: EntityReference | AnyEntityPayload;
  NewProcessInstance?: EntityReference | AnyEntityPayload;
}

/**
 * SetProcess action
 *
 * Unbound action
 */
export class SetProcessAction implements Executable<SetProcessResponse> {
  constructor(public readonly parameters: SetProcessActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetProcess`;

    const body = requestBody({
      Target: this.parameters.Target,
      NewProcess: this.parameters.NewProcess,
      NewProcessInstance: this.parameters.NewProcessInstance,
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

  async parseResponse(response: Response): Promise<SetProcessResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as SetProcessResponse;
  }
}
