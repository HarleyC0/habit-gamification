import { useState, useEffect } from 'react';
import { useForm } from './useForm';
import { useDebounce } from './useDebounce';
import { validateRegisterForm, validateEmail, validateUsername } from '@/utils/validators'; 
import { DEBOUNCE_DELAY } from '../utils/constants';
import { authService } from '@/api/authService';
import type { RegisterFormData, RegisterPayload, AsyncStatus } from '../types/auth.types';

// hook para manejar el formulario de registro
// incliye las validaciones asyncronas, sincronas y submit

export const useRegisterForm = () => {

    // base sincrona de useForm
    const baseForm = useForm<RegisterFormData>(
        {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        validateRegisterForm
    )

    // estados para validacion asincrona
    const [usernameStatus, setUsernameStatus] = useState<AsyncStatus>('idle');
    const [emailStatus, setEmailStatus] = useState<AsyncStatus>('idle');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // debounsing
    const debouncedUsername = useDebounce(baseForm.values.username, DEBOUNCE_DELAY);
    const debouncedEmail = useDebounce(baseForm.values.email, DEBOUNCE_DELAY);

    // validacion asincrona username
    useEffect( () => {
        const checkUsername = async () => {
            // si esta vacio o corto no validar
            if (debouncedUsername.length < 3) {
                setUsernameStatus('idle')
                return;
            }

            // validar formato primero
            const formatError = validateUsername(debouncedUsername);
            if (formatError) {
                setUsernameStatus('idle');
                return;
            }

            // Validación asíncrona (llamada a API)
            setUsernameStatus('checking');

            try {
                const data  = await authService.checkUsernameAvailability(debouncedUsername);
                
                if (data.available) {
                  setUsernameStatus('available');
                } else {
                  setUsernameStatus('taken');
                  baseForm.setFieldError('username', 'Usuario no disponible');
                }
              } catch (error) {
                console.error('Error checking username:', error);
                setUsernameStatus('idle');
            }

        };
        checkUsername();
    }, [debouncedUsername]);


    // validacion asincrona email
    useEffect(() => {
        const checkEmail = async () => {
          // Si está vacío, no validar
          if (!debouncedEmail) {
            setEmailStatus('idle');
            return;
          }
    
          // Validar formato primero
          const formatError = validateEmail(debouncedEmail);
          if (formatError) {
            setEmailStatus('idle');
            return;
          }
    
          // Validación asíncrona
          setEmailStatus('checking');
          
          try {
            const  data  = await authService.checkEmailAvailability(debouncedEmail);
            
            if (data.available) {
              setEmailStatus('available');
            } else {
              setEmailStatus('taken');
              baseForm.setFieldError('email', 'Email ya registrado');
            }
          } catch (error) {
            console.error('Error checking email:', error);
            setEmailStatus('idle');
          }
        };
    
        checkEmail();
    }, [debouncedEmail]); // Solo depende del email debounced


    // Habilitar submit
    const canSubmit = (): boolean => {
        // Verificar que no haya errores de validación síncrona
        const hasNoSyncErrors = Object.keys(baseForm.errors).length === 0;
        
        // Verificar que todos los campos estén llenos
        const allFieldsFilled = 
            baseForm.values.email !== '' &&
            baseForm.values.username !== '' &&
            baseForm.values.password !== '' &&
            baseForm.values.confirmPassword !== '';
        
        // Verificar que las validaciones async estén completas y sean válidas
        const asyncValidationsOk = 
            usernameStatus === 'available' &&
            emailStatus === 'available';
        
        // No permitir submit mientras está enviando
        const notSubmitting = !isSubmitting;
        
        return hasNoSyncErrors && allFieldsFilled && asyncValidationsOk && notSubmitting;
    };

    // Funcion del submit
    const handleRegister = async () => {
        // Verificar que se puede enviar
        if (!canSubmit()) {
          console.warn('Formulario inválido, no se puede enviar');
          return { success: false, error: 'Formulario inválido' };
        }
    
        // Marcar como enviando
        setIsSubmitting(true);
    
        try {
          // Preparar payload (SIN confirmPassword)
          const payload: RegisterPayload = {
            email: baseForm.values.email.trim().toLowerCase(),
            username: baseForm.values.username.trim(),
            password: baseForm.values.password,
          };
    
          // Llamar a la API
          const response = await authService.register(payload);
    
          // Reset del formulario en caso de éxito
          baseForm.reset();
          setUsernameStatus('idle');
          setEmailStatus('idle');
    
          return { 
            success: true, 
            data: response
          };
          
        } catch (error: any) {
          console.error('Error en registro:', error);
    
          // Manejar errores del backend
          if (error.response) {
            const { status, data } = error.response;
            
            // 409 Conflict - Email o username ya existe
            if (status === 409) {
              const detail = data.detail || '';
              
              if (detail.toLowerCase().includes('email')) {
                baseForm.setFieldError('email', 'Email ya registrado');
                setEmailStatus('taken');
              } else if (detail.toLowerCase().includes('username')) {
                baseForm.setFieldError('username', 'Usuario no disponible');
                setUsernameStatus('taken');
              } else {
                baseForm.setFieldError('email', detail);
              }
            } 
            // 422 Unprocessable Entity - Validación fallida
            else if (status === 422) {
              baseForm.setFieldError('email', 'Datos inválidos. Verifica los campos.');
            }
            // 400 Bad Request
            else if (status === 400) {
              baseForm.setFieldError('email', data.detail || 'Error en los datos enviados');
            }
            // Otros errores
            else {
              baseForm.setFieldError('email', 'Error al registrar. Intenta nuevamente.');
            }
          } else if (error.request) {
            // Error de red (no hay respuesta del servidor)
            baseForm.setFieldError('email', 'No se pudo conectar al servidor');
          } else {
            // Otro tipo de error
            baseForm.setFieldError('email', 'Error inesperado');
          }
    
          return { 
            success: false, 
            error: error.response?.data || error.message 
          };
          
        } finally {
          // Siempre marcar como no enviando
          setIsSubmitting(false);
        }
    };  
    
    return {
        ...baseForm,
        usernameStatus,
        emailStatus,
        isSubmitting,
        canSubmit: canSubmit(),
        handleRegister,
    };
};
