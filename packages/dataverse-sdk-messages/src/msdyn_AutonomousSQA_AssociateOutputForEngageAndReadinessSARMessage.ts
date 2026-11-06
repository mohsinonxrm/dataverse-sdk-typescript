import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse as msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARRequestParameters {
  msdyn_SalesAgentRun: string;
  msdyn_SalesMacroAgentType: number;
  msdyn_TrackingId: string;
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
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.Parameters.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse.fromResponse({});
    return msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR response message
 */
export class msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponseData
  ) {
    super("msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR");
  }

  static fromResponse(
    data: unknown
  ): msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse {
    return new msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse(
      responseObject<msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponseData>(data)
    );
  }
}
