const test = require("node:test");
const assert = require("node:assert/strict");
const { statSync } = require("node:fs");
const { resolve } = require("node:path");
const { units } = require("../learning-path.js");

test("Each ready lesson has its own accessible photo in both delivery sizes", () => {
  const used = new Set();
  for (const unit of units.filter(unit => unit.ready)) {
    const { image } = unit;
    assert.ok(image?.alt?.trim() && image.caption?.trim(), `${unit.id}: missing photo description`);
    for (const [file, width] of [[image.small, 480], [image.src, 960]]) {
      assert.match(file, new RegExp(`^assets/[a-z0-9-]+-${width}\\.webp$`));
      assert.ok(!used.has(file), `${unit.id}: photo is shared with another lesson`);
      assert.ok(statSync(resolve(__dirname, "..", file)).size > 0);
      used.add(file);
    }
  }
});
