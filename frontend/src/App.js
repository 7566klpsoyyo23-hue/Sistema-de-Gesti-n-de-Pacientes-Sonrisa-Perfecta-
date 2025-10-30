import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: '',
    telefono: '',
    tratamiento: '',
    observaciones: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener lista de pacientes al cargar
  useEffect(() => {
    const fetchPacientes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/pacientes');
        setPacientes(response.data || []);
      } catch (err) {
        console.error('Error al obtener pacientes:', err.message || err);
        setError('No se pudieron cargar los pacientes. Revisa que el servidor esté corriendo en http://localhost:5000');
      } finally {
        setLoading(false);
      }
    };
    fetchPacientes();
  }, []);

  // Registrar nuevo paciente
  const agregarPaciente = async () => {
    // validación mínima
    if (!nuevoPaciente.nombre) {
      setError('El nombre es obligatorio');
      return;
    }

    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/pacientes', nuevoPaciente);
      // algunos servidores devuelven el recurso creado o la lista actualizada
      const creado = response && response.data ? response.data : nuevoPaciente;
      setPacientes((prev) => [...prev, creado]);
      setNuevoPaciente({ nombre: '', telefono: '', tratamiento: '', observaciones: '' });
    } catch (err) {
      console.error('Error al registrar paciente:', err.message || err);
      setError('No se pudo registrar el paciente. Revisa la conexión con el servidor.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🦷 Sistema de Gestión de Pacientes - Sonrisa Perfecta</h1>

      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Nombre completo"
          value={nuevoPaciente.nombre}
          onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, nombre: e.target.value })}
        />
        <input
          placeholder="Teléfono"
          value={nuevoPaciente.telefono}
          onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, telefono: e.target.value })}
        />
        <input
          placeholder="Tratamiento"
          value={nuevoPaciente.tratamiento}
          onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, tratamiento: e.target.value })}
        />
        <input
          placeholder="Observaciones"
          value={nuevoPaciente.observaciones}
          onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, observaciones: e.target.value })}
        />
        <button onClick={agregarPaciente}>Registrar Paciente</button>
      </div>

      {loading && <div>Cargando pacientes...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <h2>Pacientes Registrados</h2>
      <ul>
        {pacientes.map((paciente, index) => (
          <li key={index}>
            <strong>{paciente.nombre}</strong> - {paciente.tratamiento} - 📞 {paciente.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
