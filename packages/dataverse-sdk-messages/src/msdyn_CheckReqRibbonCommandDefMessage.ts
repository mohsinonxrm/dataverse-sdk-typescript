import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckReqRibbonCommandDef message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckReqRibbonCommandDefRequestParameters {
  CommandAndEntityList?: string;
}

/**
 * msdyn_CheckReqRibbonCommandDef request message
 *
 * Web API Action: msdyn_CheckReqRibbonCommandDef
 */
export class msdyn_CheckReqRibbonCommandDefRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckReqRibbonCommandDefResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckReqRibbonCommandDefRequestParameters>;

  constructor(parameters: msdyn_CheckReqRibbonCommandDefRequestParameters = {}) {
    super("msdyn_CheckReqRibbonCommandDef", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckReqRibbonCommandDef`;

    const body = requestBody({
      CommandAndEntityList: this.Parameters.CommandAndEntityList,
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

  async parseResponse(response: Response): Promise<msdyn_CheckReqRibbonCommandDefResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckReqRibbonCommandDefResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckReqRibbonCommandDef action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckReqRibbonCommandDefResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckReqRibbonCommandDef response message
 *
 * `result` is the value the msdyn_CheckReqRibbonCommandDef action returns (see {@link msdyn_CheckReqRibbonCommandDefResult}).
 */
export class msdyn_CheckReqRibbonCommandDefResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckReqRibbonCommandDefResult) {
    super("msdyn_CheckReqRibbonCommandDef");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckReqRibbonCommandDefResponse {
    return new msdyn_CheckReqRibbonCommandDefResponse(data as msdyn_CheckReqRibbonCommandDefResult);
  }
}
