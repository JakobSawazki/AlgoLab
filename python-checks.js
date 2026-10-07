(function (root) {
  "use strict";
  // Trusted helpers keep test calls separate from the learner's program output.
  const setup = `def __algolab_capture__(name, *args):
    import io, contextlib
    buffer = io.StringIO()
    with contextlib.redirect_stdout(buffer):
        globals()[name](*args)
    return buffer.getvalue().splitlines()
def __algolab_result__(name, values, expected):
    import io, contextlib, math
    original = list(values)
    with contextlib.redirect_stdout(io.StringIO()):
        result = globals()[name](values)
    if values != original:
        return False
    if expected is None:
        return result is None
    return isinstance(result, tuple) and len(result) == 3 and result[:2] == expected[:2] and isinstance(result[2], (int, float)) and math.isclose(result[2], expected[2], rel_tol=1e-9, abs_tol=1e-9)
def __algolab_collected__(values):
    import io, contextlib
    original = list(values)
    with contextlib.redirect_stdout(io.StringIO()):
        result = speichere_lose(values)
    return isinstance(result, list) and result == original and values == original and result is not values
def __algolab_nodes__(name):
    import ast
    tree = ast.parse(__algolab_source__)
    function = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == name)
    return list(ast.walk(function))
`;
  if (typeof module !== "undefined" && module.exports) module.exports = setup;
  else root.ALGOLAB_CHECK_SETUP = setup;
})(globalThis);
