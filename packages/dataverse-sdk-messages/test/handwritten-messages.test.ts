/**
 * #344: the hand-written messages. The CRUD messages are HTTP verbs on entity sets, and
 * ExecuteMultiple / ExecuteTransaction (and an Associate or Disassociate of several records) are
 * `$batch` requests, run through a real DataverseClient against a recording fake fetch.
 */
import { describe, expect, it } from "vitest";
import { DataverseInvalidRequestError, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import {
  TEST_API_URL,
  batchResponse,
  createTestClient,
  createdResponse,
  jsonResponse,
  noContent,
  odataError,
} from "@mohsinonxrm/dataverse-sdk-testing";
import {
  AssociateRequest,
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  DisassociateRequest,
  ExecuteMultipleRequest,
  ExecuteMultipleResponse,
  ExecuteTransactionRequest,
  ExecuteTransactionResponse,
  OrganizationRequest,
  RetrieveMultipleRequest,
  RetrieveRequest,
  UpdateRequest,
  WhoAmIRequest,
  WhoAmIResponse,
  createEntityReference,
} from "../src/index.js";

const A1 = "00000000-0000-0000-0000-0000000000a1";
const A2 = "00000000-0000-0000-0000-0000000000a2";
const C1 = "00000000-0000-0000-0000-0000000000c1";
const C2 = "00000000-0000-0000-0000-0000000000c2";
const account = { "@odata.type": "Microsoft.Dynamics.CRM.account" } as const;

/** The parts of a recorded `$batch` body: request line, headers and body of each. */
function batchParts(body: string | undefined): Array<{ line: string; head: string; body: string }> {
  const parts: Array<{ line: string; head: string; body: string }> = [];
  // Each part ends at the CRLF before the next boundary line
  for (const segment of (body ?? "").split("\r\n--")) {
    const match = /^(GET|POST|PATCH|DELETE) (\S+) HTTP\/1\.1\r\n/m.exec(segment);
    if (!match) continue;
    const rest = segment.slice(match.index + match[0].length);
    const end = rest.indexOf("\r\n\r\n");
    const blank = rest.startsWith("\r\n") ? 0 : end;
    parts.push({
      line: `${match[1]} ${match[2]}`,
      head: blank === 0 ? "" : rest.slice(0, end),
      body: blank === 0 ? rest.slice(2) : rest.slice(end + 4),
    });
  }
  return parts;
}

describe("CRUD messages (#344)", () => {
  it("Create posts the columns to the table's entity set and resolves the new id", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/accounts", () => createdResponse("accounts", A1));
    const request = new CreateRequest({ Target: { ...account, name: "Contoso" } });
    expect(request.messageName).toBe("Create");
    expect(request).toBeInstanceOf(OrganizationRequest);

    const response = await client.execute(request);
    expect(response).toBeInstanceOf(CreateResponse);
    expect(response.result).toBe(A1);
    expect(response.id).toBe(A1);
    // The table is the URL; @odata.type isn't sent
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ name: "Contoso" });
  });

  it("Create takes the entity set of a table the snapshot doesn't know", () => {
    const widget = { "@odata.type": "Microsoft.Dynamics.CRM.new_widget", new_name: "W" };
    expect(
      new CreateRequest({ Target: widget, EntitySetName: "new_widgetset" }).toRequestInformation(
        TEST_API_URL
      ).url
    ).toBe(`${TEST_API_URL}/new_widgetset`);
    expect(() => new CreateRequest({ Target: widget }).toRequestInformation(TEST_API_URL)).toThrow(
      /new_widget/
    );
    expect(() =>
      new CreateRequest({ Target: { "@odata.type": "account" } }).toRequestInformation(TEST_API_URL)
    ).toThrow(DataverseInvalidRequestError);
  });

  it("Retrieve reads the record with $select and resolves it as result and Entity", async () => {
    const { client, fake } = createTestClient();
    const record = { "@odata.etag": 'W/"1"', accountid: A1, name: "Contoso" };
    fake.on("GET", `/accounts(${A1})`, () => jsonResponse(record));
    const response = await client.execute(
      new RetrieveRequest({
        Target: createEntityReference("account", `{${A1}}`),
        ColumnSet: ["name"],
      })
    );
    expect(fake.last().path).toBe(`/accounts(${A1})?$select=name`);
    expect(response.result).toEqual(record);
    expect(response.Entity).toBe(response.result);
    // No ColumnSet: every column
    expect(
      new RetrieveRequest({ Target: createEntityReference("account", A1) }).toRequestInformation(
        TEST_API_URL
      ).url
    ).toBe(`${TEST_API_URL}/accounts(${A1})`);
  });

  it("Update patches the columns with If-Match, so it never creates a record", async () => {
    const { client, fake } = createTestClient();
    fake.on("PATCH", `/accounts(${A1})`, () => noContent());
    const target = createEntityReference("account", A1);
    await client.execute(new UpdateRequest({ Target: target, Attributes: { name: "New" } }));
    expect(fake.last().headers["if-match"]).toBe("*");
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ name: "New" });

    await client.execute(
      new UpdateRequest({ Target: target, Attributes: { revenue: 5 }, ETag: 'W/"7"' })
    );
    expect(fake.last().headers["if-match"]).toBe('W/"7"');
    expect(() =>
      new UpdateRequest({
        Target: createEntityReference("account", "not-a-guid"),
        Attributes: {},
      }).toRequestInformation(TEST_API_URL)
    ).toThrow(DataverseInvalidRequestError);
  });

  it("Delete deletes the record, with If-Match only when an ETag is given", async () => {
    const { client, fake } = createTestClient();
    fake.on("DELETE", `/accounts(${A1})`, () => noContent());
    await client.execute(new DeleteRequest({ Target: createEntityReference("account", A1) }));
    expect(fake.last().headers["if-match"]).toBeUndefined();
    await client.execute(
      new DeleteRequest({ Target: createEntityReference("account", A1), ETag: 'W/"2"' })
    );
    expect(fake.last().headers["if-match"]).toBe('W/"2"');
  });

  it("RetrieveMultiple runs the FetchXML on the entity set of its <entity>", async () => {
    const { client, fake } = createTestClient();
    const page = {
      value: [{ name: "A" }],
      "@Microsoft.Dynamics.CRM.morerecords": true,
      "@Microsoft.Dynamics.CRM.fetchxmlpagingcookie": "<cookie />",
    };
    fake.on("GET", "/accounts", () => jsonResponse(page));
    const fetchXml = `<fetch top="1"><entity name="account"><attribute name="name" /></entity></fetch>`;
    const response = await client.execute(new RetrieveMultipleRequest({ Query: fetchXml }));
    const url = new URL(fake.last().url);
    expect(url.searchParams.get("fetchXml")).toBe(fetchXml);
    expect(fake.last().headers.prefer).toContain('odata.include-annotations="*"');
    expect(response.EntityCollection.value).toEqual([{ name: "A" }]);
    expect(response.result["@Microsoft.Dynamics.CRM.morerecords"]).toBe(true);
    expect(() =>
      new RetrieveMultipleRequest({ Query: "<fetch />" }).toRequestInformation(TEST_API_URL)
    ).toThrow(DataverseInvalidRequestError);
  });

  it("Associate posts a $ref with the absolute URL of one related record", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", `/accounts(${A1})/contact_customer_accounts/$ref`, () => noContent());
    const request = new AssociateRequest({
      Target: createEntityReference("account", A1),
      Relationship: "contact_customer_accounts",
      RelatedEntities: [createEntityReference("contact", C1)],
    });
    expect(request.parsesErrorResponses).toBe(false);
    await client.execute(request);
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.id": `${TEST_API_URL}/contacts(${C1})`,
    });
  });

  it("Associate of several records is one change set, and its failure rejects", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse([
        {
          changeset: [
            { status: 204, contentId: "1" },
            { status: 204, contentId: "2" },
          ],
        },
      ])
    );
    const request = new AssociateRequest({
      Target: createEntityReference("account", A1),
      Relationship: "contact_customer_accounts",
      RelatedEntities: [createEntityReference("contact", C1), createEntityReference("contact", C2)],
    });
    expect(request.parsesErrorResponses).toBe(true);
    await client.execute(request);
    const body = fake.last().bodyText;
    expect(body).toContain("Content-Type: multipart/mixed; boundary=changeset_");
    expect(batchParts(body).map((p) => p.line)).toEqual([
      `POST ${TEST_API_URL}/accounts(${A1})/contact_customer_accounts/$ref`,
      `POST ${TEST_API_URL}/accounts(${A1})/contact_customer_accounts/$ref`,
    ]);
    expect(batchParts(body)[1]?.head).toContain("Content-Type: application/json; type=entry");

    fake.on("POST", "/$batch", () =>
      batchResponse(
        [
          {
            changeset: [
              {
                status: 404,
                contentId: "2",
                body: { error: { code: "0x80040217", message: "contact Does Not Exist" } },
              },
            ],
          },
        ],
        { status: 404 }
      )
    );
    const error: unknown = await client.execute(request).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(DataverseODataError);
    expect(error).toMatchObject({ status: 404, code: "0x80040217" });
  });

  it("Disassociate deletes the $ref of each related record", async () => {
    const { client, fake } = createTestClient();
    fake.on("DELETE", `/accounts(${A1})/contact_customer_accounts(${C1})/$ref`, () => noContent());
    await client.execute(
      new DisassociateRequest({
        Target: createEntityReference("account", A1),
        Relationship: "contact_customer_accounts",
        RelatedEntities: [createEntityReference("contact", C1)],
      })
    );
    expect(fake.requests).toHaveLength(1);
    const several = new DisassociateRequest({
      Target: createEntityReference("account", A1),
      Relationship: "contact_customer_accounts",
      RelatedEntities: [createEntityReference("contact", C1), createEntityReference("contact", C2)],
    }).toRequestInformation(TEST_API_URL);
    expect(several.url).toBe(`${TEST_API_URL}/$batch`);
    expect(batchParts(several.body as string).map((p) => p.line)).toEqual([
      `DELETE ${TEST_API_URL}/accounts(${A1})/contact_customer_accounts(${C1})/$ref`,
      `DELETE ${TEST_API_URL}/accounts(${A1})/contact_customer_accounts(${C2})/$ref`,
    ]);
    expect(() =>
      new DisassociateRequest({
        Target: createEntityReference("account", A1),
        Relationship: "contact_customer_accounts",
        RelatedEntities: [],
      }).toRequestInformation(TEST_API_URL)
    ).toThrow(DataverseInvalidRequestError);
  });
});

