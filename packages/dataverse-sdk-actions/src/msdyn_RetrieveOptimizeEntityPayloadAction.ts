import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RetrieveOptimizeEntityPayload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveOptimizeEntityPayloadResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_RetrieveOptimizeEntityPayload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveOptimizeEntityPayloadActionParameters {
  PatternId?: string;
  RunRecordId: string;
  TargetId: string;
}

/**
 * msdyn_RetrieveOptimizeEntityPayload action
 *
 * Unbound action
 */
export class msdyn_RetrieveOptimizeEntityPayloadAction implements Executable<msdyn_RetrieveOptimizeEntityPayloadResponse> {
  constructor(public readonly parameters: msdyn_RetrieveOptimizeEntityPayloadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveOptimizeEntityPayload`;

    const body = requestBody({
      PatternId: this.parameters.PatternId,
      RunRecordId: this.parameters.RunRecordId,
      TargetId: this.parameters.TargetId,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveOptimizeEntityPayloadResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveOptimizeEntityPayloadResponse;
  }
}
