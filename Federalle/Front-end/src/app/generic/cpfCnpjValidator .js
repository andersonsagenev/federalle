"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CpfCnpjValidator = /** @class */ (function () {
    function CpfCnpjValidator() {
    }
    /**
     * Calcula o dígito verificador do CPF ou CNPJ.
     */
    CpfCnpjValidator.buildDigit = function (arr) {
        var isCpf = arr.length < CpfCnpjValidator.cpfLength;
        var digit = arr
            .map(function (val, idx) { return val * ((!isCpf ? idx % 8 : idx) + 2); })
            .reduce(function (total, current) { return total + current; }) % CpfCnpjValidator.cpfLength;
        if (digit < 2 && isCpf) {
            return 0;
        }
        return CpfCnpjValidator.cpfLength - digit;
    };
    /**
     * Valida um CPF ou CNPJ de acordo com seu dígito verificador.
     */
    CpfCnpjValidator.validate = function (c) {
        if (c) {
            var cpfCnpj = c.value.replace(/\D/g, '');
            if (cpfCnpj == '') {
                return null;
            }
            // Verifica o tamanho da string.
            if ([CpfCnpjValidator.cpfLength, CpfCnpjValidator.cnpjLength].indexOf(cpfCnpj.length) < 0) {
                return { length: true };
            }
            // Verifica se todos os dígitos são iguais.
            if (/^([0-9])\1*$/.test(cpfCnpj)) {
                return { equalDigits: true };
            }
            // A seguir é realizado o cálculo verificador.
            var cpfCnpjArr = cpfCnpj.split('').reverse().slice(2);
            cpfCnpjArr.unshift(CpfCnpjValidator.buildDigit(cpfCnpjArr));
            cpfCnpjArr.unshift(CpfCnpjValidator.buildDigit(cpfCnpjArr));
            if (cpfCnpj !== cpfCnpjArr.reverse().join('')) {
                // Dígito verificador não é válido, resultando em falha.
                return { digit: true };
            }
            return null;
        }
    };
    /**
     * Implementa a interface de um validator.
     */
    CpfCnpjValidator.prototype.validate = function (c) {
        return CpfCnpjValidator.validate(c);
    };
    CpfCnpjValidator.cpfLength = 11;
    CpfCnpjValidator.cnpjLength = 14;
    return CpfCnpjValidator;
}());
exports.CpfCnpjValidator = CpfCnpjValidator;
//# sourceMappingURL=cpfCnpjValidator .js.map