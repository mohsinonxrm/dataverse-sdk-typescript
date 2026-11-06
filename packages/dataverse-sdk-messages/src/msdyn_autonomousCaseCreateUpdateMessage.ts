import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_autonomousCaseCreateUpdateResponse as msdyn_autonomousCaseCreateUpdateResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_autonomousCaseCreateUpdate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_autonomousCaseCreateUpdateRequestParameters {
  slot__conversation?: string[];
  autonomousCaseRequest: string;
}

/**
 * msdyn_autonomousCaseCreateUpdate request message
 *
 * Web API Action: msdyn_autonomousCaseCreateUpdate
 */
export class msdyn_autonomousCaseCreateUpdateRequest
  extends OrganizationRequest
  implements Executable<msdyn_autonomousCaseCreateUpdateResponse>
{
  declare readonly Parameters: Readonly<msdyn_autonomousCaseCreateUpdateRequestParameters>;

  constructor(parameters: msdyn_autonomousCaseCreateUpdateRequestParameters) {
    super("msdyn_autonomousCaseCreateUpdate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_autonomousCaseCreateUpdate`;

    const body = requestBody({
      slot__conversation: this.Parameters.slot__conversation,
      autonomousCaseRequest: this.Parameters.autonomousCaseRequest,
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

  async parseResponse(response: Response): Promise<msdyn_autonomousCaseCreateUpdateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_autonomousCaseCreateUpdateResponse.fromResponse({});
    return msdyn_autonomousCaseCreateUpdateResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_autonomousCaseCreateUpdate response message
 */
export class msdyn_autonomousCaseCreateUpdateResponse extends OrganizationResponse {
  constructor(public result: msdyn_autonomousCaseCreateUpdateResponseData) {
    super("msdyn_autonomousCaseCreateUpdate");
  }

  static fromResponse(data: unknown): msdyn_autonomousCaseCreateUpdateResponse {
    return new msdyn_autonomousCaseCreateUpdateResponse(
      responseObject<msdyn_autonomousCaseCreateUpdateResponseData>(data)
    );
  }
}
