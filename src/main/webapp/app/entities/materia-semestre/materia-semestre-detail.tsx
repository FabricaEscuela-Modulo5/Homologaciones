import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './materia-semestre.reducer';

export const MateriaSemestreDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const materiaSemestreEntity = useAppSelector(state => state.materiaSemestre.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="materiaSemestreDetailsHeading">Materia Semestre</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{materiaSemestreEntity.id}</dd>
          <dt>
            <span id="idMateriaSemestre">Id Materia Semestre</span>
          </dt>
          <dd>{materiaSemestreEntity.idMateriaSemestre}</dd>
          <dt>
            <span id="cedulaEstudiante">Cedula Estudiante</span>
          </dt>
          <dd>{materiaSemestreEntity.cedulaEstudiante}</dd>
          <dt>
            <span id="idSemestre">Id Semestre</span>
          </dt>
          <dd>{materiaSemestreEntity.idSemestre}</dd>
          <dt>
            <span id="codigoMateria">Codigo Materia</span>
          </dt>
          <dd>{materiaSemestreEntity.codigoMateria}</dd>
          <dt>
            <span id="notaDefinitiva">Nota Definitiva</span>
          </dt>
          <dd>{materiaSemestreEntity.notaDefinitiva}</dd>
          <dt>Materia</dt>
          <dd>{materiaSemestreEntity.materia ? materiaSemestreEntity.materia.id : ''}</dd>
          <dt>Estudiante</dt>
          <dd>{materiaSemestreEntity.estudiante ? materiaSemestreEntity.estudiante.id : ''}</dd>
          <dt>Semestre</dt>
          <dd>{materiaSemestreEntity.semestre ? materiaSemestreEntity.semestre.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/materia-semestre" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/materia-semestre/${materiaSemestreEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default MateriaSemestreDetail;
