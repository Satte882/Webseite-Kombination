export type FlowDom = {
  section: HTMLElement;
  frame: HTMLElement;
  invoice: HTMLElement;
  email: HTMLElement;
  inbox: HTMLElement;
  database: HTMLElement;
  due: HTMLElement;
  reminder: HTMLElement;
  scan: HTMLElement;
  status: HTMLElement;
  dueField: HTMLElement;
  sourceLabel: HTMLElement;
};

export function getFlowDom(section: HTMLElement): FlowDom | null {
  const find = <T extends HTMLElement>(selector: string) => section.querySelector<T>(selector);
  const frame = find<HTMLElement>("[data-flow-frame]");
  const invoice = find<HTMLElement>("[data-flow-invoice]");
  const email = find<HTMLElement>("[data-email-panel]");
  const inbox = find<HTMLElement>("[data-inbox-panel]");
  const database = find<HTMLElement>("[data-database-panel]");
  const due = find<HTMLElement>("[data-due-panel]");
  const reminder = find<HTMLElement>("[data-reminder-panel]");
  const scan = find<HTMLElement>("[data-scan-line]");
  const status = find<HTMLElement>("[data-invoice-status]");
  const dueField = find<HTMLElement>("[data-invoice-due]");
  const sourceLabel = find<HTMLElement>("[data-source-label]");
  if (!frame || !invoice || !email || !inbox || !database || !due || !reminder || !scan || !status || !dueField || !sourceLabel) return null;
  return { section, frame, invoice, email, inbox, database, due, reminder, scan, status, dueField, sourceLabel };
}

export const findScene = (dom: FlowDom, key: string) => dom.section.querySelector<HTMLElement>(`[data-scene="${key}"]`);
