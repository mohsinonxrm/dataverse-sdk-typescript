---
"@mohsinonxrm/dataverse-sdk-generator": patch
---

`dataverse-gen` uses Commander 14 (was 12). The commands, options and help are the same. Extra
words after a command are still ignored, as before (Commander 13 and later would reject them with
"too many arguments"; `dataverse-gen` keeps accepting them so existing command lines and scripts
keep working).
