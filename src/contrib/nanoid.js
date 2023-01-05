/**
 * nanoid v3 | MIT license | https://github.com/ai/nanoid
 * Generates a random ID. We use this to generate unique names for the input fields so that
 * the browser doesn't try to autofill them. This is a modified version of the original
 * nanoid function that uses a shorter ID.
 *
 * - Modified by Ris Adams <ris@risadams.com> 2023-01-05 (Modified to support Selectize needs)
 */
const nanoid = (t = 21) => crypto.getRandomValues(new Uint8Array(t))
  .reduce(((t, e) =>
    t += (e &= 63) < 36 ? e.toString(36) :
      e < 62 ? (e - 26).toString(36).toUpperCase()
        : e > 62 ? "-" : "_"), "");
