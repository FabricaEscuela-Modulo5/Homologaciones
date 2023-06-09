import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISemestre } from 'app/shared/model/semestre.model';
import { getEntities } from './semestre.reducer';

export const Semestre = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const semestreList = useAppSelector(state => state.semestre.entities);
  const loading = useAppSelector(state => state.semestre.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="semestre-heading" data-cy="SemestreHeading">
        Semestres
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/semestre/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Semestre
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {semestreList && semestreList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Semestre</th>
                <th>Fecha Inicio</th>
                <th>Fecha Terminacion</th>
                <th>Type Semestre</th>
                <th>State Semestre</th>
                <th>Tipo Semestre</th>
                <th>Estado Semestre</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {semestreList.map((semestre, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/semestre/${semestre.id}`} color="link" size="sm">
                      {semestre.id}
                    </Button>
                  </td>
                  <td>{semestre.idSemestre}</td>
                  <td>
                    {semestre.fechaInicio ? <TextFormat type="date" value={semestre.fechaInicio} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {semestre.fechaTerminacion ? (
                      <TextFormat type="date" value={semestre.fechaTerminacion} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{semestre.typeSemestre}</td>
                  <td>{semestre.stateSemestre}</td>
                  <td>
                    {semestre.tipoSemestre ? <Link to={`/tipo-semestre/${semestre.tipoSemestre.id}`}>{semestre.tipoSemestre.id}</Link> : ''}
                  </td>
                  <td>
                    {semestre.estadoSemestre ? (
                      <Link to={`/estado-semestre/${semestre.estadoSemestre.id}`}>{semestre.estadoSemestre.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/semestre/${semestre.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/semestre/${semestre.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/semestre/${semestre.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Semestres found</div>
        )}
      </div>
    </div>
  );
};

export default Semestre;
