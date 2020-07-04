class FmServerError extends Error {}

class InvalidPacketError extends FmServerError {}


module.exports = { FmServerError, InvalidPacketError };
