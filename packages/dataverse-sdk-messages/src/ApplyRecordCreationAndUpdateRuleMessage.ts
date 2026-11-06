import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the ApplyRecordCreationAndUpdateRule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ApplyRecordCreationAndUpdateRuleRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * ApplyRecordCreationAndUpdateRule request message
 *
 * Web API Action: ApplyRecordCreationAndUpdateRule
 */
export class ApplyRecordCreationAndUpdateRuleRequest
  extends OrganizationRequest
  implements Executable<ApplyRecordCreationAndUpdateRuleResponse>
{
  declare readonly Parameters: Readonly<ApplyRecordCreationAndUpdateRuleRequestParameters>;

  constructor(parameters: ApplyRecordCreationAndUpdateRuleRequestParameters) {
    super("ApplyRecordCreationAndUpdateRule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ApplyRecordCreationAndUpdateRule`;

    const body = requestBody({
      Target: this.Parameters.Target,
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

  parseResponse(_response: Response): Promise<ApplyRecordCreationAndUpdateRuleResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ApplyRecordCreationAndUpdateRuleResponse());
  }
}

/**
 * ApplyRecordCreationAndUpdateRule response message
 */
export class ApplyRecordCreationAndUpdateRuleResponse extends OrganizationResponse {
  constructor() {
    super("ApplyRecordCreationAndUpdateRule");
  }

  static fromResponse(_data?: unknown): ApplyRecordCreationAndUpdateRuleResponse {
    return new ApplyRecordCreationAndUpdateRuleResponse();
  }
}
