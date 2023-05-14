import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMateriaSemestre } from 'app/shared/model/materia-semestre.model';
import { getEntities } from './materia-semestre.reducer';

export const MateriaSemestre = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const materiaSemestreList = useAppSelector(state => state.materiaSemestre.entities);
  const loading = useAppSelector(state => state.materiaSemestre.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="materia-semestre-heading" data-cy="MateriaSemestreHeading">
        Materia Semestres
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/materia-semestre/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Materia Semestre
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {materiaSemestreList && materiaSemestreList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Materia Semestre</th>
                <th>Cedula Estudiante</th>
                <th>Id Semestre</th>
                <th>Codigo Materia</th>
                <th>Nota Definitiva</th>
                <th>Materia</th>
                <th>Estudiante</th>
                <th>Semestre</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {materiaSemestreList.map((materiaSemestre, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/materia-semestre/${materiaSemestre.id}`} color="link" size="sm">
                      {materiaSemestre.id}
                    </Button>
                  </td>
                  <td>{materiaSemestre.idMateriaSemestre}</td>
                  <td>{materiaSemestre.cedulaEstudiante}</td>
                  <td>{materiaSemestre.idSemestre}</td>
                  <td>{materiaSemestre.codigoMateria}</td>
                  <td>{materiaSemestre.notaDefinitiva}</td>
                  <td>
                    {materiaSemestre.materia ? <Link to={`/materia/${materiaSemestre.materia.id}`}>{materiaSemestre.materia.id}</Link> : ''}
                  </td>
                  <td>
                    {materiaSemestre.estudiante ? (
                      <Link to={`/estudiante/${materiaSemestre.estudiante.id}`}>{materiaSemestre.estudiante.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {materiaSemestre.semestre ? (
                      <Link to={`/semestre/${materiaSemestre.semestre.id}`}>{materiaSemestre.semestre.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/materia-semestre/${materiaSemestre.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/materia-semestre/${materiaSemestre.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/materia-semestre/${materiaSemestre.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Materia Semestres found</div>
        )}
      </div>
    </div>
  );
};

export default MateriaSemestre;
