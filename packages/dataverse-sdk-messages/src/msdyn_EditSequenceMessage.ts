import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_EditSequenceResponse as msdyn_EditSequenceResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_EditSequence message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EditSequenceRequestParameters {
  SequenceId?: string;
  DiscardChanges?: boolean;
}

/**
 * msdyn_EditSequence request message
 *
 * Web API Action: msdyn_EditSequence
 */
export class msdyn_EditSequenceRequest
  extends OrganizationRequest
  implements Executable<msdyn_EditSequenceResponse>
{
  declare readonly Parameters: Readonly<msdyn_EditSequenceRequestParameters>;

  constructor(parameters: msdyn_EditSequenceRequestParameters = {}) {
    super("msdyn_EditSequence", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EditSequence`;

    const body = requestBody({
      SequenceId: this.Parameters.SequenceId,
      DiscardChanges: this.Parameters.DiscardChanges,
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

  async parseResponse(response: Response): Promise<msdyn_EditSequenceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_EditSequenceResponse.fromResponse({});
    return msdyn_EditSequenceResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_EditSequence response message
 */
export class msdyn_EditSequenceResponse extends OrganizationResponse {
  constructor(public result: msdyn_EditSequenceResponseData) {
    super("msdyn_EditSequence");
  }

  static fromResponse(data: unknown): msdyn_EditSequenceResponse {
    return new msdyn_EditSequenceResponse(responseObject<msdyn_EditSequenceResponseData>(data));
  }
}
