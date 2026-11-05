import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from ReassignObjectsOwner action
 */
export interface ReassignObjectsOwnerResponse {
  // No content returned
}

/**
 * ReassignObjectsOwner action
 *
 * Unbound action
 */
export class ReassignObjectsOwnerAction implements Executable<ReassignObjectsOwnerResponse> {
  constructor(
    public readonly fromPrincipal: EntityReference,
    public readonly toPrincipal: EntityReference,
    public readonly objectType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReassignObjectsOwner`;

    const body: Record<string, unknown> = {
      FromPrincipal: this.fromPrincipal,
      ToPrincipal: this.toPrincipal,
      objectType: this.objectType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ReassignObjectsOwnerResponse> {
    // No return value (204 No Content)
    return {};
  }
}
