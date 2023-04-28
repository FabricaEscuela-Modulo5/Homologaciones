import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEstudiante } from 'app/shared/model/estudiante.model';
import { getEntities } from './estudiante.reducer';

export const Estudiante = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const estudianteList = useAppSelector(state => state.estudiante.entities);
  const loading = useAppSelector(state => state.estudiante.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="estudiante-heading" data-cy="EstudianteHeading">
        Estudiantes
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/estudiante/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Estudiante
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {estudianteList && estudianteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cedula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo Institucional</th>
                <th>Correo Personal</th>
                <th>Celular</th>
                <th>Estrato</th>
                <th>Fecha Ingreso</th>
                <th>Version</th>
                <th>Codigo Programa</th>
                <th>Programa Academico</th>
                <th>Plan Estudios</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {estudianteList.map((estudiante, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/estudiante/${estudiante.id}`} color="link" size="sm">
                      {estudiante.id}
                    </Button>
                  </td>
                  <td>{estudiante.cedula}</td>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.apellido}</td>
                  <td>{estudiante.correoInstitucional}</td>
                  <td>{estudiante.correoPersonal}</td>
                  <td>{estudiante.celular}</td>
                  <td>{estudiante.estrato}</td>
                  <td>
                    {estudiante.fechaIngreso ? (
                      <TextFormat type="date" value={estudiante.fechaIngreso} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{estudiante.version}</td>
                  <td>{estudiante.codigoPrograma}</td>
                  <td>
                    {estudiante.programaAcademico ? (
                      <Link to={`/programa-academico/${estudiante.programaAcademico.id}`}>{estudiante.programaAcademico.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {estudiante.planEstudios ? (
                      <Link to={`/plan-estudios/${estudiante.planEstudios.id}`}>{estudiante.planEstudios.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/estudiante/${estudiante.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/estudiante/${estudiante.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/estudiante/${estudiante.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Estudiantes found</div>
        )}
      </div>
    </div>
  );
};

export default Estudiante;
