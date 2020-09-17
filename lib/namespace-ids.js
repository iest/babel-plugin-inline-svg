const makeDefinitionRegex = (str) => new RegExp(` +id="(${str})"`, "gi");
const makeXLinkRegex = (str) => new RegExp(` +xlink:href="#(${str})"`, "gi");
const makeMaskRegex = (str) => new RegExp(` +mask="url\\(#${str}\\)"`, "gi");

const idDefRegex = makeDefinitionRegex(".*?");
const getIds = (str) =>
  (str.match(idDefRegex) || []).map((s) => s.replace(idDefRegex, "$1"));

function namespaceIds(input, name) {
  const ids = getIds(input);
  let output = input;

  ids.forEach((id) => {
    const defRegex = makeDefinitionRegex(id);
    const xLinkRegex = makeXLinkRegex(id);
    const maskRegex = makeMaskRegex(id);
    const newId = `${name}-${id}`;
    const defReplacement = ` id="${newId}"`;
    const xLinkReplacement = ` xlink:href="#${newId}"`;
    const maskReplacement = ` mask="url(#${newId})"`;
    output = output
      .replace(defRegex, defReplacement)
      .replace(xLinkRegex, xLinkReplacement)
      .replace(maskRegex, maskReplacement);
  });
  return output;
}

module.exports = namespaceIds;
