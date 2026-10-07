(function (root) {
  "use strict";
  // Trusted helpers keep test calls separate from the learner's program output.
  const setup = `def __algolab_capture__(name, *args):
    import io, contextlib
    buffer = io.StringIO()
    with contextlib.redirect_stdout(buffer):
        globals()[name](*args)
    return buffer.getvalue().splitlines()
`;
  if (typeof module !== "undefined" && module.exports) module.exports = setup;
  else root.ALGOLAB_CHECK_SETUP = setup;
})(globalThis);
