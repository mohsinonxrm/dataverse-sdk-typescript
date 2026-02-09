/**
 * Quick test to verify response type generation works correctly
 */

import { parseEdmx } from "./src/parsers/edmx-parser.js";
import { readFileSync } from "fs";
import { resolve } from "path";

const xmlPath = resolve("./samples/metadata-v9.2.xml");
const xml = readFileSync(xmlPath, "utf-8");

const csdl = await parseEdmx(xml);

// Find WhoAmI function
const whoAmI = csdl.functions.find((f) => f.name === "WhoAmI");
console.log("\n🔍 WhoAmI Function:");
console.log(`  Name: ${whoAmI?.name}`);
console.log(`  Return Type: ${whoAmI?.returnType}`);

// Find the complex type for WhoAmI response
if (whoAmI?.returnType) {
  const complexType = csdl.complexTypes.find(
    (ct) => `${ct.namespace}.${ct.name}` === whoAmI.returnType
  );

  if (complexType) {
    console.log(`\n✅ Found Complex Type: ${complexType.name}`);
    console.log(`  Properties:`);
    for (const prop of complexType.properties) {
      console.log(`    - ${prop.name}: ${prop.type}${prop.nullable ? " (nullable)" : ""}`);
    }
  } else {
    console.log(`\n❌ Complex type not found: ${whoAmI.returnType}`);
  }
}

// Check a few more functions/actions
console.log("\n📋 Sample of Functions with Return Types:");
csdl.functions.slice(0, 5).forEach((f) => {
  console.log(`  ${f.name}: ${f.returnType || "(no return type)"}`);
});

console.log("\n📋 Sample of Actions with Return Types:");
csdl.actions.slice(0, 5).forEach((a) => {
  console.log(`  ${a.name}: ${a.returnType || "(no return type)"}`);
});
