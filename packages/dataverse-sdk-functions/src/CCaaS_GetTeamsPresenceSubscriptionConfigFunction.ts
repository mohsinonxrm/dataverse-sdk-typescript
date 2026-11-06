import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the CCaaS_GetTeamsPresenceSubscriptionConfig function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetTeamsPresenceSubscriptionConfigResponse {
  "@odata.context"?: string;
  AzureADClientId: string;
  CertificateId: string;
  ClientState: string;
  PublicCertificate: string;
  WebhookNotificationUrl: string;
}

/**
 * Parameters of the CCaaS_GetTeamsPresenceSubscriptionConfig function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetTeamsPresenceSubscriptionConfigFunctionParameters {
  ApiVersion: string;
}

/**
 * CCaaS_GetTeamsPresenceSubscriptionConfig function
 *
 * Unbound function
 */
export class CCaaS_GetTeamsPresenceSubscriptionConfigFunction implements Executable<CCaaS_GetTeamsPresenceSubscriptionConfigResponse> {
  constructor(
    public readonly parameters: CCaaS_GetTeamsPresenceSubscriptionConfigFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CCaaS_GetTeamsPresenceSubscriptionConfig`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ApiVersion !== undefined) {
      aliases.push(`ApiVersion=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ApiVersion, "Edm.String"));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<CCaaS_GetTeamsPresenceSubscriptionConfigResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_GetTeamsPresenceSubscriptionConfigResponse;
  }
}
