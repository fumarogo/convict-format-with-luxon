# convict-format-with-luxon

Formats `duration` and `timestamp` for [convict](https://github.com/mozilla/node-convict) with [Luxon](https://moment.github.io/luxon/#/).
It is basically a porting of [convict-format-with-moment](https://github.com/mozilla/node-convict/tree/master/packages/convict-format-with-moment) to Luxon.

## Install

```shellsession
npm install convict-format-with-luxon
```

## Usage

An example `config.js` file:

```javascript
const convict = require('convict');
const convict_format_with_luxon = require('convict-format-with-luxon');

// Add all formats
convict.addFormats(convict_format_with_luxon);

// Or add only specific formats:
// convict.addFormat(convict_format_with_luxon.duration);
// etc.

// Define a schema
const config = convict({
  format: {
    format: 'duration'
  },
  format: {
    format: 'timestamp'
  }
});
```

### Validation

Validation done through Luxon:

* `duration` - milliseconds or a human readable string (e.g. 3000, "5 days")
* `timestamp` - Unix timestamps or date strings recognized by Luxon

### Coercion

Convict will automatically coerce environment variables from strings to their proper types when importing them. `duration` and `timestamp` are parsed and converted into numbers, though they utilize Luxon for date parsing.
