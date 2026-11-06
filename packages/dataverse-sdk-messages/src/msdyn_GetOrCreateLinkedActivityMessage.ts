import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetOrCreateLinkedActivityResponse as msdyn_GetOrCreateLinkedActivityResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetOrCreateLinkedActivity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOrCreateLinkedActivityRequestParameters {
  SequenceStepId: string;
  CreateLinkedActivity: boolean;
}

/**
 * msdyn_GetOrCreateLinkedActivity request message
 *
 * Web API Action: msdyn_GetOrCreateLinkedActivity
 */
export class msdyn_GetOrCreateLinkedActivityRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOrCreateLinkedActivityResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOrCreateLinkedActivityRequestParameters>;

  constructor(parameters: msdyn_GetOrCreateLinkedActivityRequestParameters) {
    super("msdyn_GetOrCreateLinkedActivity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrCreateLinkedActivity`;

    const body = requestBody({
      SequenceStepId: this.Parameters.SequenceStepId,
      CreateLinkedActivity: this.Parameters.CreateLinkedActivity,
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

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateLinkedActivityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetOrCreateLinkedActivityResponse.fromResponse({});
    return msdyn_GetOrCreateLinkedActivityResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetOrCreateLinkedActivity response message
 */
export class msdyn_GetOrCreateLinkedActivityResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrCreateLinkedActivityResponseData) {
    super("msdyn_GetOrCreateLinkedActivity");
  }

  static fromResponse(data: unknown): msdyn_GetOrCreateLinkedActivityResponse {
    return new msdyn_GetOrCreateLinkedActivityResponse(
      responseObject<msdyn_GetOrCreateLinkedActivityResponseData>(data)
    );
  }
}
