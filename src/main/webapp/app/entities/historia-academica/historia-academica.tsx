import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IHistoriaAcademica } from 'app/shared/model/historia-academica.model';
import { getEntities } from './historia-academica.reducer';

export const HistoriaAcademica = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const historiaAcademicaList = useAppSelector(state => state.historiaAcademica.entities);
  const loading = useAppSelector(state => state.historiaAcademica.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="historia-academica-heading" data-cy="HistoriaAcademicaHeading">
        Historia Academicas
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/historia-academica/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Historia Academica
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {historiaAcademicaList && historiaAcademicaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Historia Academica</th>
                <th>Cedula Estudiante</th>
                <th>Id Semestre</th>
                <th>Codigo Programa</th>
                <th>Promedio Acomulado</th>
                <th>Promedio Semestre</th>
                <th>Id Tercio</th>
                <th>Situation Academica</th>
                <th>State Semestre</th>
                <th>Estudiante</th>
                <th>Semestre</th>
                <th>Situacion Academica</th>
                <th>Tercio</th>
                <th>Estado Semestre</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {historiaAcademicaList.map((historiaAcademica, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/historia-academica/${historiaAcademica.id}`} color="link" size="sm">
                      {historiaAcademica.id}
                    </Button>
                  </td>
                  <td>{historiaAcademica.idHistoriaAcademica}</td>
                  <td>{historiaAcademica.cedulaEstudiante}</td>
                  <td>{historiaAcademica.idSemestre}</td>
                  <td>{historiaAcademica.codigoPrograma}</td>
                  <td>{historiaAcademica.promedioAcomulado}</td>
                  <td>{historiaAcademica.promedioSemestre}</td>
                  <td>{historiaAcademica.idTercio}</td>
                  <td>{historiaAcademica.situationAcademica}</td>
                  <td>{historiaAcademica.stateSemestre}</td>
                  <td>
                    {historiaAcademica.estudiante ? (
                      <Link to={`/estudiante/${historiaAcademica.estudiante.id}`}>{historiaAcademica.estudiante.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {historiaAcademica.semestre ? (
                      <Link to={`/semestre/${historiaAcademica.semestre.id}`}>{historiaAcademica.semestre.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {historiaAcademica.situacionAcademica ? (
                      <Link to={`/situacion-academica/${historiaAcademica.situacionAcademica.id}`}>
                        {historiaAcademica.situacionAcademica.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {historiaAcademica.tercio ? (
                      <Link to={`/tercio/${historiaAcademica.tercio.id}`}>{historiaAcademica.tercio.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {historiaAcademica.estadoSemestre ? (
                      <Link to={`/estado-semestre/${historiaAcademica.estadoSemestre.id}`}>{historiaAcademica.estadoSemestre.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/historia-academica/${historiaAcademica.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/historia-academica/${historiaAcademica.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/historia-academica/${historiaAcademica.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Historia Academicas found</div>
        )}
      </div>
    </div>
  );
};

export default HistoriaAcademica;
