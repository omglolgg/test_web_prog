const validationEmail = (inputStr) => {
	const regExpEmail = new RegExp(/^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/)
	if (regExpEmail.test(inputStr)) return true;
	return false;
};

const validation = () => validationEmail(document.getElementById('email').value);

