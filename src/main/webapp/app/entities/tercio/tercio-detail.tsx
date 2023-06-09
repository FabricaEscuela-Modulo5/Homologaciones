import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './tercio.reducer';

export const TercioDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const tercioEntity = useAppSelector(state => state.tercio.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tercioDetailsHeading">Tercio</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{tercioEntity.id}</dd>
          <dt>
            <span id="idTercio">Id Tercio</span>
          </dt>
          <dd>{tercioEntity.idTercio}</dd>
          <dt>
            <span id="tercioDescription">Tercio Description</span>
          </dt>
          <dd>{tercioEntity.tercioDescription}</dd>
        </dl>
        <Button tag={Link} to="/tercio" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tercio/${tercioEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default TercioDetail;
