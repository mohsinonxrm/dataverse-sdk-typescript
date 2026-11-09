import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARRequestParameters {
  msdyn_TrackingId: string;
  msdyn_SalesAgentRun: string;
  msdyn_SalesMacroAgentType: number;
}

/**
 * msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR request message
 *
 * Web API Action: msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR
 */
export class msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARRequestParameters>;

  constructor(
    parameters: msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARRequestParameters
  ) {
    super("msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.Parameters.msdyn_SalesMacroAgentType,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResult {
  "@odata.context"?: string;
  msdyn_UpdatedSalesAgentRun: string;
}

/**
 * msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR response message
 *
 * `result` is the value the msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR action returns (see {@link msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResult}).
 */
export class msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResult) {
    super("msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse {
    return new msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse(
      data as msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResult
    );
  }
}
