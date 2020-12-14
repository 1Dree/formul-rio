((doc) => {
  const $ = (el) => doc.querySelector(el),
    formInputs = doc.querySelectorAll("form input"),
    formBtn = $("form button#action"),
    congrat = $("form #congratulations"),
    [formName, formPass] = formInputs,
    test = {
      notEmpty: ({ value }) => value.length > 0,
      regExpTest: (regExp, { value }) => regExp.test(value),
      minMaxLength: (min, max, { value }) =>
        value.length >= min && value.length <= max,
    };

  function formMsg(formInputs, bordercolor, msg) {
    formInputs.forEach((input) => (input.style.borderColor = bordercolor));

    msg !== "" ? alert(msg) : null;
  }

  function formValidation(name, pass, answerPlace, verify) {
    formMsg(formInputs, "", "");

    const user = {
      name: [test.notEmpty(name), test.regExpTest(/^[A-Z][A-z]+$/, name)],
      pass: [test.notEmpty(pass), test.minMaxLength(8, 14, pass)],
    };

    const aprovedUser = verify(user.name, user.pass);

    aprovedUser
      ? answerPlace.classList.add("display")
      : formMsg(
          formInputs,
          "rgb(255, 75, 75)",
          "preencha o formulário corretamente"
        );
  }

  const formVerification = (...userValues) =>
    userValues.every((value, i) => value[i] === true);

  const execute = () =>
    formValidation(formName, formPass, congrat, formVerification);

  formBtn.addEventListener("click", execute);
})(document);
