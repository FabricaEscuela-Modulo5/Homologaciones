import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProgramaAcademico } from 'app/shared/model/programa-academico.model';
import { getEntities } from './programa-academico.reducer';

export const ProgramaAcademico = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const programaAcademicoList = useAppSelector(state => state.programaAcademico.entities);
  const loading = useAppSelector(state => state.programaAcademico.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="programa-academico-heading" data-cy="ProgramaAcademicoHeading">
        Programa Academicos
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/programa-academico/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Programa Academico
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {programaAcademicoList && programaAcademicoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Codigo Programa</th>
                <th>Nombre Programa</th>
                <th>Duracion</th>
                <th>Vigencia</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {programaAcademicoList.map((programaAcademico, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/programa-academico/${programaAcademico.id}`} color="link" size="sm">
                      {programaAcademico.id}
                    </Button>
                  </td>
                  <td>{programaAcademico.codigoPrograma}</td>
                  <td>{programaAcademico.nombrePrograma}</td>
                  <td>{programaAcademico.duracion}</td>
                  <td>
                    {programaAcademico.vigencia ? (
                      <TextFormat type="date" value={programaAcademico.vigencia} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/programa-academico/${programaAcademico.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/programa-academico/${programaAcademico.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/programa-academico/${programaAcademico.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Programa Academicos found</div>
        )}
      </div>
    </div>
  );
};

export default ProgramaAcademico;
