import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveOptimizeEntityPayloadResponse as msdyn_RetrieveOptimizeEntityPayloadResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_RetrieveOptimizeEntityPayloadResponse.fromResponse({});
    return msdyn_RetrieveOptimizeEntityPayloadResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveOptimizeEntityPayload response message
 */
export class msdyn_RetrieveOptimizeEntityPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveOptimizeEntityPayloadResponseData) {
    super("msdyn_RetrieveOptimizeEntityPayload");
  }

  static fromResponse(data: unknown): msdyn_RetrieveOptimizeEntityPayloadResponse {
    return new msdyn_RetrieveOptimizeEntityPayloadResponse(
      responseObject<msdyn_RetrieveOptimizeEntityPayloadResponseData>(data)
    );
  }
}
