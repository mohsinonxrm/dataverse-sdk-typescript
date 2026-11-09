import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RetrieveOptimizeEntityPayload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveOptimizeEntityPayloadRequestParameters {
  PatternId?: string;
  RunRecordId: string;
  TargetId: string;
}

/**
 * msdyn_RetrieveOptimizeEntityPayload request message
 *
 * Web API Action: msdyn_RetrieveOptimizeEntityPayload
 */
export class msdyn_RetrieveOptimizeEntityPayloadRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveOptimizeEntityPayloadResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveOptimizeEntityPayloadRequestParameters>;

  constructor(parameters: msdyn_RetrieveOptimizeEntityPayloadRequestParameters) {
    super("msdyn_RetrieveOptimizeEntityPayload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveOptimizeEntityPayload`;

    const body = requestBody({
      PatternId: this.Parameters.PatternId,
      RunRecordId: this.Parameters.RunRecordId,
      TargetId: this.Parameters.TargetId,
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
    return msdyn_RetrieveOptimizeEntityPayloadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveOptimizeEntityPayload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveOptimizeEntityPayloadResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RetrieveOptimizeEntityPayload response message
 *
 * `result` is the value the msdyn_RetrieveOptimizeEntityPayload action returns (see {@link msdyn_RetrieveOptimizeEntityPayloadResult}).
 */
export class msdyn_RetrieveOptimizeEntityPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveOptimizeEntityPayloadResult) {
    super("msdyn_RetrieveOptimizeEntityPayload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveOptimizeEntityPayloadResponse {
    return new msdyn_RetrieveOptimizeEntityPayloadResponse(
      data as msdyn_RetrieveOptimizeEntityPayloadResult
    );
  }
}
