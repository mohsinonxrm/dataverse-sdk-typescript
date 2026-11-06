import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_cesinvokeResponse as msdyn_cesinvokeResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_cesinvoke message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_cesinvokeRequestParameters {
  CallType?: string;
  EventName?: string;
  SurveyName?: string;
}

/**
 * msdyn_cesinvoke request message
 *
 * Web API Action: msdyn_cesinvoke
 */
export class msdyn_cesinvokeRequest
  extends OrganizationRequest
  implements Executable<msdyn_cesinvokeResponse>
{
  declare readonly Parameters: Readonly<msdyn_cesinvokeRequestParameters>;

  constructor(parameters: msdyn_cesinvokeRequestParameters = {}) {
    super("msdyn_cesinvoke", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_cesinvoke`;

    const body = requestBody({
      CallType: this.Parameters.CallType,
      EventName: this.Parameters.EventName,
      SurveyName: this.Parameters.SurveyName,
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

  async parseResponse(response: Response): Promise<msdyn_cesinvokeResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_cesinvokeResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_cesinvoke response message
 */
export class msdyn_cesinvokeResponse extends OrganizationResponse {
  constructor(public result: msdyn_cesinvokeResponseData) {
    super("msdyn_cesinvoke");
  }

  static fromResponse(data: unknown): msdyn_cesinvokeResponse {
    return new msdyn_cesinvokeResponse(responseObject<msdyn_cesinvokeResponseData>(data));
  }
}
