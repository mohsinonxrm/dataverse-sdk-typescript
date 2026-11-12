/**
 * A fixture for the per-form types (#430): account's forms as `systemform` records with their
 * FormXml, on top of the write fixture's tables. The main form "Account" has a header, a column on
 * it twice (`name`, `name1`), party list, file and image columns (which `$metadata` has no
 * property for, or the table-wide types don't type), a subgrid, a web resource, an IFRAME, a quick
 * view form, the timeline, a spacer without an id, an unnamed tab and section, and a footer.
 */
import type {
  RetrieveMetadataChangesResponse,
  SystemFormRecord,
} from "../../src/metadata-service.js";
import { WRITE_ENTITY_METADATA } from "./write-metadata.js";

const TEXT = "{4273EDBD-AC1D-40D3-9FB2-095C621B552D}";
const LOOKUP = "{270BD3DB-D9AF-4782-9025-509E298DEC0A}";
const PICKLIST = "{3EF39988-22BB-4F0B-BBBE-64B5A3748AEE}";
const MONEY = "{533B9E00-756B-4312-95A0-DC888637AC78}";
const PARTY_LIST = "{CBFB742C-14E7-4A17-96BB-1A13F7F64AA2}";

/** account's main form "Account". */
export const ACCOUNT_MAIN_FORMXML = `<form>
  <tabs>
    <tab name="SUMMARY_TAB" id="{1}" expanded="true">
      <labels><label description="Résumé" languagecode="1036" /><label description="Summary" languagecode="1033" /></labels>
      <columns>
        <column width="50%">
          <sections>
            <section name="ACCOUNT_INFORMATION" id="{2}">
              <labels><label description="Account Information" languagecode="1033" /></labels>
              <rows>
                <row><cell id="{c1}"><control id="name" classid="${TEXT}" datafieldname="name" /></cell></row>
                <row><cell id="{c2}"><control id="industrycode" classid="${PICKLIST}" datafieldname="industrycode" /></cell></row>
                <row><cell id="{c3}"><control id="primarycontactid" classid="${LOOKUP}" datafieldname="primarycontactid" /></cell></row>
                <row><cell id="{c4}"><control id="contoso_attendees" classid="${PARTY_LIST}" datafieldname="contoso_attendees" /></cell></row>
                <row><cell id="{c5}"><control id="contoso_contract" classid="{F5F1D2C6-2B4B-4C1A-9E52-123456789ABC}" datafieldname="contoso_contract" /></cell></row>
                <row><cell id="{c6}"><control id="entityimage" classid="{9F4B5A1D-0000-4C1A-9E52-123456789ABC}" datafieldname="entityimage" /></cell></row>
                <row><cell id="{c7}"><control classid="{5546E6CD-394C-4BEE-94A8-4425E17EF6C6}" /></cell></row>
              </rows>
            </section>
            <section name="CONTACTS" id="{3}">
              <labels><label description="Contacts" languagecode="1033" /></labels>
              <rows>
                <row><cell id="{c8}"><control id="Contacts" classid="{E7A81278-8635-4d9e-8D4D-59480B391C5B}" indicationOfSubgrid="true"><parameters><TargetEntityType>contact</TargetEntityType></parameters></control></cell></row>
                <row><cell id="{c9}"><control id="contactquickform" classid="{5C5600E0-1D6E-4205-A272-BE80DA87FD42}" /></cell></row>
                <row><cell id="{c10}"><control id="notescontrol" classid="{06375649-C143-495E-A496-C962E5B4488E}" /></cell></row>
              </rows>
            </section>
          </sections>
        </column>
      </columns>
    </tab>
    <tab name="DETAILS_TAB" id="{4}">
      <columns>
        <column width="100%">
          <sections>
            <section id="{5}"><rows><row><cell id="{c11}"><control id="name1" classid="${TEXT}" datafieldname="name" /></cell></row></rows></section>
            <section name="BILLING" id="{6}">
              <rows>
                <row><cell id="{c12}"><control id="creditlimit" classid="${MONEY}" datafieldname="creditlimit" /></cell></row>
                <row><cell id="{c13}"><control id="contoso_channels" classid="{4AA28AB7-9C13-4F57-A73D-AD894D048B5F}" datafieldname="contoso_channels" /></cell></row>
                <row><cell id="{c14}"><control id="WebResource_map" classid="{9FDF5F91-88B1-47f4-AD53-C11EFC01A01D}" /></cell></row>
                <row><cell id="{c15}"><control id="IFRAME_news" classid="{FD2A7985-3187-444e-908D-6624B21F69C0}" /></cell></row>
              </rows>
            </section>
          </sections>
        </column>
      </columns>
    </tab>
    <tab id="{7}">
      <columns><column><sections><section name="UNNAMED_TAB_SECTION"><rows /></section></sections></column></columns>
    </tab>
  </tabs>
  <header id="{8}">
    <rows>
      <row>
        <cell id="{h1}"><control id="header_ownerid" classid="${LOOKUP}" datafieldname="ownerid" /></cell>
        <cell id="{h2}"><control id="header_creditonhold" classid="{67FAC785-CD58-4F9F-ABB3-4B7DDC6ED5ED}" datafieldname="creditonhold" /></cell>
      </row>
    </rows>
  </header>
  <footer id="{9}">
    <rows><row><cell id="{f1}"><control id="footer_statecode" classid="${PICKLIST}" datafieldname="statecode" /></cell></row></rows>
  </footer>
</form>`;

