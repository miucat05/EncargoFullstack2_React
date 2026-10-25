import { validarCorreo, validarContrasena, validarRun } from './validaciones'

describe('validaciones', () => {
  describe('validarCorreo', () => {
    it('acepta correos de los dominios permitidos', () => {
      expect(validarCorreo('ana@gmail.com')).toBe('')
      expect(validarCorreo('ana@duoc.cl')).toBe('')
      expect(validarCorreo('profe@profesor.duoc.cl')).toBe('')
    })

    it('rechaza un correo vacío', () => {
      expect(validarCorreo('   ')).toBe('El correo es obligatorio.')
    })

    it('rechaza dominios no permitidos', () => {
      expect(validarCorreo('ana@hotmail.com')).toContain('Solo se aceptan correos')
    })

    it('rechaza correos de más de 100 caracteres', () => {
      const largo = 'a'.repeat(95) + '@gmail.com'
      expect(validarCorreo(largo)).toContain('100 caracteres')
    })
  })

  describe('validarContrasena', () => {
    it('acepta una contraseña de entre 4 y 10 caracteres', () => {
      expect(validarContrasena('abcd')).toBe('')
      expect(validarContrasena('abcdefghij')).toBe('')
    })

    it('rechaza una contraseña vacía, corta o larga', () => {
      expect(validarContrasena('')).toBe('La contraseña es obligatoria.')
      expect(validarContrasena('abc')).toContain('entre 4 y 10')
      expect(validarContrasena('abcdefghijk')).toContain('entre 4 y 10')
    })
  })

  describe('validarRun', () => {
    it('acepta RUN con o sin puntos y guión', () => {
      expect(validarRun('19011022K')).toBe('')
      expect(validarRun('19.011.022-k')).toBe('')
    })

    it('rechaza un RUN con formato inválido', () => {
      expect(validarRun('123')).toBe('El RUN ingresado no es válido.')
    })
  })
})