describe("ExecuteMultiple (#344)", () => {
  const twoCreates = () => [
    new CreateRequest({ Target: { ...account, name: "A" } }),
    new CreateRequest({ Target: { ...account, name: "B" } }),
  ];

  it("sends one $batch part per request and parses each with its request", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse([
        { status: 204, headers: { "OData-EntityId": `${TEST_API_URL}/accounts(${A1})` } },
        { status: 200, body: { UserId: C1, BusinessUnitId: A2, OrganizationId: A2 } },
      ])
    );
    const response = await client.execute(
      new ExecuteMultipleRequest({
        Requests: [new CreateRequest({ Target: { ...account, name: "A" } }), new WhoAmIRequest()],
      })
    );
    expect(response).toBeInstanceOf(ExecuteMultipleResponse);
    expect(response.messageName).toBe("ExecuteMultiple");
    expect(response.IsFaulted).toBe(false);
    expect(response.Responses.map((item) => item.RequestIndex)).toEqual([0, 1]);
    expect(response.Responses[0]?.Response).toBeInstanceOf(CreateResponse);
    expect((response.Responses[0]?.Response as CreateResponse).id).toBe(A1);
    expect(response.Responses[1]?.Response).toBeInstanceOf(WhoAmIResponse);

    const sent = fake.last();
    expect(sent.headers["content-type"]).toMatch(/^multipart\/mixed; boundary=batch_/);
    expect(sent.headers.prefer).toBeUndefined();
    // Top-level parts, not a change set; a GET is allowed
    expect(sent.bodyText).not.toContain("changeset_");
    expect(batchParts(sent.bodyText).map((p) => p.line)).toEqual([
      `POST ${TEST_API_URL}/accounts`,
      `GET ${TEST_API_URL}/WhoAmI`,
    ]);
    expect(batchParts(sent.bodyText)[0]?.body).toBe('{"name":"A"}');
  });

  it("stops at the first failure: the batch's error status is read, not thrown", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse(
        [
          { status: 204, headers: { "OData-EntityId": `${TEST_API_URL}/accounts(${A1})` } },
          { status: 400, body: { error: { code: "0x80044331", message: "Bad name" } } },
        ],
        { status: 400 }
      )
    );
    const requests = [...twoCreates(), new CreateRequest({ Target: { ...account, name: "C" } })];
    const response = await client.execute(new ExecuteMultipleRequest({ Requests: requests }));
    expect(response.IsFaulted).toBe(true);
    expect(response.Responses).toHaveLength(2);
    const fault = response.Responses[1]?.Fault;
    expect(fault).toBeInstanceOf(DataverseODataError);
    expect(fault).toMatchObject({ status: 400, code: "0x80044331", message: "Bad name" });
    expect(response.Responses[1]?.RequestIndex).toBe(1);
  });

  it("ContinueOnError sends odata.continue-on-error; ReturnResponses: false keeps only faults", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse([
        { status: 400, body: { error: { code: "0x1", message: "Bad" } } },
        { status: 204, headers: { "OData-EntityId": `${TEST_API_URL}/accounts(${A2})` } },
      ])
    );
    const response = await client.execute(
      new ExecuteMultipleRequest({
        Requests: twoCreates(),
        Settings: { ContinueOnError: true, ReturnResponses: false },
      })
    );
    expect(fake.last().headers.prefer).toBe("odata.continue-on-error");
    expect(response.Responses.map((item) => item.RequestIndex)).toEqual([0]);
    expect(response.Responses[0]?.Fault?.message).toBe("Bad");
  });

  it("rejects the whole $batch's error when it isn't a batch response", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () => odataError(400, "0x80048d19", "Malformed batch"));
    await expect(
      client.execute(new ExecuteMultipleRequest({ Requests: twoCreates() }))
    ).rejects.toMatchObject({ status: 400, code: "0x80048d19" });
  });

  it("checks the requests: 1 to 1,000, no $batch inside a $batch", () => {
    const run = (Requests: readonly OrganizationRequest[]) => () =>
      new ExecuteMultipleRequest({ Requests }).toRequestInformation(TEST_API_URL);
    expect(run([])).toThrow(DataverseInvalidRequestError);
    expect(run(Array.from({ length: 1001 }, () => new WhoAmIRequest()))).toThrow(/1 to 1000/);
    expect(run([new ExecuteMultipleRequest({ Requests: [new WhoAmIRequest()] })])).toThrow(
      /\$batch itself/
    );
    expect(run([new ExecuteTransactionRequest({ Requests: twoCreates() })])).toThrow(
      /\$batch itself/
    );
  });
});