/** account's quick create form. */
export const ACCOUNT_QUICK_CREATE_FORMXML = `<form>
  <tabs>
    <tab name="tab_1">
      <columns><column><sections>
        <section name="section_1">
          <rows>
            <row><cell><control id="name" classid="${TEXT}" datafieldname="name" /></cell></row>
            <row><cell><control id="primarycontactid" classid="${LOOKUP}" datafieldname="primarycontactid" /></cell></row>
          </rows>
        </section>
      </sections></column></columns>
    </tab>
  </tabs>
</form>`;

/** The forms by table. contact has none; a quick view form (type 6) isn't read. */
export const FORM_RECORDS: Record<string, SystemFormRecord[]> = {
  account: [
    {
      formid: "33333333-3333-3333-3333-333333333333",
      name: "Account Quick Create",
      type: 7,
      formxml: ACCOUNT_QUICK_CREATE_FORMXML,
    },
    {
      formid: "11111111-1111-1111-1111-111111111111",
      name: "Account",
      type: 2,
      formxml: ACCOUNT_MAIN_FORMXML,
    },
    {
      formid: "22222222-2222-2222-2222-222222222222",
      name: "Sales Insights",
      type: 2,
      formxml: `<form><tabs><tab name="general"><columns><column><sections><section name="general_section"><rows><row><cell><control id="description" classid="{E0DECE4B-6FC8-4A8F-A065-082708572369}" datafieldname="description" /></cell></row></rows></section></sections></column></columns></tab></tabs></form>`,
    },
    {
      formid: "44444444-4444-4444-4444-444444444444",
      name: "Account Card",
      type: 6,
      formxml: ACCOUNT_QUICK_CREATE_FORMXML,
    },
  ],
};

/**
 * The write fixture's metadata, with account's party list, file and image columns (which `$metadata`
 * has no property for, or which the table-wide form types leave out).
 */
export const FORM_ENTITY_METADATA: Record<string, RetrieveMetadataChangesResponse> = (() => {
  const metadata = structuredClone(WRITE_ENTITY_METADATA);
  metadata.account.EntityMetadata?.[0]?.Attributes?.push(
    {
      LogicalName: "contoso_attendees",
      AttributeType: "PartyList",
      AttributeTypeName: { Value: "PartyListType" },
    },
    {
      LogicalName: "contoso_contract",
      AttributeType: "Virtual",
      AttributeTypeName: { Value: "FileType" },
    },
    {
      LogicalName: "entityimage",
      AttributeType: "Virtual",
      AttributeTypeName: { Value: "ImageType" },
    }
  );
  return metadata;
})();
