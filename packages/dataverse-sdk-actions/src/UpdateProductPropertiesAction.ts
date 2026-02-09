import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { dynamicpropertyinstance } from "./types/index.js";

/**
 * Response from UpdateProductProperties action
 */
export interface UpdateProductPropertiesResponse {
  // No content returned
}

/**
 * UpdateProductProperties action
 *
 * Unbound action
 */
export class UpdateProductPropertiesAction implements Executable<UpdateProductPropertiesResponse> {
  constructor(public readonly propertyInstanceList: dynamicpropertyinstance[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateProductProperties`;

    const body: Record<string, unknown> = {
      PropertyInstanceList: this.propertyInstanceList,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<UpdateProductPropertiesResponse> {
    // No return value (204 No Content)
    return {};
  }
}
