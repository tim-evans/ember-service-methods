# ember-service-methods

[![Greenkeeper badge](https://badges.greenkeeper.io/tim-evans/ember-service-methods.svg)](https://greenkeeper.io/)

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

## Installation

* `git clone https://github.com/tim-evans/ember-service-methods.git`
* `cd ember-service-methods`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
