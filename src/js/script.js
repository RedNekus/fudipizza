const validate = require("validate.js")
const _ = require('lodash');
const constraints = {
  firstname: {
    presence: {
      message: "^Поле Имя обязательное."
    },
    length: {
      minimum: 2,
      message: "^Поле Имя должно содержать миниму 2 символа"
    }
  },
  lastname: {
    presence: {
      message: "^Поле Фамилия обязательное."
    },
    length: {
      minimum: 2,
      message: "^Поле Фамилия должно содержать миниму 2 символа"
    }
  },
  phone: {
    presence: {
      message: "^Заполните поле телефон."
    },
    format: {
      pattern: /^[ +0-9()\s-]+$/,
      flags: 'i',
      message: "^%{value} не является корректным номером телефона."
    }
  },
  age: {
    presence: {
      message: "^Укажите ваш возраст."
    },
    numericality: {
      onlyInteger: true,
      greaterThan: 18,
      message: "^Возрасто должен быть числом, которое больше 18"
    }
  },
  city: {
    presence: {
      message: "^Укажите ваш город."
    }
  },
  position: {
    presence: {
      message: "^Укажите желаемую должность."
    }
  },
  agree: {
    presence: true,
    exclusion: {
      within: [false],
      message: "^Нужно согласие на обработку персональных данных"
    }
  }
};

function closestParent(child, className) {
  if (!child || child == document) {
    return null;
  }
  if (child.classList.contains(className)) {
    return child;
  } else {
    return closestParent(child.parentNode, className);
  }
}

function resetFormGroup(formGroup) {
  formGroup.classList.remove('is-invalid');
  formGroup.classList.remove('is-filled');
  _.each(formGroup.querySelectorAll('.help-block.error'), function(el) {
    el.parentNode.removeChild(el);
  });
}

function addError(messages, error) {
  let block = document.createElement('p');
  block.classList.add('help-block');
  block.classList.add('error');
  block.innerText = error;
  messages.appendChild(block);
}

function showErrorsForInput(input, errors) {
  let formGroup = closestParent(input.parentNode, 'form-group');
  if(null === formGroup) {
    console.log(input)
    console.log('reset group')
    formGroup = closestParent(input.parentNode, 'form-check');
    console.log(formGroup);
  }
  if(formGroup) {
    let messages = formGroup.querySelector('.messages');
    resetFormGroup(formGroup);
    if (errors && messages) {
      formGroup.classList.add('is-invalid');
      _.each(errors, function(error) {
        addError(messages, error);
      });
    }
  }
}

function showErrors(form, errors) {
  _.each(form.querySelectorAll('input[name], select[name]'), function(input) {
    showErrorsForInput(input, errors && errors[input.name]);
  });
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById(`poll-form`)
    const modal = document.getElementById(`poll-modal`)
    const closeMOdalButton = modal.querySelector(`.close`);
    const backdrop = document.createElement('DIV')
    backdrop.classList.add('modal-backdrop','fade','show')

    const inputs = form.elements
    console.log(inputs)
    for (let i = 0; i < inputs.length; ++i) {
      inputs.item(i).addEventListener('change', function(e) {
        let errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name]);
      });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let errors = validate(form, constraints) || {};
        console.log(errors)
        if(errors) {
          showErrors(form, errors || {});
        }
        if(modal) {
            modal.classList.add(`show`)
            modal.style.display = 'block'
            document.body.classList.add(`modal-open`)
            document.body.appendChild(backdrop)
        }
    });

    closeMOdalButton.addEventListener('click', ()=> {
        modal.classList.remove('show')
        modal.removeAttribute('style')
        document.body.classList.remove(`modal-open`)
        document.body.removeChild(backdrop)
    })

    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        
        const blockID = anchor.getAttribute('href').substr(1)
        
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }
})