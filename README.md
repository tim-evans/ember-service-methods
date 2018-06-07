# ember-service-methods

`ember-service-methods` is an addon that formalizes a pattern that I've used in several larger Ember applications. Some user interactions are inherently complicated and have a lot of business logic around them. These interactions can usually be described in simple terms. For example "Send the invoice to the email given". Using this addon, this interaction could be represented by a service method:

```javascript
import Ember from 'ember';
import method from 'ember-service-methods';

const { get } = Ember;

export default method(function (invoice, { to, subject }) {
  return Ember.$.post(`/invoices/${get(invoice, 'id')}/email`, {
    subject
  });
});
```

```javascript
import Ember from 'ember';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend({
  emailInvoice: method(),

  actions: {
    sendEmail(to, subject) {
      return this.emailInvoice(this.modelFor('invoice'), {
        to,
        subject
      });
    }
  }
});
```

This may seem overly complicated to do this simple request. I feel that this pattern works best with testing. Mocking out full API responses to actions can be complicated an error prone. With this pattern along with the built-in test helpers, these methods can be stubbed out for simpler implementations.

This is an implementation of https://github.com/emberjs/rfcs/pull/98

Installation
------------------------------------------------------------------------------

* `git clone https://github.com/tim-evans/ember-service-methods.git`
* `cd ember-service-methods`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
