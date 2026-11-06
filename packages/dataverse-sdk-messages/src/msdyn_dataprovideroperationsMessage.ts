import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_dataprovideroperationsResponse as msdyn_dataprovideroperationsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_dataprovideroperations message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_dataprovideroperationsRequestParameters {
  msdyn_recordid?: string;
  msdyn_payload?: string;
  msdyn_httpmethod: string;
}

/**
 * msdyn_dataprovideroperations request message
 *
 * Web API Action: msdyn_dataprovideroperations
 */
export class msdyn_dataprovideroperationsRequest
  extends OrganizationRequest
  implements Executable<msdyn_dataprovideroperationsResponse>
{
  declare readonly Parameters: Readonly<msdyn_dataprovideroperationsRequestParameters>;

  constructor(parameters: msdyn_dataprovideroperationsRequestParameters) {
    super("msdyn_dataprovideroperations", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_dataprovideroperations`;

    const body = requestBody({
      msdyn_recordid: this.Parameters.msdyn_recordid,
      msdyn_payload: this.Parameters.msdyn_payload,
      msdyn_httpmethod: this.Parameters.msdyn_httpmethod,
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

  async parseResponse(response: Response): Promise<msdyn_dataprovideroperationsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_dataprovideroperationsResponse.fromResponse({});
    return msdyn_dataprovideroperationsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_dataprovideroperations response message
 */
export class msdyn_dataprovideroperationsResponse extends OrganizationResponse {
  constructor(public result: msdyn_dataprovideroperationsResponseData) {
    super("msdyn_dataprovideroperations");
  }

  static fromResponse(data: unknown): msdyn_dataprovideroperationsResponse {
    return new msdyn_dataprovideroperationsResponse(
      responseObject<msdyn_dataprovideroperationsResponseData>(data)
    );
  }
}
