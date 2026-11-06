import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UnpublishDuplicateRule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnpublishDuplicateRuleRequestParameters {
  DuplicateRuleId: string;
}

/**
 * UnpublishDuplicateRule request message
 *
 * Web API Action: UnpublishDuplicateRule
 */
export class UnpublishDuplicateRuleRequest
  extends OrganizationRequest
  implements Executable<UnpublishDuplicateRuleResponse>
{
  declare readonly Parameters: Readonly<UnpublishDuplicateRuleRequestParameters>;

  constructor(parameters: UnpublishDuplicateRuleRequestParameters) {
    super("UnpublishDuplicateRule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UnpublishDuplicateRule`;

    const body = requestBody({
      DuplicateRuleId: this.Parameters.DuplicateRuleId,
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

  async parseResponse(response: Response): Promise<UnpublishDuplicateRuleResponse> {
    // No return value (204 No Content)
    return new UnpublishDuplicateRuleResponse();
  }
}

/**
 * UnpublishDuplicateRule response message
 */
export class UnpublishDuplicateRuleResponse extends OrganizationResponse {
  constructor() {
    super("UnpublishDuplicateRule");
  }

  static fromResponse(_data: unknown): UnpublishDuplicateRuleResponse {
    return new UnpublishDuplicateRuleResponse();
  }
}
