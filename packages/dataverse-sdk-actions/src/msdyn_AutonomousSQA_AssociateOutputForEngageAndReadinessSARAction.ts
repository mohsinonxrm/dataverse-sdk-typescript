import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse {
  "@odata.context"?: string;
  msdyn_UpdatedSalesAgentRun: string;
}

/**
 * Parameters of the msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARActionParameters {
  msdyn_TrackingId: string;
  msdyn_SalesAgentRun: string;
  msdyn_SalesMacroAgentType: number;
}

/**
 * msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARAction implements Executable<msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse> {
  constructor(
    public readonly parameters: msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR`;

    const body = requestBody({
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.parameters.msdyn_SalesMacroAgentType,
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
    return (await response.json()) as msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse;
  }
}
