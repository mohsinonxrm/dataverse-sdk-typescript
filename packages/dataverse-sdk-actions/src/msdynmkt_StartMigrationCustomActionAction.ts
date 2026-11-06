import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_StartMigrationCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_StartMigrationCustomActionResponse {
  "@odata.context"?: string;
  ErrorCodes: string;
}

/**
 * Parameters of the msdynmkt_StartMigrationCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_StartMigrationCustomActionActionParameters {
  WhatIf?: boolean;
}

/**
 * msdynmkt_StartMigrationCustomAction action
 *
 * Unbound action
 */
export class msdynmkt_StartMigrationCustomActionAction implements Executable<msdynmkt_StartMigrationCustomActionResponse> {
  constructor(
    public readonly parameters: msdynmkt_StartMigrationCustomActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_StartMigrationCustomAction`;

    const body = requestBody({
      WhatIf: this.parameters.WhatIf,
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

  async parseResponse(response: Response): Promise<msdynmkt_StartMigrationCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_StartMigrationCustomActionResponse;
  }
}
