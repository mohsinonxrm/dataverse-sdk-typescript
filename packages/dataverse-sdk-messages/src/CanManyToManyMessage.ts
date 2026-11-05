import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CanManyToMany request message
 *
 * Web API Action: CanManyToMany
 */
export class CanManyToManyRequest
  extends OrganizationRequest
  implements Executable<CanManyToManyResponse>
{
  constructor(public entityName: string) {
    super("CanManyToMany");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanManyToMany`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
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

  async parseResponse(response: Response): Promise<CanManyToManyResponse> {
    const data = await response.json();
    return CanManyToManyResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityName: this.entityName,
    };
  }
}

/**
 * CanManyToMany response message
 */
export class CanManyToManyResponse extends OrganizationResponse {
  constructor(public result: CanManyToManyResponse) {
    super("CanManyToMany");
  }

  static fromResponse(data: unknown): CanManyToManyResponse {
    return new CanManyToManyResponse((data as any).value);
  }
}
