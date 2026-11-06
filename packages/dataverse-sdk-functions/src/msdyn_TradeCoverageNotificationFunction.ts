import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from msdyn_TradeCoverageNotification function
 */
export interface msdyn_TradeCoverageNotificationResponse {
  msdyn_IsWorkOrderCovered: boolean;
  msdyn_NotificationMessage: string;
}

/**
 * Parameters of the msdyn_TradeCoverageNotification function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TradeCoverageNotificationFunctionParameters {
  msdyn_WorkOrderServiceAccount: string;
  msdyn_WorkOrderTrade: string;
  msdyn_WorkOrderFunctionalLocation: string;
}

/**
 * msdyn_TradeCoverageNotification function
 *
 * Unbound function
 */
export class msdyn_TradeCoverageNotificationFunction implements Executable<msdyn_TradeCoverageNotificationResponse> {
  constructor(public readonly parameters: msdyn_TradeCoverageNotificationFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_TradeCoverageNotification`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.msdyn_WorkOrderServiceAccount !== undefined) {
      aliases.push(`msdyn_WorkOrderServiceAccount=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.msdyn_WorkOrderServiceAccount, "Edm.String")
      );
    }
    if (this.parameters.msdyn_WorkOrderTrade !== undefined) {
      aliases.push(`msdyn_WorkOrderTrade=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.parameters.msdyn_WorkOrderTrade, "Edm.String")
      );
    }
    if (this.parameters.msdyn_WorkOrderFunctionalLocation !== undefined) {
      aliases.push(`msdyn_WorkOrderFunctionalLocation=@p3`);
      params.append(
        "@p3",
        formatParameterAlias(this.parameters.msdyn_WorkOrderFunctionalLocation, "Edm.String")
      );
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

  async parseResponse(response: Response): Promise<msdyn_TradeCoverageNotificationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_TradeCoverageNotificationResponse;
  }
}
