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

  // Obtener lista de pacientes al cargar
  useEffect(() => {
    const fetchPacientes = async () => {
      const response = await axios.get('http://localhost:5000/pacientes');
      setPacientes(response.data);
    };
    fetchPacientes();
  }, []);

  // Registrar nuevo paciente
  const agregarPaciente = async () => {
    const response = await axios.post('http://localhost:5000/pacientes', nuevoPaciente);
    setPacientes([...pacientes, response.data]);
    setNuevoPaciente({ nombre: '', telefono: '', tratamiento: '', observaciones: '' });
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
