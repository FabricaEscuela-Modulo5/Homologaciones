import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEstadoSolicitud } from 'app/shared/model/estado-solicitud.model';
import { getEntities } from './estado-solicitud.reducer';

export const EstadoSolicitud = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const estadoSolicitudList = useAppSelector(state => state.estadoSolicitud.entities);
  const loading = useAppSelector(state => state.estadoSolicitud.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="estado-solicitud-heading" data-cy="EstadoSolicitudHeading">
        Estado Solicituds
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/estado-solicitud/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Estado Solicitud
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {estadoSolicitudList && estadoSolicitudList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Estado Solicitud</th>
                <th>State Solicitud</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {estadoSolicitudList.map((estadoSolicitud, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/estado-solicitud/${estadoSolicitud.id}`} color="link" size="sm">
                      {estadoSolicitud.id}
                    </Button>
                  </td>
                  <td>{estadoSolicitud.idEstadoSolicitud}</td>
                  <td>{estadoSolicitud.stateSolicitud}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/estado-solicitud/${estadoSolicitud.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/estado-solicitud/${estadoSolicitud.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/estado-solicitud/${estadoSolicitud.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Estado Solicituds found</div>
        )}
      </div>
    </div>
  );
};

export default EstadoSolicitud;
