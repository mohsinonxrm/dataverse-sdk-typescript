import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Recalculate request message
 *
 * Web API Action: Recalculate
 */
export class RecalculateRequest
  extends OrganizationRequest
  implements Executable<RecalculateResponse>
{
  constructor(public goalId: string) {
    super("Recalculate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/goals(${this.goalId})/Microsoft.Dynamics.CRM.Recalculate`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RecalculateResponse> {
    // No return value (204 No Content)
    return new RecalculateResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.goalId,
    };
  }
}

/**
 * Recalculate response message
 */
export class RecalculateResponse extends OrganizationResponse {
  constructor() {
    super("Recalculate");
  }

  static fromResponse(_data: unknown): RecalculateResponse {
    return new RecalculateResponse();
  }
}