describe("ExecuteTransaction (#344)", () => {
  it("sends the requests as one change set and resolves each response, in order", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse([
        {
          changeset: [
            // Answered out of order: matched by Content-ID
            {
              status: 204,
              contentId: "2",
              headers: { "OData-EntityId": `${TEST_API_URL}/accounts(${A2})` },
            },
            {
              status: 204,
              contentId: "1",
              headers: { "OData-EntityId": `${TEST_API_URL}/accounts(${A1})` },
            },
          ],
        },
      ])
    );
    const response = await client.execute(
      new ExecuteTransactionRequest({
        Requests: [
          new CreateRequest({ Target: { ...account, name: "A" } }),
          new CreateRequest({ Target: { ...account, name: "B" } }),
        ],
      })
    );
    expect(response).toBeInstanceOf(ExecuteTransactionResponse);
    const [first, second] = response.Responses;
    expect(first.id).toBe(A1);
    expect(second.id).toBe(A2);
    const body = fake.last().bodyText ?? "";
    expect(body).toContain("boundary=changeset_");
    expect(body).toContain("Content-ID: 1");
    expect(body).toContain("Content-ID: 2");
  });

  it("rejects with the failed request's error: the transaction is rolled back", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse(
        [
          {
            changeset: [
              {
                status: 400,
                contentId: "2",
                body: { error: { code: "0x80044331", message: "Bad name" } },
              },
            ],
          },
        ],
        { status: 400 }
      )
    );
    const request = new ExecuteTransactionRequest({
      Requests: [
        new CreateRequest({ Target: { ...account, name: "A" } }),
        new CreateRequest({ Target: { ...account, name: "" } }),
      ],
    });
    await expect(client.execute(request)).rejects.toMatchObject({
      status: 400,
      code: "0x80044331",
    });
  });

  it("refuses a GET, which a change set can't hold", () => {
    expect(() =>
      new ExecuteTransactionRequest({ Requests: [new WhoAmIRequest()] }).toRequestInformation(
        TEST_API_URL
      )
    ).toThrow(/GET/);
  });
});
