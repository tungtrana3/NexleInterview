const regTestEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const regBothLowerUpercase = '(?=.*[a-z])(?=.*[A-Z])';
const regAtLeatOneNumeric = '[0-9]+';
const regSpecialChar = '[^A-Za-z0-9]';

export { regTestEmail, regAtLeatOneNumeric, regBothLowerUpercase, regSpecialChar }