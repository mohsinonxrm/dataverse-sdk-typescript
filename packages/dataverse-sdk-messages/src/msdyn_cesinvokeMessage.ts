import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_cesinvokeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_cesinvoke action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_cesinvokeResult {
  "@odata.context"?: string;
  CESResult: string;
  IsSuccess: string;
}

/**
 * msdyn_cesinvoke response message
 *
 * `result` is the value the msdyn_cesinvoke action returns (see {@link msdyn_cesinvokeResult}).
 */
export class msdyn_cesinvokeResponse extends OrganizationResponse {
  constructor(public result: msdyn_cesinvokeResult) {
    super("msdyn_cesinvoke");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_cesinvokeResponse {
    return new msdyn_cesinvokeResponse(data as msdyn_cesinvokeResult);
  }
}
