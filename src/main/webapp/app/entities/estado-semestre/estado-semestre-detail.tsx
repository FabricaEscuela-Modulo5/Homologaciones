import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './estado-semestre.reducer';

export const EstadoSemestreDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const estadoSemestreEntity = useAppSelector(state => state.estadoSemestre.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="estadoSemestreDetailsHeading">Estado Semestre</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{estadoSemestreEntity.id}</dd>
          <dt>
            <span id="idEstadoSemestre">Id Estado Semestre</span>
          </dt>
          <dd>{estadoSemestreEntity.idEstadoSemestre}</dd>
          <dt>
            <span id="stateSemestre">State Semestre</span>
          </dt>
          <dd>{estadoSemestreEntity.stateSemestre}</dd>
        </dl>
        <Button tag={Link} to="/estado-semestre" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/estado-semestre/${estadoSemestreEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default EstadoSemestreDetail;
