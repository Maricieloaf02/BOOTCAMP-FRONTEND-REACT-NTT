import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '@/app/pages/LoginPage';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('LoginPage', () => {
    it('debería manejar un inicio de sesión exitoso', async () => {
        // Mock de respuesta para la solicitud de inicio de sesión
        fetchMock.mockResponseOnce(
          JSON.stringify({ token: 'fake-token', username: 'testuser' })
        );
      
        render(
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        );
        
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
          target: { value: 'user@test.com' },
        });
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
          target: { value: 'password123' },
        });
      
        // Buscar el botón de envío por su rol y nombre
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
        fireEvent.click(submitButton);
      
        // Verificar que el redireccionamiento ocurre
        expect(await screen.findByText(/redireccionando/i)).toBeInTheDocument();
      
        // Verificar que el mock de fetch se llamó con los datos esperados
        expect(fetchMock).toHaveBeenCalledWith(
          'https://dummyjson.com/auth/login',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'user@test.com', password: 'password123' }),
          })
        );
      });
      
      
});
