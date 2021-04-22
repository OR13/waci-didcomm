const jose = require("jose");

const canonicalize = require("canonicalize");

(async () => {
  //github.com/hyperledger/aries-rfcs/blob/master/features/0510-dif-pres-exch-attach/README.md#request-presentation-attachment-format
  https: const message0 = require("./message-0.json");
  // https://github.com/hyperledger/aries-rfcs/blob/master/features/0510-dif-pres-exch-attach/README.md#presentation-attachment-format
  const message1 = require("./message-1.json");
  const jwk1 = await jose.JWK.generate("EC", "P-256");
  const jwk2 = await jose.JWK.generate("EC", "P-256");
  const payload = Buffer.from(canonicalize(message0));
  const encrypt = new jose.JWE.Encrypt(payload);
  encrypt.recipient(jwk1);
  encrypt.recipient(jwk2);
  const jwe = encrypt.encrypt("general");
  console.log(JSON.stringify(jwe, null, 2));
  const plaintext = jose.JWE.decrypt(jwe, jwk1);
  console.log(plaintext.toString());
})();
