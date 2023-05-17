const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function testEmail(email: string) {
  const isvalid = emailRegex.test(email);
  return isvalid;
}

export default testEmail;
