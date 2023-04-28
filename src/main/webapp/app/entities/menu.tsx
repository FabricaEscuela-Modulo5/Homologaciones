import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/materia-solicitud">
        Materia Solicitud
      </MenuItem>
      <MenuItem icon="asterisk" to="/solicitud-homologacion">
        Solicitud Homologacion
      </MenuItem>
      <MenuItem icon="asterisk" to="/materia">
        Materia
      </MenuItem>
      <MenuItem icon="asterisk" to="/relacion">
        Relacion
      </MenuItem>
      <MenuItem icon="asterisk" to="/historia-academica">
        Historia Academica
      </MenuItem>
      <MenuItem icon="asterisk" to="/estudiante">
        Estudiante
      </MenuItem>
      <MenuItem icon="asterisk" to="/programa-academico">
        Programa Academico
      </MenuItem>
      <MenuItem icon="asterisk" to="/plan-estudios">
        Plan Estudios
      </MenuItem>
      <MenuItem icon="asterisk" to="/materia-semestre">
        Materia Semestre
      </MenuItem>
      <MenuItem icon="asterisk" to="/semestre">
        Semestre
      </MenuItem>
      <MenuItem icon="asterisk" to="/estado-solicitud">
        Estado Solicitud
      </MenuItem>
      <MenuItem icon="asterisk" to="/estado-semestre">
        Estado Semestre
      </MenuItem>
      <MenuItem icon="asterisk" to="/tercio">
        Tercio
      </MenuItem>
      <MenuItem icon="asterisk" to="/situacion-academica">
        Situacion Academica
      </MenuItem>
      <MenuItem icon="asterisk" to="/tipo-semestre">
        Tipo Semestre
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
