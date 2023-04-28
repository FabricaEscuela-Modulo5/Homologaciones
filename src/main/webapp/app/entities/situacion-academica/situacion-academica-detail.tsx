import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './situacion-academica.reducer';

export const SituacionAcademicaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const situacionAcademicaEntity = useAppSelector(state => state.situacionAcademica.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="situacionAcademicaDetailsHeading">Situacion Academica</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{situacionAcademicaEntity.id}</dd>
          <dt>
            <span id="idSituacionAcademica">Id Situacion Academica</span>
          </dt>
          <dd>{situacionAcademicaEntity.idSituacionAcademica}</dd>
          <dt>
            <span id="situationAcademica">Situation Academica</span>
          </dt>
          <dd>{situacionAcademicaEntity.situationAcademica}</dd>
        </dl>
        <Button tag={Link} to="/situacion-academica" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/situacion-academica/${situacionAcademicaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SituacionAcademicaDetail;
