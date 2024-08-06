// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    // Находим элемент ошибки внутри самой функции 
    const errorElement =formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

// Функция, которая удаляет класс с ошибкой
const hidenInputError = (formElement, inputElement, validationConfig) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement =formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
     // Очистим ошибку
    errorElement.textContent = "";
}

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
         // передаем пустую строку, для доступа стандартных браузерных сообщений
        inputElement.setCustomValidity("");
    }

    if(!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
        hidenInputError(formElement, inputElement, validationConfig);
    }
}
//Функция hasInvalidInput только проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита. 
// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
      // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    });
}

// Функция переключения кнопки (вкл/выкл)
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
     // Если есть хотя бы один невалидный инпут
    if(hasInvalidInput(inputList)){
        // сделай кнопку неактивной
        buttonElement.setAttribute("disabled", "true");
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}
//Функция setEventListe добавит обработчики сразу всем полям формы
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener("input", function() {
            checkInputValidity(formElement, inputElement, validationConfig);
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
}

// Функция включения валидации всех форм
const enableValidation = (validationConfig) => {  
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function(evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig);
    });
}

// очистка ошибок валидации вызовом clearValidation
function clearValidation(profileForm, validationConfig) {
    const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hidenInputError(profileForm, inputElement, validationConfig);
    });
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

export { enableValidation, clearValidation };