import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpsertMultiple request message
 *
 * Web API Action: UpsertMultiple
 */
export class UpsertMultipleRequest
  extends OrganizationRequest
  implements Executable<UpsertMultipleResponse>
{
  constructor(public targets: Record<string, unknown>[]) {
    super("UpsertMultiple");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpsertMultiple`;

    const body: Record<string, unknown> = {
      Targets: this.targets,
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

  async parseResponse(response: Response): Promise<UpsertMultipleResponse> {
    const data = await response.json();
    return UpsertMultipleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Targets: this.targets,
    };
  }
}

/**
 * UpsertMultiple response message
 */
export class UpsertMultipleResponse extends OrganizationResponse {
  constructor(public result: UpsertMultipleResponse) {
    super("UpsertMultiple");
  }

  static fromResponse(data: unknown): UpsertMultipleResponse {
    return new UpsertMultipleResponse((data as any).value);
  }
}
