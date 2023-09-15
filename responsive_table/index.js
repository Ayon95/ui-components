function addTableAriaAttributes() {
  const tables = document.querySelectorAll("table");
  const captions = document.querySelectorAll("caption");
  const rowGroups = document.querySelectorAll("thead, tbody, tfoot");
  const rows = document.querySelectorAll("tr");
  const headerCells = document.querySelectorAll("th");
  const cells = document.querySelectorAll("td");
  const rowHeaderCells = document.querySelectorAll("th[scope='row']");

  for (const table of tables) {
    table.setAttribute("role", "table");
  }

  for (const caption of captions) {
    caption.setAttribute("role", "caption");
  }

  for (const rowGroup of rowGroups) {
    rowGroup.setAttribute("role", "rowgroup");
  }

  for (const row of rows) {
    row.setAttribute("role", "row");
  }

  for (const headerCell of headerCells) {
    headerCell.setAttribute("role", "columnheader");
  }

  for (const cell of cells) {
    cell.setAttribute("role", "cell");
  }

  // This accounts for scoped row headers
  for (const rowHeaderCell of rowHeaderCells) {
    rowHeaderCell.setAttribute("role", "rowheader");
  }
}

addTableAriaAttributes();
