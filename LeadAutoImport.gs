/**
 * Father & Son Home Buyers — Lead Auto-Import
 *
 * Automatically parses Web3Forms lead emails from Gmail
 * and adds them to the "Leads" sheet in this spreadsheet.
 *
 * Setup:
 *   1. Paste this into Extensions → Apps Script
 *   2. Run importLeads() once manually to authorize
 *   3. Add a time-driven trigger (every 15 minutes)
 */

function importLeads() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  if (!sheet) {
    Logger.log("ERROR: 'Leads' sheet not found.");
    return;
  }

  // Get or create the label for processed emails
  var labelName = "CRM-Imported";
  var label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    label = GmailApp.createLabel(labelName);
  }

  // Search for unprocessed Web3Forms lead emails
  var query = 'subject:"New Lead from" -label:' + labelName;
  var threads = withRetry(function() { return GmailApp.search(query, 0, 50); });

  if (threads.length === 0) {
    Logger.log("No new leads found.");
    return;
  }

  var newLeadCount = 0;

  for (var t = 0; t < threads.length; t++) {
    var messages = threads[t].getMessages();

    for (var m = 0; m < messages.length; m++) {
      var msg = messages[m];
      var body = msg.getPlainBody();
      var subject = msg.getSubject();
      var dateReceived = msg.getDate();

      // Parse fields from the email body
      var leadData = parseLeadEmail(body, subject);

      if (!leadData.name) {
        Logger.log("Skipping email — could not parse name: " + subject);
        continue;
      }

      // Check for duplicate (same name + phone + address)
      if (isDuplicate(sheet, leadData)) {
        Logger.log("Skipping duplicate: " + leadData.name);
        continue;
      }

      // Get next lead number
      var lastRow = sheet.getLastRow();
      var leadNum = lastRow; // Row 1 is header, so lastRow = lead count + 1, next = lastRow

      // Append to sheet — columns match the Leads sheet layout:
      // A: Lead #, B: Date Received, C: Name, D: Phone, E: Email,
      // F: Property Address, G: City, H: Situation, I: Timeline,
      // J: Form Source, K: Lead Status, L: Deal Stage, M: Assigned To,
      // N: Next Step Date, O: Follow-Up Date, P: Offer Amount, Q: Notes, R: Last Updated
      withRetry(function() { sheet.appendRow([
        leadNum,                          // Lead #
        dateReceived,                     // Date Received
        leadData.name,                    // Name
        leadData.phone,                   // Phone
        leadData.email,                   // Email
        leadData.address,                 // Property Address
        leadData.city,                    // City
        leadData.situation,               // Situation
        leadData.timeline,                // Timeline
        leadData.source,                  // Form Source
        "New",                            // Lead Status (default)
        "Initial Contact",                // Deal Stage (default)
        "",                               // Assigned To
        "",                               // Next Step Date
        "",                               // Follow-Up Date
        "",                               // Offer Amount
        "",                               // Notes
        new Date()                        // Last Updated
      ]); });

      // Format the new row
      var newRow = sheet.getLastRow();
      sheet.getRange(newRow, 2).setNumberFormat("MM/dd/yyyy");
      sheet.getRange(newRow, 18).setNumberFormat("MM/dd/yyyy");

      newLeadCount++;
      Logger.log("Imported lead: " + leadData.name);
    }

    // Label the thread as processed
    withRetry(function() { threads[t].addLabel(label); });
  }

  Logger.log("Import complete. " + newLeadCount + " new leads added.");
}

/**
 * Parse lead fields from Web3Forms email body.
 * Web3Forms sends emails with fields in "Key: Value" format.
 */
