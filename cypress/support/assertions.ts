declare global {
  namespace Cypress {
    interface Chainer<Subject> {
      (chainer: 'be.ariaBusy'): Chainable<Subject>;
      (chainer: 'be.ariaHidden'): Chainable<Subject>;
      (chainer: 'be.ariaInvalid'): Chainable<Subject>;
      (chainer: 'have.ariaBusy'): Chainable<Subject>;
      (chainer: 'have.ariaDescribedby'): Chainable<Subject>;
      (chainer: 'have.ariaErrormessage'): Chainable<Subject>;
      (chainer: 'not.be.ariaBusy'): Chainable<Subject>;
      (chainer: 'not.be.ariaHidden'): Chainable<Subject>;
      (chainer: 'not.be.ariaInvalid'): Chainable<Subject>;
      (chainer: 'not.have.ariaBusy'): Chainable<Subject>;
      (chainer: 'not.have.ariaDescribedby'): Chainable<Subject>;
      (chainer: 'not.have.ariaErrormessage'): Chainable<Subject>;
    }
  }
}

const aria: Chai.ChaiPlugin = (_chai) => {
  _chai.Assertion.addMethod('ariaBusy', function () {
    const hidden = this._obj.attr('aria-busy');

    this.assert(
      hidden === 'true',
      'expected #{this} to have aria-busy attribute with value #{exp}',
      'expected #{this} to not have aria-busy attribute with value #{exp}',
      hidden
    );
  });

  _chai.Assertion.addMethod('ariaHidden', function () {
    const hidden = this._obj.attr('aria-hidden');

    this.assert(
      hidden === 'true',
      'expected #{this} to have aria-hidden attribute with value #{exp}',
      'expected #{this} to not have aria-hidden attribute with value #{exp}',
      hidden
    );
  });

  _chai.Assertion.addMethod('ariaInvalid', function () {
    const invalid = this._obj.attr('aria-invalid');

    this.assert(
      invalid === 'true',
      'expected #{this} to have aria-invalid attribute with value #{exp}',
      'expected #{this} to not have aria-invalid attribute with value #{exp}',
      invalid
    );
  });

  _chai.Assertion.addMethod('ariaDescribedby', function () {
    const describedBy = this._obj.attr('aria-describedby');

    this.assert(
      describedBy !== undefined,
      'expected #{this} to have aria-describedby attribute but value was #{exp}',
      'expected #{this} to not have aria-describedby attribute but value was #{exp}',
      describedBy
    );
  });

  _chai.Assertion.addMethod('ariaErrormessage', function () {
    const errorMessage = this._obj.attr('aria-errormessage');

    this.assert(
      errorMessage !== undefined,
      'expected #{this} to have aria-errormessage attribute but value was #{exp}',
      'expected #{this} to not have aria-errormessage attribute but value was #{exp}',
      errorMessage
    );
  });
};

chai.use(aria);

export {};
