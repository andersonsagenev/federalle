"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenericValidator = /** @class */ (function () {
    function GenericValidator() {
    }
    /**
     * Valida se o CPF é valido. Deve-se ser informado o cpf sem máscara.
    */
    GenericValidator.isValidCpf = function () {
        return function (control) {
            var cpf = control.value.replace(/\D/g, '');
            if (cpf) {
                var numbers = void 0, digits = void 0, sum = void 0, i = void 0, result = void 0, equalDigits = void 0;
                equalDigits = 1;
                if (cpf.length < 11) {
                    return null;
                }
                for (i = 0; i < cpf.length - 1; i++) {
                    if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                        equalDigits = 0;
                        break;
                    }
                }
                if (!equalDigits) {
                    numbers = cpf.substring(0, 9);
                    digits = cpf.substring(9);
                    sum = 0;
                    for (i = 10; i > 1; i--) {
                        sum += numbers.charAt(10 - i) * i;
                    }
                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
                    if (result !== Number(digits.charAt(0))) {
                        return { cpfNotValid: true };
                    }
                    numbers = cpf.substring(0, 10);
                    sum = 0;
                    for (i = 11; i > 1; i--) {
                        sum += numbers.charAt(11 - i) * i;
                    }
                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
                    if (result !== Number(digits.charAt(1))) {
                        return { cpfNotValid: true };
                    }
                    return null;
                }
                else {
                    return { cpfNotValid: true };
                }
            }
            return null;
        };
    };
    GenericValidator.isEmail = function () {
        return function (control) {
            if (control.value == '') {
                return null;
            }
            else {
                var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
                if (!EMAIL_REGEXP.test(control.value)) {
                    return { invalidEmail: true };
                }
                else
                    return null;
            }
        };
    };
    return GenericValidator;
}());
exports.GenericValidator = GenericValidator;
//# sourceMappingURL=genericValidator .js.map