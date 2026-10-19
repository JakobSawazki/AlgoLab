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
def __algolab_mutates__(name, values, extra, expected):
    import io, contextlib
    data = list(values)
    with contextlib.redirect_stdout(io.StringIO()):
        globals()[name](data, *extra)
    return data == expected
def __algolab_returns__(name, args, expected):
    import io, contextlib, copy, math
    with contextlib.redirect_stdout(io.StringIO()):
        result = globals()[name](*copy.deepcopy(args))
    if isinstance(expected, bool):
        return result is expected
    if isinstance(expected, float):
        return isinstance(result, (int, float)) and not isinstance(result, bool) and math.isclose(result, expected, abs_tol=1e-9)
    return result == expected
def __algolab_compares__(name):
    import ast
    return any(isinstance(n, ast.Compare) and any(isinstance(op, ast.In) for op in n.ops) for n in __algolab_nodes__(name))
def __algolab_chain__(anker, knoten):
    daten, aktuell, schritte = [], anker, 0
    while aktuell is not None and schritte < 100:
        daten.append(knoten[aktuell][0])
        aktuell = knoten[aktuell][1]
        schritte += 1
    return daten
def __algolab_calls__(*names):
    import ast
    tree = ast.parse(__algolab_source__)
    used = {n.func.attr if isinstance(n.func, ast.Attribute) else n.func.id for n in ast.walk(tree) if isinstance(n, ast.Call) and isinstance(n.func, (ast.Attribute, ast.Name))}
    return used & set(names)
def __algolab_in__(*names):
    import ast
    return any(isinstance(n, ast.Compare) and any(isinstance(op, (ast.In, ast.NotIn)) for op in n.ops) and any(isinstance(c, ast.Name) and c.id in names for c in n.comparators) for n in ast.walk(ast.parse(__algolab_source__)))
def __algolab_has__(*kinds):
    import ast
    types = tuple(getattr(ast, kind) for kind in kinds)
    return any(isinstance(n, types) for n in ast.walk(ast.parse(__algolab_source__)))
def __algolab_pop_index__():
    import ast
    return any(isinstance(n, ast.Call) and isinstance(n.func, ast.Attribute) and n.func.attr == "pop" and n.args for n in ast.walk(ast.parse(__algolab_source__)))
def __algolab_uses__(name, *methods):
    import ast
    used = {n.func.attr for n in __algolab_nodes__(name) if isinstance(n, ast.Call) and isinstance(n.func, ast.Attribute)} | {n.func.id for n in __algolab_nodes__(name) if isinstance(n, ast.Call) and isinstance(n.func, ast.Name)}
    return used & set(methods)
def __algolab_loops__(name):
    import ast
    return any(isinstance(n, (ast.For, ast.While)) for n in __algolab_nodes__(name))
def __algolab_slices__(name):
    import ast
    return any(isinstance(n, ast.Slice) for n in __algolab_nodes__(name))
def __algolab_helper_swap__(name):
    import ast
    return any(isinstance(n, ast.Assign) and len(n.targets) == 1 and isinstance(n.targets[0], ast.Name) and isinstance(n.value, ast.Subscript) for n in __algolab_nodes__(name))
def __algolab_nodes__(name):
    import ast
    tree = ast.parse(__algolab_source__)
    function = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == name)
    return list(ast.walk(function))
`;
  if (typeof module !== "undefined" && module.exports) module.exports = setup;
  else root.ALGOLAB_CHECK_SETUP = setup;
})(globalThis);
