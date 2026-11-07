import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the GetConsentLink action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetConsentLinkResponse {
  "@odata.context"?: string;
  consentLink: string;
  customParameters: string;
  firstPartyLoginUri: string;
  parameterConsentLinks: string;
  principalId: string;
  principalType: string;
  redirectUrl: string;
  tenantId: string;
}

/**
 * Parameters of the GetConsentLink action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetConsentLinkActionParameters {
  redirectUrl: string;
}

/**
 * GetConsentLink action
 *
 * Bound action
 * Binding parameter: entity (mscrm.connectioninstance)
 *
 * The first argument is the id of the connectioninstance record to call it on.
 */
export class GetConsentLinkAction implements Executable<GetConsentLinkResponse> {
  constructor(
    public readonly connectioninstanceId: string,
    public readonly parameters: GetConsentLinkActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/connectioninstances(${odataLiteral.guid(this.connectioninstanceId)})/Microsoft.Dynamics.CRM.GetConsentLink`;

    const body = requestBody({
      redirectUrl: this.parameters.redirectUrl,
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

  async parseResponse(response: Response): Promise<GetConsentLinkResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetConsentLinkResponse;
  }
}
