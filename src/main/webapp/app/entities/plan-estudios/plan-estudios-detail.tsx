import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './plan-estudios.reducer';

export const PlanEstudiosDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const planEstudiosEntity = useAppSelector(state => state.planEstudios.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="planEstudiosDetailsHeading">Plan Estudios</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{planEstudiosEntity.id}</dd>
          <dt>
            <span id="version">Version</span>
          </dt>
          <dd>{planEstudiosEntity.version}</dd>
          <dt>
            <span id="codigoPrograma">Codigo Programa</span>
          </dt>
          <dd>{planEstudiosEntity.codigoPrograma}</dd>
          <dt>
            <span id="fechaAprobacion">Fecha Aprobacion</span>
          </dt>
          <dd>
            {planEstudiosEntity.fechaAprobacion ? (
              <TextFormat value={planEstudiosEntity.fechaAprobacion} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Programa Academico</dt>
          <dd>{planEstudiosEntity.programaAcademico ? planEstudiosEntity.programaAcademico.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/plan-estudios" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/plan-estudios/${planEstudiosEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PlanEstudiosDetail;
