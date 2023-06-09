import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISituacionAcademica } from 'app/shared/model/situacion-academica.model';
import { getEntities } from './situacion-academica.reducer';

export const SituacionAcademica = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const situacionAcademicaList = useAppSelector(state => state.situacionAcademica.entities);
  const loading = useAppSelector(state => state.situacionAcademica.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="situacion-academica-heading" data-cy="SituacionAcademicaHeading">
        Situacion Academicas
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/situacion-academica/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Situacion Academica
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {situacionAcademicaList && situacionAcademicaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Situacion Academica</th>
                <th>Situation Academica</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {situacionAcademicaList.map((situacionAcademica, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/situacion-academica/${situacionAcademica.id}`} color="link" size="sm">
                      {situacionAcademica.id}
                    </Button>
                  </td>
                  <td>{situacionAcademica.idSituacionAcademica}</td>
                  <td>{situacionAcademica.situationAcademica}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/situacion-academica/${situacionAcademica.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/situacion-academica/${situacionAcademica.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/situacion-academica/${situacionAcademica.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Situacion Academicas found</div>
        )}
      </div>
    </div>
  );
};

export default SituacionAcademica;
