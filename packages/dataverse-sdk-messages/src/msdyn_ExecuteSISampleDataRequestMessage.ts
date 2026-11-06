import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExecuteSISampleDataRequestResponse as msdyn_ExecuteSISampleDataRequestResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ExecuteSISampleDataRequest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteSISampleDataRequestRequestParameters {
  Operation: string;
  Version?: string;
  Lcid?: string;
}

/**
 * msdyn_ExecuteSISampleDataRequest request message
 *
 * Web API Action: msdyn_ExecuteSISampleDataRequest
 */
export class msdyn_ExecuteSISampleDataRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteSISampleDataRequestResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteSISampleDataRequestRequestParameters>;

  constructor(parameters: msdyn_ExecuteSISampleDataRequestRequestParameters) {
    super("msdyn_ExecuteSISampleDataRequest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSISampleDataRequest`;

    const body = requestBody({
      Operation: this.Parameters.Operation,
      Version: this.Parameters.Version,
      Lcid: this.Parameters.Lcid,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSISampleDataRequestResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ExecuteSISampleDataRequestResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ExecuteSISampleDataRequest response message
 */
export class msdyn_ExecuteSISampleDataRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteSISampleDataRequestResponseData) {
    super("msdyn_ExecuteSISampleDataRequest");
  }

  static fromResponse(data: unknown): msdyn_ExecuteSISampleDataRequestResponse {
    return new msdyn_ExecuteSISampleDataRequestResponse(
      responseObject<msdyn_ExecuteSISampleDataRequestResponseData>(data)
    );
  }
}
