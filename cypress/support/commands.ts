type FindByOptions = Partial<
  Cypress.Loggable & Cypress.Timeoutable & Cypress.Shadow & Cypress.Withinable
>;

type PasteOptions = {
  log?: boolean;
  dataType?: 'application/json' | 'text/plain';
  data: string;
};

type SelectRangeOptions = {
  log?: boolean;
  start: number;
  end: number;
  direction?: 'forward' | 'backward' | 'none';
};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(
        testId: string,
        options?: FindByOptions
      ): Chainable<JQuery<HTMLElement>>;

      getByName(
        name: string,
        options?: FindByOptions
      ): Chainable<JQuery<HTMLElement>>;

      findByTestId(
        testId: string,
        options?: FindByOptions
      ): Chainable<JQuery<HTMLElement>>;

      findByName(
        name: string,
        options?: FindByOptions
      ): Chainable<JQuery<HTMLElement>>;

      findAriaDescription(
        options?: FindByOptions
      ): Chainable<JQuery<HTMLElement>>;

      findAriaErrorMessage(
        options?: FindByOptions
      ): Chainable<JQuery<HTMLElement>>;

      findAriaControls(options?: FindByOptions): Chainable<JQuery<HTMLElement>>;

      findIframeBody(options?: FindByOptions): Chainable<JQuery<HTMLElement>>;

      paste(options: PasteOptions): Chainable<JQuery<HTMLElement>>;

      selectRange(options: SelectRangeOptions): Chainable<JQuery<HTMLElement>>;
    }
  }
}

function getByTestId(testId: string, options: FindByOptions) {
  return cy.get(`[data-test-id="${testId}"]`, options);
}

function findByTestId(
  subject: JQuery<HTMLElement>,
  testId: string,
  options?: FindByOptions
) {
  return cy.wrap(subject).find(`[data-test-id="${testId}"]`, options);
}

function getByName(name: string, options: FindByOptions) {
  return cy.get(`[name="${name}"]`, options);
}

function findByName(
  subject: JQuery<HTMLElement>,
  name: string,
  options?: FindByOptions
) {
  return cy.wrap(subject).find(`[name="${name}"]`, options);
}

function findAriaDescription(
  subject: JQuery<HTMLElement>,
  options?: FindByOptions
) {
  return cy.get(`[id="${subject.attr('aria-describedby')}"]`, options);
}

function findAriaErrorMessage(
  subject: JQuery<HTMLElement>,
  options?: FindByOptions
) {
  return cy.get(`[id="${subject.attr('aria-errormessage')}"]`, options);
}

function findAriaControls(
  subject: JQuery<HTMLElement>,
  options?: FindByOptions
) {
  return cy.get(`[id="${subject.attr('aria-controls')}"]`, options);
}

function findIframeBody(subject: JQuery<HTMLElement>, options?: FindByOptions) {
  return cy
    .wrap(subject)
    .its('0.contentDocument.body', options)
    .should('not.be.empty', options)
    .then((body) => cy.wrap(body, options));
}

function paste(
  subject: JQuery<HTMLElement>,
  { log = true, dataType = 'text/plain', data }: PasteOptions
) {
  const clipboardData = new DataTransfer();
  clipboardData.setData(dataType, data);
  subject[0].dispatchEvent(
    new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      clipboardData,
    })
  );

  if (log) {
    Cypress.log({
      $el: subject,
      name: 'paste',
      message: JSON.stringify({ data }),
    });
  }

  return cy.wrap(subject);
}

function selectRange(
  subject: JQuery<HTMLInputElement>,
  { log = true, start, end, direction }: SelectRangeOptions
) {
  subject[0].setSelectionRange(start, end);

  if (log) {
    Cypress.log({
      $el: subject,
      name: 'selectRange',
      message: JSON.stringify({ start, end, direction }),
    });
  }

  return cy.wrap(subject);
}

Cypress.Commands.add('getByTestId', getByTestId);
Cypress.Commands.add('getByName', getByName);
Cypress.Commands.add('findByTestId', { prevSubject: 'element' }, findByTestId);
Cypress.Commands.add('findByName', { prevSubject: 'element' }, findByName);
Cypress.Commands.add(
  'findAriaControls',
  { prevSubject: 'element' },
  findAriaControls
);
Cypress.Commands.add(
  'findAriaDescription',
  { prevSubject: 'element' },
  findAriaDescription
);
Cypress.Commands.add(
  'findAriaErrorMessage',
  { prevSubject: 'element' },
  findAriaErrorMessage
);
Cypress.Commands.add(
  'findIframeBody',
  { prevSubject: 'element' },
  findIframeBody
);
Cypress.Commands.add('paste', { prevSubject: 'element' }, paste);
Cypress.Commands.add('selectRange', { prevSubject: 'element' }, selectRange);

export {};
