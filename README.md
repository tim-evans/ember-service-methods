# ember-service-methods

`ember-service-methods` is an addon that formalizes a pattern that I've used in several larger Ember applications. Some user interactions are inherently complicated and have a lot of business logic around them. These interactions can usually be described in simple terms. For example "Send the invoice to the email given". Using this addon, this interaction could be represented by a service method:

```javascript
import Ember from 'ember';
import method from 'ember-service-methods/method';

const { get } = Ember;

export default method(function (invoice, { to, subject }) {
  return Ember.$.post(`/invoices/${get(invoice, 'id')}/email`, {
    subject
  });
});
```

```javascript
import Ember from 'ember';
import injectMethod from 'ember-service-methods/inject-method';

export default Ember.Route.extend({
  emailInvoice: injectMethod(),

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

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
