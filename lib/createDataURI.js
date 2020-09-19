const dataURIPrefix = "data:image/svg+xml;base64,";
module.exports = (input) =>
  `${dataURIPrefix}${Buffer.from(input).toString("base64")}`;
