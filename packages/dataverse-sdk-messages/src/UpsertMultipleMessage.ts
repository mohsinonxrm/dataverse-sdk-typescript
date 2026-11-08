import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { UpsertResponse } from "./types/index.js";

/**
 * Parameters of the UpsertMultiple message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpsertMultipleRequestParameters {
  Targets: Record<string, unknown>[];
}

/**
 * UpsertMultiple request message
 *
 * Web API Action: UpsertMultiple
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class UpsertMultipleRequest
  extends OrganizationRequest
  implements Executable<UpsertMultipleResponse>
{
  declare readonly Parameters: Readonly<UpsertMultipleRequestParameters>;

  constructor(
    public entitySetName: string,
    parameters: UpsertMultipleRequestParameters
  ) {
    super("UpsertMultiple", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.UpsertMultiple`;

    const body = requestBody({
      Targets: this.Parameters.Targets,
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

  async parseResponse(response: Response): Promise<UpsertMultipleResponse> {
    // Dataverse answers 204 No Content although the CSDL declares a return type
    if (response.status === 204) return UpsertMultipleResponse.fromResponse(undefined);
    // The body is the complex value, with its @odata.context
    return UpsertMultipleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the UpsertMultiple action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content, as it does for UpsertMultiple although the CSDL
 * declares a return type: "The `UpsertMultiple` action returns `204 NoContent`. The
 * `UpsertMultipleResponse` complex type isn't returned."
 *
 * @see https://learn.microsoft.com/power-apps/developer/data-platform/bulk-operations#examples
 */
export type UpsertMultipleResult = {
  "@odata.context"?: string;
  Results: UpsertResponse[];
} | null;

/**
 * UpsertMultiple response message
 *
 * `result` is the value the UpsertMultiple action returns (see {@link UpsertMultipleResult}).
 */
export class UpsertMultipleResponse extends OrganizationResponse {
  constructor(public result: UpsertMultipleResult) {
    super("UpsertMultiple");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): UpsertMultipleResponse {
    return new UpsertMultipleResponse((data ?? null) as UpsertMultipleResult);
  }
}
