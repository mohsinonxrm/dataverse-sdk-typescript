import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from msdyn_TradeCoverageNotification function
 */
export interface msdyn_TradeCoverageNotificationResponse {
  msdyn_IsWorkOrderCovered: boolean;
  msdyn_NotificationMessage: string;
}

/**
 * msdyn_TradeCoverageNotification function
 *
 * Unbound function
 */
export class msdyn_TradeCoverageNotificationFunction implements Executable<msdyn_TradeCoverageNotificationResponse> {
  constructor(
    public readonly msdyn_WorkOrderServiceAccount: string,
    public readonly msdyn_WorkOrderTrade: string,
    public readonly msdyn_WorkOrderFunctionalLocation: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_TradeCoverageNotification`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.msdyn_WorkOrderServiceAccount !== undefined) {
      aliases.push(`msdyn_WorkOrderServiceAccount=@p1`);
      params.append("@p1", formatAliasValue(this.msdyn_WorkOrderServiceAccount));
    }
    if (this.msdyn_WorkOrderTrade !== undefined) {
      aliases.push(`msdyn_WorkOrderTrade=@p2`);
      params.append("@p2", formatAliasValue(this.msdyn_WorkOrderTrade));
    }
    if (this.msdyn_WorkOrderFunctionalLocation !== undefined) {
      aliases.push(`msdyn_WorkOrderFunctionalLocation=@p3`);
      params.append("@p3", formatAliasValue(this.msdyn_WorkOrderFunctionalLocation));
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
    const data = await response.json();
    return data as msdyn_TradeCoverageNotificationResponse;
  }
}
