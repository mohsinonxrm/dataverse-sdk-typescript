import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckReqWebResourceOnSystemForm message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckReqWebResourceOnSystemFormRequestParameters {
  EntityAndWebResourceList?: string;
}

/**
 * msdyn_CheckReqWebResourceOnSystemForm request message
 *
 * Web API Action: msdyn_CheckReqWebResourceOnSystemForm
 */
export class msdyn_CheckReqWebResourceOnSystemFormRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckReqWebResourceOnSystemFormResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckReqWebResourceOnSystemFormRequestParameters>;

  constructor(parameters: msdyn_CheckReqWebResourceOnSystemFormRequestParameters = {}) {
    super("msdyn_CheckReqWebResourceOnSystemForm", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckReqWebResourceOnSystemForm`;

    const body = requestBody({
      EntityAndWebResourceList: this.Parameters.EntityAndWebResourceList,
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

  async parseResponse(response: Response): Promise<msdyn_CheckReqWebResourceOnSystemFormResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckReqWebResourceOnSystemFormResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckReqWebResourceOnSystemForm action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckReqWebResourceOnSystemFormResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckReqWebResourceOnSystemForm response message
 *
 * `result` is the value the msdyn_CheckReqWebResourceOnSystemForm action returns (see {@link msdyn_CheckReqWebResourceOnSystemFormResult}).
 */
export class msdyn_CheckReqWebResourceOnSystemFormResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckReqWebResourceOnSystemFormResult) {
    super("msdyn_CheckReqWebResourceOnSystemForm");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckReqWebResourceOnSystemFormResponse {
    return new msdyn_CheckReqWebResourceOnSystemFormResponse(
      data as msdyn_CheckReqWebResourceOnSystemFormResult
    );
  }
}
