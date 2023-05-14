import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './relacion.reducer';

export const RelacionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const relacionEntity = useAppSelector(state => state.relacion.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="relacionDetailsHeading">Relacion</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{relacionEntity.id}</dd>
          <dt>
            <span id="codigoMateria">Codigo Materia</span>
          </dt>
          <dd>{relacionEntity.codigoMateria}</dd>
          <dt>
            <span id="codigoMateriaRelacionada">Codigo Materia Relacionada</span>
          </dt>
          <dd>{relacionEntity.codigoMateriaRelacionada}</dd>
          <dt>
            <span id="tipoRelacion">Tipo Relacion</span>
          </dt>
          <dd>{relacionEntity.tipoRelacion}</dd>
          <dt>Materia</dt>
          <dd>{relacionEntity.materia ? relacionEntity.materia.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/relacion" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/relacion/${relacionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default RelacionDetail;
