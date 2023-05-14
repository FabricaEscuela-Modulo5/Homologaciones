import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './solicitud-homologacion.reducer';

export const SolicitudHomologacionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const solicitudHomologacionEntity = useAppSelector(state => state.solicitudHomologacion.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="solicitudHomologacionDetailsHeading">Solicitud Homologacion</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{solicitudHomologacionEntity.id}</dd>
          <dt>
            <span id="idSolicitud">Id Solicitud</span>
          </dt>
          <dd>{solicitudHomologacionEntity.idSolicitud}</dd>
          <dt>
            <span id="stateSolicitud">State Solicitud</span>
          </dt>
          <dd>{solicitudHomologacionEntity.stateSolicitud}</dd>
          <dt>
            <span id="codigoPrograma">Codigo Programa</span>
          </dt>
          <dd>{solicitudHomologacionEntity.codigoPrograma}</dd>
          <dt>
            <span id="fechaSolicitud">Fecha Solicitud</span>
          </dt>
          <dd>
            {solicitudHomologacionEntity.fechaSolicitud ? (
              <TextFormat value={solicitudHomologacionEntity.fechaSolicitud} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="comentario">Comentario</span>
          </dt>
          <dd>{solicitudHomologacionEntity.comentario}</dd>
          <dt>Programa Academico</dt>
          <dd>{solicitudHomologacionEntity.programaAcademico ? solicitudHomologacionEntity.programaAcademico.id : ''}</dd>
          <dt>Estado Solicitud</dt>
          <dd>{solicitudHomologacionEntity.estadoSolicitud ? solicitudHomologacionEntity.estadoSolicitud.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/solicitud-homologacion" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/solicitud-homologacion/${solicitudHomologacionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SolicitudHomologacionDetail;