function parseLeadEmail(body, subject) {
  var data = {
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    situation: "",
    timeline: "",
    source: ""
  };

  // Extract fields using regex — Web3Forms formats as "Field Name: Value"
  var lines = body.split("\n");

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();

    if (line.match(/^Name\s*:/i)) {
      data.name = line.replace(/^Name\s*:\s*/i, "").trim();
    }
    else if (line.match(/^Phone\s*:/i)) {
      data.phone = line.replace(/^Phone\s*:\s*/i, "").trim();
    }
    else if (line.match(/^Email\s*:/i)) {
      var email = line.replace(/^Email\s*:\s*/i, "").trim();
      if (email.toLowerCase() !== "not provided") data.email = email;
    }
    else if (line.match(/^Property Address\s*:/i)) {
      data.address = line.replace(/^Property Address\s*:\s*/i, "").trim();
    }
    else if (line.match(/^City\s*:/i)) {
      var city = line.replace(/^City\s*:\s*/i, "").trim();
      if (city.toLowerCase() !== "not captured") data.city = city;
    }
    else if (line.match(/^Situation\s*:/i)) {
      var sit = line.replace(/^Situation\s*:\s*/i, "").trim();
      if (sit.toLowerCase() !== "not specified") data.situation = sit;
    }
    else if (line.match(/^Timeline\s*:/i)) {
      var tl = line.replace(/^Timeline\s*:\s*/i, "").trim();
      if (tl.toLowerCase() !== "not specified") data.timeline = tl;
    }
    else if (line.match(/^Form Source\s*:/i)) {
      var src = line.replace(/^Form Source\s*:\s*/i, "").trim();
      if (src.toLowerCase().indexOf("hero") !== -1 || src.toLowerCase().indexOf("homepage") !== -1) {
        data.source = "Homepage";
      } else if (src.toLowerCase().indexOf("contact") !== -1) {
        data.source = "Contact Page";
      }
    }
  }

  // Fallback: try to determine source from subject line
  if (!data.source) {
    if (subject.indexOf("Homepage") !== -1) {
      data.source = "Homepage";
    } else if (subject.indexOf("Contact") !== -1) {
      data.source = "Contact Page";
    }
  }

  return data;
}

/**
 * Check if a lead already exists (by name + phone combo)
 */
function isDuplicate(sheet, leadData) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  var names = sheet.getRange(2, 3, lastRow - 1, 1).getValues();   // Column C: Name
  var phones = sheet.getRange(2, 4, lastRow - 1, 1).getValues();  // Column D: Phone

  for (var i = 0; i < names.length; i++) {
    if (names[i][0].toString().toLowerCase() === leadData.name.toLowerCase() &&
        phones[i][0].toString().replace(/\D/g, "") === leadData.phone.replace(/\D/g, "")) {
      return true;
    }
  }
  return false;
}

/**
 * Retry a function up to 3 times with exponential backoff on transient server errors.
 */
function withRetry(fn, maxAttempts) {
  maxAttempts = maxAttempts || 3;
  var delay = 2000;
  for (var attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return fn();
    } catch (e) {
      var isTransient = e.message && (
        e.message.indexOf("server error") !== -1 ||
        e.message.indexOf("Please wait") !== -1 ||
        e.message.indexOf("503") !== -1 ||
        e.message.indexOf("500") !== -1 ||
        e.message.indexOf("quota") !== -1
      );
      if (!isTransient || attempt === maxAttempts) throw e;
      Logger.log("Transient error (attempt " + attempt + "), retrying in " + (delay / 1000) + "s: " + e.message);
      Utilities.sleep(delay);
      delay *= 2;
    }
  }
}

/**
 * Manual utility: Re-import a specific email by searching for a name.
 * Run from Apps Script editor for one-off re-imports.
 */
function reimportByName(searchName) {
  var query = 'subject:"New Lead from" "' + searchName + '"';
  var threads = GmailApp.search(query, 0, 5);
  Logger.log("Found " + threads.length + " threads for: " + searchName);

  // Remove CRM-Imported label so importLeads() picks them up
  var label = GmailApp.getUserLabelByName("CRM-Imported");
  if (label) {
    for (var t = 0; t < threads.length; t++) {
      threads[t].removeLabel(label);
    }
  }

  importLeads();
}
